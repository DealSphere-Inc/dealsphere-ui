'use client';

import { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import { Spinner } from '@/ui';
import { ImageViewerProps } from '../types';
import 'react-medium-image-zoom/dist/styles.css';

export function ImageViewer({ url, alt, className = '', onLoadSuccess, onLoadError }: ImageViewerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoadSuccess?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
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
          <img
            src={url}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className="max-w-full max-h-[calc(100vh-200px)] object-contain cursor-zoom-in"
            style={{ display: isLoading ? 'none' : 'block' }}
          />
        </Zoom>
      )}
    </div>
  );
}
