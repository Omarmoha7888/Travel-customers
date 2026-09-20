// In-memory document buffer for server runtime so agents can download documents directly via HTTP GET
export interface StoredDocument {
  referenceId: string;
  fileName: string;
  mimeType: string;
  dataBase64: string;
  uploadedAt: string;
}

const documentStore = new Map<string, StoredDocument>();

export function storeDocumentForDownload(doc: StoredDocument): void {
  if (!doc.referenceId) return;
  // Keep last 100 documents to avoid memory creep
  if (documentStore.size > 100) {
    const oldestKey = documentStore.keys().next().value;
    if (oldestKey) documentStore.delete(oldestKey);
  }
  documentStore.set(doc.referenceId.toUpperCase(), doc);
}

export function getDocumentForDownload(referenceId: string): StoredDocument | undefined {
  if (!referenceId) return undefined;
  return documentStore.get(referenceId.toUpperCase());
}
