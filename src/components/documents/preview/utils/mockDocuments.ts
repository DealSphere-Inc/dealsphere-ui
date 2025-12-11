import { DocumentType } from '../types';

export const MOCK_DOCUMENTS = {
  pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  image: 'https://via.placeholder.com/1920x1080/0066FF/FFFFFF?text=VestLedger+Document',
  word: 'https://calibre-ebook.com/downloads/demos/demo.docx',
  excel: '/mocks/sample.xlsx',
  presentation: '/mocks/sample.pptx',
};

export function getMockDocumentUrl(type: DocumentType): string {
  switch (type) {
    case 'pdf':
      return MOCK_DOCUMENTS.pdf;
    case 'image':
      return MOCK_DOCUMENTS.image;
    case 'word':
      return MOCK_DOCUMENTS.word;
    case 'excel':
      return MOCK_DOCUMENTS.excel;
    case 'presentation':
      return MOCK_DOCUMENTS.presentation;
    default:
      return MOCK_DOCUMENTS.pdf;
  }
}

export function inferDocumentType(fileName: string): DocumentType {
  const ext = fileName.split('.').pop()?.toLowerCase();

  const typeMap: Record<string, DocumentType> = {
    pdf: 'pdf',
    doc: 'word',
    docx: 'word',
    xls: 'excel',
    xlsx: 'excel',
    ppt: 'presentation',
    pptx: 'presentation',
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    gif: 'image',
    bmp: 'image',
    webp: 'image',
    zip: 'archive',
    rar: 'archive',
    '7z': 'archive',
  };

  return (typeMap[ext || ''] as DocumentType) || 'other';
}
