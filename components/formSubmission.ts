export const REQUEST_TIMEOUT_MS = 20000;

function withTimeout(ms: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

function getConfig() {
  const webhookUrl = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_URL || '';
  const webhookToken = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN || '';
  if (!webhookUrl || !webhookToken) throw new Error('Webhook configuration is missing.');
  return { webhookUrl, webhookToken };
}

export async function submitToAppsScript(body: URLSearchParams): Promise<void> {
  const { webhookUrl } = getConfig();
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      body,
      signal: withTimeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${REQUEST_TIMEOUT_MS / 1000} seconds.`);
    }
    throw new Error('Network request failed.');
  }
}

export function buildBody(payload: Record<string, string>) {
  const { webhookToken } = getConfig();
  const body = new URLSearchParams();
  Object.entries({ ...payload, webhookToken }).forEach(([k, v]) => body.set(k, v));
  return body;
}

export async function filesToBase64(files: File[], onProgress?: (completed: number, total: number) => void) {
  const encoded: Array<{ uploadId: string; name: string; type: string; size: number; base64: string }> = [];
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    // eslint-disable-next-line no-await-in-loop
    const data = await new Promise<{ uploadId: string; name: string; type: string; size: number; base64: string }>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || '');
        const [, base64 = ''] = result.split(',');
        resolve({
          uploadId: `${Date.now()}-${index + 1}`,
          name: file.name,
          type: file.type || 'application/octet-stream',
          size: file.size,
          base64,
        });
      };
      reader.onerror = () => reject(new Error(`Failed to read ${file.name}.`));
      reader.readAsDataURL(file);
    });
    encoded.push(data);
    onProgress?.(index + 1, files.length);
  }
  return encoded;
}
