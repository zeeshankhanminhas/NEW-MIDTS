'use client';

import { ChangeEvent, DragEvent, useMemo, useRef, useState } from 'react';

const MAX_FILES = 15;
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const MAX_TOTAL_SIZE = 250 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [
  '.step', '.stp', '.iges', '.igs', '.stl', '.dxf', '.dwg', '.sldprt', '.sldasm', '.pdf', '.docx', '.xlsx', '.csv', '.jpg', '.jpeg', '.png', '.webp', '.zip', '.rar',
];

const ACCEPT_VALUE = ALLOWED_EXTENSIONS.join(',');

type FileUploadZoneProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
};

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

function isAllowedExtension(filename: string) {
  const lower = filename.toLowerCase();
  return ALLOWED_EXTENSIONS.some((extension) => lower.endsWith(extension));
}

export default function FileUploadZone({ files, onFilesChange, disabled = false }: FileUploadZoneProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalSize = useMemo(() => files.reduce((sum, file) => sum + file.size, 0), [files]);

  function validateAndMerge(incoming: File[]) {
    const next = [...files];
    const validationMessages: string[] = [];

    for (const file of incoming) {
      if (!isAllowedExtension(file.name)) {
        validationMessages.push(`${file.name}: unsupported file type.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        validationMessages.push(`${file.name}: exceeds 50MB per-file limit.`);
        continue;
      }
      if (next.length >= MAX_FILES) {
        validationMessages.push(`Maximum ${MAX_FILES} files allowed.`);
        break;
      }

      const nextTotal = next.reduce((sum, item) => sum + item.size, 0) + file.size;
      if (nextTotal > MAX_TOTAL_SIZE) {
        validationMessages.push(`${file.name}: exceeds total 250MB upload limit.`);
        continue;
      }

      next.push(file);
    }

    setErrors(validationMessages);
    onFilesChange(next);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files ? Array.from(event.target.files) : [];
    validateAndMerge(selected);
    event.target.value = '';
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    if (disabled) return;
    const dropped = Array.from(event.dataTransfer.files || []);
    validateAndMerge(dropped);
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    onFilesChange(next);
  }

  return (
    <div className="grid gap-4">
      <input
        ref={inputRef}
        id="technical-files"
        name="technicalFiles"
        type="file"
        className="sr-only"
        multiple
        accept={ACCEPT_VALUE}
        onChange={handleInputChange}
        disabled={disabled}
      />

      <div
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`rounded-md border border-dashed p-6 transition ${dragActive ? 'border-black bg-black/[0.02]' : 'border-black/20 bg-transparent'}`}
      >
        <div className="grid gap-3 text-center">
          <p className="text-sm font-medium uppercase text-[var(--subtle)]">Upload drawings and technical files</p>
          <p className="text-sm text-[var(--muted)]">Drag and drop files here, or select files manually.</p>
          <div>
            <button
              type="button"
              className="min-h-11 rounded-md border border-black/20 px-5 py-2 text-xs font-medium uppercase text-[var(--ink)] transition hover:border-black disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
            >
              Select files
            </button>
          </div>
          <p className="text-xs text-[var(--subtle)]">Up to 15 files, 50MB per file, 250MB total.</p>
        </div>
      </div>

      <div className="grid gap-2 text-xs text-[var(--subtle)]">
        <p>Allowed file types: {ALLOWED_EXTENSIONS.join(', ')}</p>
        <p>
          Queue: {files.length}/{MAX_FILES} files · Total {formatBytes(totalSize)} / {formatBytes(MAX_TOTAL_SIZE)}
        </p>
      </div>

      {files.length > 0 ? (
        <ul className="grid gap-2 rounded-md border border-black/10 p-3">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 border-b border-black/5 pb-2 text-sm last:border-b-0 last:pb-0">
              <div className="min-w-0">
                <p className="truncate text-[var(--ink)]">{file.name}</p>
                <p className="text-xs text-[var(--subtle)]">{formatBytes(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="rounded-md border border-black/20 px-3 py-1 text-xs uppercase text-[var(--ink)] transition hover:border-black"
                disabled={disabled}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {errors.length > 0 ? (
        <div className="rounded-md border border-black/15 p-3" role="alert">
          <p className="text-xs font-medium uppercase text-[var(--ink)]">Upload validation</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            {errors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
