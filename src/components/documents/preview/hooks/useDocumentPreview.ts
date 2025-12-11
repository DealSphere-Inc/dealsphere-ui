import { useState } from 'react';
import { PreviewDocument } from '../types';

export function useDocumentPreview() {
  const [previewDocument, setPreviewDocument] = useState<PreviewDocument | null>(null);
  const [previewDocuments, setPreviewDocuments] = useState<PreviewDocument[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openPreview = (document: PreviewDocument, documents?: PreviewDocument[]) => {
    setPreviewDocument(document);
    if (documents && documents.length > 0) {
      setPreviewDocuments(documents);
      const index = documents.findIndex((d) => d.id === document.id);
      setCurrentIndex(index >= 0 ? index : 0);
    } else {
      setPreviewDocuments([document]);
      setCurrentIndex(0);
    }
  };

  const closePreview = () => {
    setPreviewDocument(null);
    setPreviewDocuments([]);
    setCurrentIndex(0);
  };

  const navigateToDocument = (index: number) => {
    if (index >= 0 && index < previewDocuments.length) {
      setCurrentIndex(index);
      setPreviewDocument(previewDocuments[index]);
    }
  };

  const navigateNext = () => {
    if (currentIndex < previewDocuments.length - 1) {
      navigateToDocument(currentIndex + 1);
    }
  };

  const navigatePrevious = () => {
    if (currentIndex > 0) {
      navigateToDocument(currentIndex - 1);
    }
  };

  const canNavigateNext = currentIndex < previewDocuments.length - 1;
  const canNavigatePrevious = currentIndex > 0;
  const hasMultipleDocuments = previewDocuments.length > 1;

  return {
    previewDocument,
    previewDocuments,
    currentIndex,
    isOpen: !!previewDocument,
    hasMultipleDocuments,
    canNavigateNext,
    canNavigatePrevious,
    openPreview,
    closePreview,
    navigateToDocument,
    navigateNext,
    navigatePrevious,
    setPreviewDocument,
    setCurrentIndex,
  };
}
