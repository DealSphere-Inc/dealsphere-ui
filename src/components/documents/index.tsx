'use client';

import { useState } from 'react';
import { PageContainer, PageHeader, Breadcrumb } from '@/ui';
import { getRouteConfig } from '@/config/routes';
import { DocumentManager, type Document, type DocumentFolder, type DocumentCategory, type AccessLevel } from './document-manager';
import { DocumentPreviewModal, useDocumentPreview, getMockDocumentUrl, type PreviewDocument } from './preview';

// Mock data
const mockFolders: DocumentFolder[] = [
  {
    id: '1',
    name: 'Legal Documents',
    path: '/Legal Documents',
    createdDate: new Date('2024-01-15'),
    createdBy: 'John Doe',
    documentCount: 12,
    accessLevel: 'internal',
    isDefault: false,
  },
  {
    id: '2',
    name: 'Financial Reports',
    path: '/Financial Reports',
    createdDate: new Date('2024-02-01'),
    createdBy: 'Jane Smith',
    documentCount: 25,
    accessLevel: 'internal',
    isDefault: false,
  },
  {
    id: '3',
    name: 'Tax Documents',
    path: '/Tax Documents',
    createdDate: new Date('2024-03-10'),
    createdBy: 'Mike Johnson',
    documentCount: 8,
    accessLevel: 'internal',
    isDefault: false,
  },
];

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Fund Partnership Agreement.pdf',
    type: 'pdf',
    category: 'legal',
    size: 2456789,
    uploadedBy: 'John Doe',
    uploadedDate: new Date('2024-01-15'),
    lastModified: new Date('2024-01-20'),
    lastModifiedBy: 'John Doe',
    version: 1,
    tags: ['partnership', 'legal', 'Q1-2024'],
    isFavorite: true,
    accessLevel: 'internal',
    sharedWith: [],
    isLocked: false,
    requiresSignature: true,
    signedBy: ['John Doe', 'Jane Smith'],
    isArchived: false,
    folderId: '1',
    folderPath: 'Legal Documents',
    fundName: 'Fund I',
  },
  {
    id: '2',
    name: 'Q4 2023 Financial Report.xlsx',
    type: 'excel',
    category: 'financial',
    size: 1234567,
    uploadedBy: 'Jane Smith',
    uploadedDate: new Date('2024-01-10'),
    lastModified: new Date('2024-01-15'),
    lastModifiedBy: 'Jane Smith',
    version: 2,
    tags: ['quarterly', 'financial', 'Q4-2023'],
    isFavorite: false,
    accessLevel: 'investor',
    sharedWith: [],
    isLocked: false,
    requiresSignature: false,
    isArchived: false,
    folderId: '2',
    folderPath: 'Financial Reports',
  },
  {
    id: '3',
    name: 'K-1 Tax Forms 2023.pdf',
    type: 'pdf',
    category: 'tax',
    size: 987654,
    uploadedBy: 'Mike Johnson',
    uploadedDate: new Date('2024-03-10'),
    lastModified: new Date('2024-03-12'),
    lastModifiedBy: 'Mike Johnson',
    version: 1,
    tags: ['tax', 'k1', '2023'],
    isFavorite: true,
    accessLevel: 'investor',
    sharedWith: [],
    isLocked: true,
    lockedBy: 'Mike Johnson',
    requiresSignature: false,
    isArchived: false,
    folderId: '3',
    folderPath: 'Tax Documents',
  },
];

export function Documents() {
  const routeConfig = getRouteConfig('/documents');
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [folders, setFolders] = useState<DocumentFolder[]>(mockFolders);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
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
    setDocuments(documents.filter(d => d.id !== documentId));
  };

  const handleToggleFavorite = (documentId: string) => {
    setDocuments(documents.map(d =>
      d.id === documentId ? { ...d, isFavorite: !d.isFavorite } : d
    ));
  };

  const handleMoveDocument = (documentId: string, newFolderId: string | null) => {
    console.log('Move document:', documentId, newFolderId);
    setDocuments(documents.map(d =>
      d.id === documentId ? { ...d, folderId: newFolderId } : d
    ));
  };

  const handleUpdateAccess = (documentId: string, accessLevel: AccessLevel) => {
    console.log('Update access:', documentId, accessLevel);
    setDocuments(documents.map(d =>
      d.id === documentId ? { ...d, accessLevel } : d
    ));
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
