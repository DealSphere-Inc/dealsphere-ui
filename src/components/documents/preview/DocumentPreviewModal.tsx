'use client';

import { useEffect } from 'react';
import { Modal } from '@/ui';
import { DocumentPreviewToolbar } from './DocumentPreviewToolbar';
import { DocumentNavigator } from './navigation/DocumentNavigator';
import { PDFViewer } from './viewers/PDFViewer';
import { ImageViewer } from './viewers/ImageViewer';
import { OfficeDocViewer } from './viewers/OfficeDocViewer';
import { UnsupportedViewer } from './viewers/UnsupportedViewer';
import { DocumentPreviewProps } from './types';

export function DocumentPreviewModal({
  document,
  documents,
  currentIndex = 0,
  isOpen,
  onClose,
  onNavigate,
  onDownload,
  onShare,
  onPrint,
}: DocumentPreviewProps) {
  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close
      if (e.key === 'Escape') {
        onClose();
      }

      // Arrow keys for navigation (only if multiple documents)
      if (documents && documents.length > 1 && onNavigate) {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          onNavigate(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < documents.length - 1) {
          onNavigate(currentIndex + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, documents, onNavigate, onClose]);

  const renderViewer = () => {
    switch (document.type) {
      case 'pdf':
        return (
          <PDFViewer
            url={document.url}
            onLoadError={(error) => console.error('PDF load error:', error)}
          />
        );

      case 'image':
        return (
          <ImageViewer
            url={document.url}
            alt={document.name}
            onLoadError={(error) => console.error('Image load error:', error)}
          />
        );

      case 'word':
      case 'excel':
      case 'presentation':
        return (
          <OfficeDocViewer
            url={document.url}
            fileName={document.name}
            fileType={document.type}
            onLoadError={(error) => console.error('Office doc load error:', error)}
          />
        );

      case 'archive':
      case 'other':
      default:
        return (
          <UnsupportedViewer
            document={document}
            onDownload={onDownload ? () => onDownload(document.id) : undefined}
          />
        );
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(document.id);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(document.id);
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint(document.id);
    }
  };

  const handlePrevious = () => {
    if (onNavigate && currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (onNavigate && documents && currentIndex < documents.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="full"
      hideCloseButton
      isDismissable={false}
      className="document-preview-modal"
    >
      <div className="flex flex-col h-screen">
        {/* Toolbar */}
        <DocumentPreviewToolbar
          document={document}
          onDownload={handleDownload}
          onShare={onShare ? handleShare : undefined}
          onPrint={handlePrint}
          onClose={onClose}
        />

        {/* Viewer */}
        <div className="flex-1 overflow-hidden">
          {renderViewer()}
        </div>

        {/* Navigation (only shown when multiple documents) */}
        {documents && documents.length > 1 && onNavigate && (
          <DocumentNavigator
            currentIndex={currentIndex}
            totalDocuments={documents.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canNavigatePrevious={currentIndex > 0}
            canNavigateNext={currentIndex < documents.length - 1}
          />
        )}
      </div>
    </Modal>
  );
}
