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

function assertWebhookConfig(): { webhookUrl: string; webhookToken: string } {
  const webhookUrl = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_URL || '';
  const webhookToken = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN || '';

  if (!webhookUrl || !webhookToken) {
    throw new Error('Webhook configuration is missing.');
  }

  return { webhookUrl, webhookToken };
}


export type StructuredWebhookResponse<T = Record<string, unknown>> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function submitStructuredPayload<T = Record<string, unknown>>(payload: Record<string, unknown>): Promise<StructuredWebhookResponse<T>> {
  const { webhookUrl, webhookToken } = assertWebhookConfig();

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

  const json = (await response.json().catch(() => ({}))) as Partial<StructuredWebhookResponse<T>>;
  const message = typeof json.message === 'string' ? json.message : `Request failed with status ${response.status}.`;

  if (!response.ok) {
    throw new Error(message);
  }

  return {
    success: json.success === true,
    message,
    data: json.data as T | undefined,
  };
}

export async function submitJsonPayload(payload: Record<string, unknown>): Promise<SubmitResult> {
  const { webhookUrl, webhookToken } = assertWebhookConfig();

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

function submitViaHiddenForm(webhookUrl: string, payload: Record<string, string>): Promise<void> {
  if (typeof document === 'undefined') {
    return Promise.reject(new Error('Browser form transport is unavailable.'));
  }

  return new Promise((resolve, reject) => {
    const transportId = `midts_webhook_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const iframe = document.createElement('iframe');
    const form = document.createElement('form');
    let settled = false;

    const cleanup = () => {
      window.setTimeout(() => {
        iframe.remove();
        form.remove();
      }, 1000);
    };

    const finish = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    };

    const fail = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('Network request failed.'));
    };

    iframe.name = transportId;
    iframe.style.display = 'none';
    iframe.setAttribute('aria-hidden', 'true');

    form.method = 'POST';
    form.action = webhookUrl;
    form.target = transportId;
    form.enctype = 'application/x-www-form-urlencoded';
    form.style.display = 'none';

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    iframe.addEventListener('load', finish, { once: true });
    iframe.addEventListener('error', fail, { once: true });

    document.body.appendChild(iframe);
    document.body.appendChild(form);
    form.submit();

    window.setTimeout(finish, 3000);
  });
}

export async function submitUrlEncodedPayload(payload: Record<string, string>): Promise<void> {
  const { webhookUrl, webhookToken } = assertWebhookConfig();
  const payloadWithToken = { ...payload, webhookToken };

  await submitViaHiddenForm(webhookUrl, payloadWithToken);
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
