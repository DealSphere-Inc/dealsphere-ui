'use client';

import { PageContainer, PageHeader, Breadcrumb } from '@/ui';
import { getRouteConfig } from '@/config/routes';
import { DocumentManager, type Document, type DocumentFolder, type DocumentCategory, type AccessLevel } from './document-manager';
import { DocumentPreviewModal, useDocumentPreview, getMockDocumentUrl, type PreviewDocument } from './preview';
import { mockDocuments, mockFolders } from '@/data/mocks/documents';
import { useUIKey } from '@/store/ui';

export function Documents() {
  const routeConfig = getRouteConfig('/documents');
  const { value: ui, patch: patchUI } = useUIKey<{
    documents: Document[];
    folders: DocumentFolder[];
    currentFolderId: string | null;
  }>('documents-page', {
    documents: mockDocuments,
    folders: mockFolders,
    currentFolderId: null,
  });
  const { documents, folders, currentFolderId } = ui;
  const preview = useDocumentPreview();

  const handleUpload = (folderId?: string | null) => {
    console.log('Upload file to folder:', folderId);
    // TODO: Implement file upload
  };

  const handleCreateFolder = (parentId?: string | null) => {
    console.log('Create folder in parent:', parentId);
    // TODO: Implement folder creation (e.g., open modal to capture name)
  };

  const handleOpenDocument = (documentId: string) => {
    const doc = documents.find((d) => d.id === documentId);
    if (doc) {
      const previewDoc: PreviewDocument = {
        id: doc.id,
        name: doc.name,
        type: doc.type,
        url: getMockDocumentUrl(doc.type),
        size: doc.size,
        uploadedBy: doc.uploadedBy,
        uploadedDate: doc.uploadedDate,
        category: doc.category,
        tags: doc.tags,
      };

      // Map all documents for navigation
      const allPreviewDocs: PreviewDocument[] = documents.map((d) => ({
        id: d.id,
        name: d.name,
        type: d.type,
        url: getMockDocumentUrl(d.type),
        size: d.size,
        uploadedBy: d.uploadedBy,
        uploadedDate: d.uploadedDate,
        category: d.category,
        tags: d.tags,
      }));

      preview.openPreview(previewDoc, allPreviewDocs);
    }
  };

  const handleDownloadDocument = (documentId: string) => {
    console.log('Download document:', documentId);
    // TODO: Implement document download
  };

  const handleShareDocument = (documentId: string) => {
    console.log('Share document:', documentId);
    // TODO: Implement document sharing
  };

  const handleDeleteDocument = (documentId: string) => {
    console.log('Delete document:', documentId);
    patchUI({ documents: documents.filter((doc) => doc.id !== documentId) });
  };

  const handleToggleFavorite = (documentId: string) => {
    patchUI({
      documents: documents.map((doc) =>
        doc.id === documentId ? { ...doc, isFavorite: !doc.isFavorite } : doc
      ),
    });
  };

  const handleMoveDocument = (documentId: string, newFolderId: string | null) => {
    console.log('Move document:', documentId, newFolderId);
    patchUI({
      documents: documents.map((doc) =>
        doc.id === documentId ? { ...doc, folderId: newFolderId } : doc
      ),
    });
  };

  const handleUpdateAccess = (documentId: string, accessLevel: AccessLevel) => {
    console.log('Update access:', documentId, accessLevel);
    patchUI({
      documents: documents.map((doc) =>
        doc.id === documentId ? { ...doc, accessLevel } : doc
      ),
    });
  };

  return (
    <PageContainer>
      <Breadcrumb items={routeConfig?.breadcrumbs || []} />
      <PageHeader
        title="Documents"
        description="Manage and organize all your fund documents in one secure location"
      />

      <DocumentManager
        documents={documents}
        folders={folders}
        currentFolderId={currentFolderId}
        onUpload={handleUpload}
        onCreateFolder={handleCreateFolder}
        onOpenDocument={handleOpenDocument}
        onDownloadDocument={handleDownloadDocument}
        onShareDocument={handleShareDocument}
        onDeleteDocument={handleDeleteDocument}
        onToggleFavorite={handleToggleFavorite}
        onMoveDocument={handleMoveDocument}
        onUpdateAccess={handleUpdateAccess}
      />

      {/* Document Preview Modal */}
      {preview.isOpen && preview.previewDocument && (
        <DocumentPreviewModal
          document={preview.previewDocument}
          documents={preview.previewDocuments}
          currentIndex={preview.currentIndex}
          isOpen={preview.isOpen}
          onClose={preview.closePreview}
          onNavigate={preview.navigateToDocument}
          onDownload={handleDownloadDocument}
          onShare={handleShareDocument}
        />
      )}
    </PageContainer>
  );
}
