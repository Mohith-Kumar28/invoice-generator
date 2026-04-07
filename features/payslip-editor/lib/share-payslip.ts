import LZString from "lz-string";
import type { Payslip } from "@/types/payslip.types";

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

  if (isRecord(obj.employee)) {
    obj.employee = {
      ...obj.employee,
      dateOfJoining: parseDate(obj.employee.dateOfJoining),
    };
  }

  return obj;
}

export function payslipToSharePayload(payslip: Partial<Payslip>) {
  const cloneRaw: unknown = JSON.parse(JSON.stringify(payslip, replacer));
  const clone: Record<string, unknown> = isRecord(cloneRaw) ? cloneRaw : {};

  delete clone.id;
  delete clone.createdAt;
  delete clone.updatedAt;
  delete clone.pdfBrand;
  delete clone.signature;

  if (isRecord(clone.employer)) delete clone.employer.logo;

  return clone;
}

export function encodePayslipToUrlParam(payslip: Partial<Payslip>) {
  const payload = payslipToSharePayload(payslip);
  const json = JSON.stringify(payload);
  return LZString.compressToEncodedURIComponent(json);
}

export function decodePayslipFromUrlParam(
  encoded: string,
): Partial<Payslip> | null {
  const json = LZString.decompressFromEncodedURIComponent(encoded);
  if (!json) return null;
  const parsed: unknown = JSON.parse(json);
  if (!isRecord(parsed)) return null;
  return reviveDates(parsed) as Partial<Payslip>;
}
