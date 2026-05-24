export const REQUEST_TIMEOUT_MS = 20000;

export type SubmitResult = {
  submissionId: string;
  timestamp: string;
};

function withTimeout(ms: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

export async function submitJsonPayload(payload: Record<string, unknown>): Promise<SubmitResult> {
  const webhookUrl = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_URL || '';
  const webhookToken = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN || '';

  if (!webhookUrl || !webhookToken) {
    throw new Error('Webhook configuration is missing.');
  }

  let response: Response;
  try {
    response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, webhookToken }),
      signal: withTimeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${REQUEST_TIMEOUT_MS / 1000} seconds.`);
    }
    throw new Error('Network request failed.');
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }

  const json = await response.json().catch(() => ({}));
  return {
    submissionId: typeof json.submissionId === 'string' ? json.submissionId : `midts-${Date.now()}`,
    timestamp: typeof json.timestamp === 'string' ? json.timestamp : new Date().toISOString(),
  };
}

export async function submitUrlEncodedPayload(payload: Record<string, string>): Promise<void> {
  const webhookUrl = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_URL || '';
  const webhookToken = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN || '';

  if (!webhookUrl || !webhookToken) {
    throw new Error('Webhook configuration is missing.');
  }

  const body = new URLSearchParams();
  Object.entries({ ...payload, webhookToken }).forEach(([key, value]) => {
    body.set(key, value);
  });

  let response: Response;
  try {
    response = await fetch(webhookUrl, {
      method: 'POST',
      body,
      signal: withTimeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${REQUEST_TIMEOUT_MS / 1000} seconds.`);
    }
    throw new Error('Network request failed.');
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }
}

export async function submitUrlEncodedPayloadWithFallback(payload: Record<string, string>): Promise<void> {
  try {
    await submitUrlEncodedPayload(payload);
    return;
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    const shouldAttemptFallback = message.includes('Network request failed') || message.includes('Failed to fetch');

    if (!shouldAttemptFallback) {
      throw error;
    }
  }

  const webhookUrl = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_URL || '';
  const webhookToken = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN || '';

  if (!webhookUrl || !webhookToken) {
    throw new Error('Webhook configuration is missing.');
  }

  const body = new URLSearchParams();
  Object.entries({ ...payload, webhookToken }).forEach(([key, value]) => {
    body.set(key, value);
  });

  // Targeted compatibility fallback for Apps Script/CORS edge cases.
  await fetch(webhookUrl, {
    method: 'POST',
    mode: 'no-cors',
    body,
    signal: withTimeout(REQUEST_TIMEOUT_MS),
  });
}

export type EncodedUploadFile = {
  name: string;
  type: string;
  sizeBytes: number;
  contentBase64: string;
};

export async function filesToBase64(files: File[], onProgress?: (completed: number, total: number) => void): Promise<EncodedUploadFile[]> {
  const encoded: EncodedUploadFile[] = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    // eslint-disable-next-line no-await-in-loop
    const nextFile = await new Promise<EncodedUploadFile>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || '');
        const [, base64 = ''] = result.split(',');
        resolve({
          name: file.name,
          type: file.type || 'application/octet-stream',
          sizeBytes: file.size,
          contentBase64: base64,
        });
      };
      reader.onerror = () => reject(new Error(`Failed to read ${file.name}.`));
      reader.readAsDataURL(file);
    });

    encoded.push(nextFile);
    onProgress?.(index + 1, files.length);
  }

  return encoded;
}
