'use client';

import Zoom from 'react-medium-image-zoom';
import Image from 'next/image';
import { Spinner } from '@/ui';
import { ImageViewerProps } from '../types';
import 'react-medium-image-zoom/dist/styles.css';
import { useUIKey } from '@/store/ui';

export function ImageViewer({ url, alt, className = '', onLoadSuccess, onLoadError }: ImageViewerProps) {
  const { value: ui, patch: patchUI } = useUIKey(`image-viewer:${url}`, {
    isLoading: true,
    hasError: false,
  });
  const { isLoading, hasError } = ui;

  const handleLoad = () => {
    patchUI({ isLoading: false, hasError: false });
    onLoadSuccess?.();
  };

  const handleError = () => {
    patchUI({ isLoading: false, hasError: true });
    onLoadError?.(new Error('Failed to load image'));
  };

  return (
    <div className={`image-viewer flex items-center justify-center h-full bg-[var(--app-surface)] ${className}`}>
      {isLoading && (
        <div className="absolute flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <p className="text-sm text-[var(--app-text-muted)]">Loading image...</p>
        </div>
      )}

      {hasError ? (
        <div className="text-center p-8">
          <p className="text-[var(--app-danger)] mb-2">Failed to load image</p>
          <p className="text-sm text-[var(--app-text-muted)]">
            The image could not be displayed. It may be corrupted or unavailable.
          </p>
        </div>
      ) : (
        <Zoom>
          <div className="relative max-w-full max-h-[calc(100vh-200px)] w-full h-[calc(100vh-200px)]">
            <Image
              src={url}
              alt={alt}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 80vw"
              onLoadingComplete={handleLoad}
              onError={handleError}
              className="object-contain cursor-zoom-in"
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          </div>
        </Zoom>
      )}
    </div>
  );
}
