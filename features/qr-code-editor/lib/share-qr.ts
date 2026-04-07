import LZString from "lz-string";
import type { QrCodeDoc } from "@/features/qr-code-editor/types/qr-code.types";

function replacer(_key: string, value: unknown) {
  if (value instanceof Date) return value.toISOString();
  return value;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function reviveDates(obj: Record<string, unknown>) {
  const parseDate = (v: unknown) => {
    if (typeof v !== "string") return v;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? v : d;
  };

  obj.createdAt = parseDate(obj.createdAt);
  obj.updatedAt = parseDate(obj.updatedAt);
  return obj;
}

export function qrToSharePayload(doc: Partial<QrCodeDoc>) {
  const cloneRaw: unknown = JSON.parse(JSON.stringify(doc, replacer));
  const clone: Record<string, unknown> = isRecord(cloneRaw) ? cloneRaw : {};

  delete clone.id;
  delete clone.createdAt;
  delete clone.updatedAt;
  delete clone.logoDataUrl;

  return clone;
}

export function encodeQrToUrlParam(doc: Partial<QrCodeDoc>) {
  const payload = qrToSharePayload(doc);
  const json = JSON.stringify(payload);
  return LZString.compressToEncodedURIComponent(json);
}

export function decodeQrFromUrlParam(
  encoded: string,
): Partial<QrCodeDoc> | null {
  const json = LZString.decompressFromEncodedURIComponent(encoded);
  if (!json) return null;
  const parsed: unknown = JSON.parse(json);
  if (!isRecord(parsed)) return null;
  return reviveDates(parsed) as Partial<QrCodeDoc>;
}
