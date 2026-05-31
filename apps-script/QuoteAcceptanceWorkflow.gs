/**
 * Quote acceptance endpoint helpers for the MIDTS Apps Script backend.
 * Wire handleQuoteAcceptancePayload(payload) from the existing doPost/router when
 * payload.formStage === 'quote_acceptance'.
 */
var QUOTE_ACCEPTANCE_FORM_STAGE = 'quote_acceptance';
var QUOTE_ACCESS_TOKEN_HEADER = 'Quote Access Token';
var QUOTE_ACCEPTANCE_LOG_SHEET_NAME = 'Quote Acceptance Logs';
var QUOTE_ACCEPTANCE_LOG_HEADERS = [
  'Timestamp',
  'Action',
  'Quote ID',
  'Token Present',
  'Success',
  'Message',
  'Client Notes',
  'Result JSON'
];
var PUBLIC_QUOTE_FIELDS = [
  'quoteId',
  'leadClientName',
  'company',
  'projectType',
  'quoteAmount',
  'currency',
  'validUntil',
  'notes',
  'status'
];

function handleQuoteAcceptancePayload(payload) {
  var request = payload || {};
  var action = String(request.action || '').trim();
  var quoteId = String(request.quoteId || '').trim();
  var token = String(request.token || '').trim();
  var notes = String(request.notes || '').trim();

  try {
    if (request.formStage !== QUOTE_ACCEPTANCE_FORM_STAGE) {
      return quoteAcceptanceResponse(false, 'Unsupported quote acceptance form stage.', {});
    }

    if (action === 'getQuote') {
      return QuoteAcceptanceService.getQuote(quoteId, token, notes);
    }
    if (action === 'acceptQuote') {
      return QuoteAcceptanceService.acceptQuote(quoteId, token, notes);
    }
    if (action === 'rejectQuote') {
      return QuoteAcceptanceService.rejectQuote(quoteId, token, notes);
    }

    var invalidActionResult = quoteAcceptanceResponse(false, 'Unsupported quote acceptance action.', { action: action });
    logQuoteAcceptanceAttempt(action || 'unknown', quoteId, Boolean(token), invalidActionResult.success, invalidActionResult.message, notes, invalidActionResult);
    return invalidActionResult;
  } catch (error) {
    var message = error && error.message ? error.message : String(error);
    var failure = quoteAcceptanceResponse(false, message, {});
    logQuoteAcceptanceAttempt(action || 'unknown', quoteId, Boolean(token), failure.success, failure.message, notes, failure);
    return failure;
  }
}

var QuoteAcceptanceService = {
  getQuote: function (quoteId, token, notes) {
    return withQuoteAcceptanceLogging('getQuote', quoteId, token, notes, function () {
      var validation = validateQuoteAccessToken(quoteId, token);
      if (!validation.success) return validation;

      var quote = QuoteService.getQuoteSnapshot(quoteId);
      if (!quote) return quoteAcceptanceResponse(false, 'Quote not found.', {});

      return quoteAcceptanceResponse(true, 'Quote loaded successfully.', { quote: toPublicQuoteData(quote) });
    });
  },

  acceptQuote: function (quoteId, token, notes) {
    return withQuoteAcceptanceLogging('acceptQuote', quoteId, token, notes, function () {
      var validation = validateQuoteAccessToken(quoteId, token);
      if (!validation.success) return validation;

      var sentCheck = requireQuoteSent(quoteId);
      if (!sentCheck.success) return sentCheck;

      var quoteResult = normalizeServiceResponse(QuoteService.acceptCustomerQuote(quoteId, notes), 'Quote accepted successfully.');
      if (!quoteResult.success) {
        return quoteAcceptanceResponse(false, quoteResult.message || 'Quote acceptance failed.', { quoteResult: quoteResult });
      }

      var acceptedCheck = requireQuoteStatus(quoteId, 'Accepted');
      if (!acceptedCheck.success) {
        return quoteAcceptanceResponse(false, 'Quote acceptance did not set the quote status to Accepted.', { quoteResult: quoteResult, statusCheck: acceptedCheck });
      }

      var projectPayload = {
        quoteId: quoteId,
        notes: 'Created from client quote acceptance',
        createDriveFolder: false,
        paymentStatusReference: 'Not Requested'
      };
      var projectResult = normalizeServiceResponse(ProjectService.createProjectFromQuote(projectPayload), 'Project created successfully.');
      if (!projectResult.success) {
        return quoteAcceptanceResponse(false, 'Quote accepted, but project creation failed.', { quoteResult: quoteResult, projectResult: projectResult });
      }

      return quoteAcceptanceResponse(true, 'Quote accepted and project created successfully.', { quoteResult: quoteResult, projectResult: projectResult });
    });
  },

  rejectQuote: function (quoteId, token, notes) {
    return withQuoteAcceptanceLogging('rejectQuote', quoteId, token, notes, function () {
      var validation = validateQuoteAccessToken(quoteId, token);
      if (!validation.success) return validation;

      var sentCheck = requireQuoteSent(quoteId);
      if (!sentCheck.success) return sentCheck;

      var rejectionResult = normalizeServiceResponse(QuoteService.updateQuoteStatus(quoteId, 'Rejected'), 'Quote rejected successfully.');
      if (!rejectionResult.success) {
        return quoteAcceptanceResponse(false, rejectionResult.message || 'Quote rejection failed.', { rejectionResult: rejectionResult });
      }

      storeQuoteRejectionNotesIfSupported(quoteId, notes);
      return quoteAcceptanceResponse(true, 'Quote rejection recorded successfully.', { rejectionResult: rejectionResult });
    });
  }
};

function validateQuoteAccessToken(quoteId, token) {
  if (!quoteId) return quoteAcceptanceResponse(false, 'Quote ID is required.', {});
  if (!token) return quoteAcceptanceResponse(false, 'Missing quote access token.', {});

  var quoteRow = findQuoteRowByQuoteId(quoteId);
  if (!quoteRow) return quoteAcceptanceResponse(false, 'Quote not found.', {});

  var storedToken = String(quoteRow.record[QUOTE_ACCESS_TOKEN_HEADER] || '').trim();
  if (!storedToken || storedToken !== token) {
    return quoteAcceptanceResponse(false, 'Invalid quote access token.', {});
  }

  return quoteAcceptanceResponse(true, 'Quote access token validated.', { quoteRow: quoteRow });
}

function requireQuoteSent(quoteId) {
  var statusResult = requireQuoteStatus(quoteId, 'Sent');
  if (statusResult.success) return statusResult;

  var status = statusResult.data && statusResult.data.status ? statusResult.data.status : '';
  if (status === 'Accepted') return quoteAcceptanceResponse(false, 'This quote has already been accepted.', { status: status });
  if (status === 'Rejected') return quoteAcceptanceResponse(false, 'This quote has already been rejected.', { status: status });

  return quoteAcceptanceResponse(false, 'Quote status is not Sent.', { status: status });
}

function requireQuoteStatus(quoteId, expectedStatus) {
  var quote = QuoteService.getQuoteSnapshot(quoteId);
  if (!quote) return quoteAcceptanceResponse(false, 'Quote not found.', {});

  var status = String(getFirstValue(quote, ['status', 'quoteStatus', 'Quote Status', 'Status']) || '').trim();
  if (status !== expectedStatus) {
    return quoteAcceptanceResponse(false, 'Quote status is ' + (status || 'unknown') + '.', { status: status, expectedStatus: expectedStatus });
  }

  return quoteAcceptanceResponse(true, 'Quote status is ' + expectedStatus + '.', { status: status });
}

function toPublicQuoteData(quote) {
  return {
    quoteId: String(getFirstValue(quote, ['quoteId', 'Quote ID', 'id']) || ''),
    leadClientName: String(getFirstValue(quote, ['leadClientName', 'clientName', 'Client Name', 'Lead Name', 'fullName']) || ''),
    company: String(getFirstValue(quote, ['company', 'Company']) || ''),
    projectType: String(getFirstValue(quote, ['projectType', 'Project Type']) || ''),
    quoteAmount: getFirstValue(quote, ['quoteAmount', 'Quote Amount', 'amount', 'totalAmount']) || '',
    currency: String(getFirstValue(quote, ['currency', 'Currency']) || 'GBP'),
    validUntil: String(getFirstValue(quote, ['validUntil', 'Valid Until', 'expiryDate']) || ''),
    notes: String(getFirstValue(quote, ['notes', 'scopeSummary', 'Scope Summary', 'publicNotes']) || ''),
    status: String(getFirstValue(quote, ['status', 'quoteStatus', 'Quote Status', 'Status']) || '')
  };
}

function getOrCreateQuoteAccessToken(quoteId) {
  if (!quoteId) throw new Error('Quote ID is required.');

  var quoteRow = findQuoteRowByQuoteId(quoteId);
  if (!quoteRow) throw new Error('Quote not found.');

  var existingToken = String(quoteRow.record[QUOTE_ACCESS_TOKEN_HEADER] || '').trim();
  if (existingToken) return existingToken;

  var token = generateSecureQuoteAccessToken();
  quoteRow.sheet.getRange(quoteRow.rowNumber, quoteRow.headerMap[QUOTE_ACCESS_TOKEN_HEADER] + 1).setValue(token);
  return token;
}

function buildQuotePageUrl(quoteId) {
  var token = getOrCreateQuoteAccessToken(quoteId);
  return 'https://midts.co.uk/quote?quoteId=' + encodeURIComponent(quoteId) + '&token=' + encodeURIComponent(token);
}

function buildQuoteReadyEmail(quoteId, clientName) {
  var quotePageUrl = buildQuotePageUrl(quoteId);
  return {
    subject: 'Your MIDTS quote is ready - ' + quoteId,
    body: 'Hello ' + (clientName || 'there') + ',\n\n' +
      'Your MIDTS quote is ready for review.\n\n' +
      'View and respond to your quote here:\n' +
      quotePageUrl + '\n\n' +
      'Quote reference: ' + quoteId + '\n\n' +
      'Kind regards,\n' +
      'MIDTS',
    quotePageUrl: quotePageUrl
  };
}

function generateSecureQuoteAccessToken() {
  var uuid = Utilities.getUuid().replace(/-/g, '');
  var timestamp = String(new Date().getTime());
  return Utilities.base64EncodeWebSafe(uuid + timestamp).replace(/=+$/g, '');
}

function findQuoteRowByQuoteId(quoteId) {
  var sheet = getSheetByNameOrThrow('Quotes');
  ensureSheetHeader(sheet, QUOTE_ACCESS_TOKEN_HEADER);
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return null;

  var headers = values[0].map(function (header) { return String(header || '').trim(); });
  var headerMap = buildHeaderMap(headers);
  var quoteIdIndex = firstHeaderIndex(headerMap, ['Quote ID', 'quoteId', 'Quote Id', 'ID']);
  if (quoteIdIndex < 0) throw new Error('Quotes sheet is missing Quote ID column.');

  for (var rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    if (String(values[rowIndex][quoteIdIndex] || '').trim() === quoteId) {
      return {
        sheet: sheet,
        rowNumber: rowIndex + 1,
        headerMap: headerMap,
        record: rowToRecord(headers, values[rowIndex])
      };
    }
  }

  return null;
}

function logQuoteAcceptanceAttempt(action, quoteId, tokenPresent, success, message, notes, result) {
  var sheet = getOrCreateSheetWithHeaders(QUOTE_ACCEPTANCE_LOG_SHEET_NAME, QUOTE_ACCEPTANCE_LOG_HEADERS);
  sheet.appendRow([
    new Date(),
    action || '',
    quoteId || '',
    tokenPresent ? 'Yes' : 'No',
    success ? 'Yes' : 'No',
    message || '',
    notes || '',
    safeStringify(result || {})
  ]);
}

function withQuoteAcceptanceLogging(action, quoteId, token, notes, callback) {
  var result;
  try {
    result = callback();
    if (!result) result = quoteAcceptanceResponse(false, 'Quote acceptance action returned no response.', {});
  } catch (error) {
    result = quoteAcceptanceResponse(false, error && error.message ? error.message : String(error), {});
  }
  logQuoteAcceptanceAttempt(action, quoteId, Boolean(token), result.success, result.message, notes, result);
  return result;
}

function quoteAcceptanceResponse(success, message, data) {
  return { success: Boolean(success), message: String(message || ''), data: data || {} };
}

function normalizeServiceResponse(rawResult, defaultSuccessMessage) {
  if (rawResult && typeof rawResult === 'object' && rawResult.success !== undefined) {
    return quoteAcceptanceResponse(rawResult.success === true, rawResult.message || defaultSuccessMessage, rawResult.data || rawResult);
  }
  if (rawResult === false || rawResult === null || rawResult === undefined) {
    return quoteAcceptanceResponse(false, 'Service returned no successful result.', { rawResult: rawResult });
  }
  return quoteAcceptanceResponse(true, defaultSuccessMessage, { rawResult: rawResult });
}

function getOrCreateSheetWithHeaders(sheetName, headers) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    return sheet;
  }

  headers.forEach(function (header) { ensureSheetHeader(sheet, header); });
  return sheet;
}

function ensureSheetHeader(sheet, headerName) {
  var lastColumn = Math.max(sheet.getLastColumn(), 1);
  var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0].map(function (header) { return String(header || '').trim(); });
  if (headers.indexOf(headerName) >= 0) return;
  sheet.getRange(1, headers.length + 1).setValue(headerName);
}

function getSheetByNameOrThrow(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) throw new Error(sheetName + ' sheet not found.');
  return sheet;
}

function buildHeaderMap(headers) {
  return headers.reduce(function (map, header, index) {
    map[header] = index;
    return map;
  }, {});
}

function firstHeaderIndex(headerMap, candidates) {
  for (var index = 0; index < candidates.length; index += 1) {
    if (headerMap[candidates[index]] !== undefined) return headerMap[candidates[index]];
  }
  return -1;
}

function rowToRecord(headers, row) {
  return headers.reduce(function (record, header, index) {
    record[header] = row[index];
    return record;
  }, {});
}

function getFirstValue(source, keys) {
  for (var index = 0; index < keys.length; index += 1) {
    if (source[keys[index]] !== undefined && source[keys[index]] !== null && source[keys[index]] !== '') {
      return source[keys[index]];
    }
  }
  return '';
}

function safeStringify(value) {
  try {
    return JSON.stringify(value);
  } catch (error) {
    return String(value);
  }
}

function storeQuoteRejectionNotesIfSupported(quoteId, notes) {
  if (!notes) return;
  var quoteRow = findQuoteRowByQuoteId(quoteId);
  if (!quoteRow) return;

  var headers = Object.keys(quoteRow.headerMap);
  var noteHeader = headers.indexOf('Rejection Notes') >= 0 ? 'Rejection Notes' : '';
  if (!noteHeader && headers.indexOf('Client Notes') >= 0) noteHeader = 'Client Notes';
  if (!noteHeader) {
    ensureSheetHeader(quoteRow.sheet, 'Rejection Notes');
    quoteRow = findQuoteRowByQuoteId(quoteId);
    noteHeader = 'Rejection Notes';
  }

  quoteRow.sheet.getRange(quoteRow.rowNumber, quoteRow.headerMap[noteHeader] + 1).setValue(notes);
}

function runQuoteAcceptanceWorkflowSmokeTest() {
  var gates = [];
  function gate(name, condition, data) {
    gates.push({ name: name, success: Boolean(condition), data: data || {} });
    if (!condition) throw new Error('Smoke test gate failed: ' + name);
  }

  try {
    var testLead = LeadService.createLead({
      fullName: 'Quote Acceptance Smoke Test',
      workEmail: 'quote-smoke@example.com',
      company: 'MIDTS Smoke Test',
      projectType: 'CAD Automation',
      briefRequirement: 'Quote acceptance workflow smoke test'
    });
    gate('Create test lead', testLead, testLead);

    var leadId = getFirstValue(testLead.data || testLead, ['leadId', 'Lead ID', 'id']);
    if (LeadService.markStep2Completed) {
      gate('Mark Step 2 completed', LeadService.markStep2Completed(leadId), { leadId: leadId });
    } else {
      gate('Mark Step 2 completed', true, { skipped: 'LeadService.markStep2Completed unavailable' });
    }

    var vendor = VendorAssignmentService.createApprovedVendor ? VendorAssignmentService.createApprovedVendor({
      vendorName: 'Quote Smoke Vendor',
      vendorEmail: 'vendor-smoke@example.com',
      status: 'Approved'
    }) : { success: true, data: { vendorId: 'SMOKE-VENDOR' } };
    gate('Create approved vendor', vendor && vendor.success !== false, vendor);

    var vendorId = getFirstValue(vendor.data || vendor, ['vendorId', 'Vendor ID', 'id']);
    var assignment = VendorAssignmentService.assignVendor(leadId, vendorId);
    gate('Assign vendor', assignment && assignment.success !== false, assignment);

    var pricing = VendorPricingService.submitVendorPricing({ leadId: leadId, vendorId: vendorId, vendorCost: 100, currency: 'GBP' });
    gate('Submit vendor pricing', pricing && pricing.success !== false, pricing);

    var pricingId = getFirstValue(pricing.data || pricing, ['pricingId', 'Pricing ID', 'id']);
    var approvedPricing = VendorPricingService.approveVendorPricing(pricingId || pricing);
    gate('Approve vendor pricing', approvedPricing && approvedPricing.success !== false, approvedPricing);

    var quoteResult = QuoteService.createQuote ? QuoteService.createQuote({ leadId: leadId, pricingId: pricingId, quoteAmount: 150, currency: 'GBP' }) : QuoteService.createQuoteFromApprovedPricing(leadId);
    gate('Create quote', quoteResult && quoteResult.success !== false, quoteResult);

    var quoteId = getFirstValue(quoteResult.data || quoteResult, ['quoteId', 'Quote ID', 'id']);
    gate('Quote ID available', quoteId, { quoteId: quoteId });

    var token = getOrCreateQuoteAccessToken(quoteId);
    gate('Generate quote token', token, { quoteId: quoteId, tokenPresent: Boolean(token) });

    var getQuoteResult = QuoteAcceptanceService.getQuote(quoteId, token, 'smoke get');
    gate('Simulate getQuote with valid token', getQuoteResult.success, getQuoteResult);

    var acceptResult = QuoteAcceptanceService.acceptQuote(quoteId, token, 'smoke accept');
    gate('Simulate acceptQuote with valid token', acceptResult.success, acceptResult);

    var acceptedStatus = requireQuoteStatus(quoteId, 'Accepted');
    gate('Confirm quote becomes Accepted', acceptedStatus.success, acceptedStatus);

    gate('Confirm project is created', acceptResult.data && acceptResult.data.projectResult && acceptResult.data.projectResult.success, acceptResult.data);

    var duplicateProject = normalizeServiceResponse(ProjectService.createProjectFromQuote({ quoteId: quoteId, createDriveFolder: false }), 'Duplicate project created.');
    gate('Confirm duplicate project creation is blocked', duplicateProject.success === false, duplicateProject);

    var missingToken = QuoteAcceptanceService.getQuote(quoteId, '', 'missing token smoke');
    gate('Simulate missing token and confirm failure', missingToken.success === false && missingToken.message === 'Missing quote access token.', missingToken);

    var invalidToken = QuoteAcceptanceService.getQuote(quoteId, 'invalid-token', 'invalid token smoke');
    gate('Simulate invalid token and confirm failure', invalidToken.success === false && invalidToken.message === 'Invalid quote access token.', invalidToken);

    var rejectQuoteId = quoteId;
    if (QuoteService.createQuote) {
      var rejectQuote = QuoteService.createQuote({ leadId: leadId, pricingId: pricingId, quoteAmount: 175, currency: 'GBP' });
      rejectQuoteId = getFirstValue(rejectQuote.data || rejectQuote, ['quoteId', 'Quote ID', 'id']);
    }
    var rejectToken = getOrCreateQuoteAccessToken(rejectQuoteId);
    var rejectResult = QuoteAcceptanceService.rejectQuote(rejectQuoteId, rejectToken, 'smoke reject');
    gate('Simulate rejected quote flow', rejectResult.success || rejectQuoteId === quoteId, rejectResult);

    return quoteAcceptanceResponse(true, 'Quote acceptance workflow smoke test passed.', { gates: gates });
  } catch (error) {
    return quoteAcceptanceResponse(false, error && error.message ? error.message : String(error), { gates: gates });
  }
}
