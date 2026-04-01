import type { Invoice } from "@/types/invoice.types";
import LZString from "lz-string";

function replacer(_key: string, value: any) {
  if (value instanceof Date) return value.toISOString();
  return value;
}

function reviveDates(obj: any) {
  const parseDate = (v: any) => {
    if (typeof v !== "string") return v;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? v : d;
  };

  obj.issueDate = parseDate(obj.issueDate);
  obj.dueDate = parseDate(obj.dueDate);
  obj.deliveryDate = parseDate(obj.deliveryDate);
  obj.createdAt = parseDate(obj.createdAt);
  obj.updatedAt = parseDate(obj.updatedAt);
  if (Array.isArray(obj.partialPayments)) {
    obj.partialPayments = obj.partialPayments.map((p: any) => ({
      ...p,
      date: parseDate(p?.date),
    }));
  }
  return obj;
}

export function invoiceToSharePayload(invoice: Partial<Invoice>) {
  const clone: any = JSON.parse(JSON.stringify(invoice, replacer));

  delete clone.id;
  delete clone.createdAt;
  delete clone.updatedAt;

  if (clone.from) delete clone.from.logo;
  if (clone.to) delete clone.to.logo;
  delete clone.signature;
  delete clone.upiQr;
  delete clone.pdfBrand;

  if (clone.bankDetails) {
    delete clone.bankDetails.logo;
  }

  delete clone.attachments;

  return clone;
}

export function encodeInvoiceToUrlParam(invoice: Partial<Invoice>) {
  const payload = invoiceToSharePayload(invoice);
  const json = JSON.stringify(payload);
  return LZString.compressToEncodedURIComponent(json);
}

export function decodeInvoiceFromUrlParam(encoded: string): Partial<Invoice> | null {
  const json = LZString.decompressFromEncodedURIComponent(encoded);
  if (!json) return null;
  const parsed: any = JSON.parse(json);
  return reviveDates(parsed);
}
