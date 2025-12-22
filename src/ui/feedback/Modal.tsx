import {
  Modal as NextUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import { ReactNode } from 'react';

// Create a custom interface that doesn't conflict with NextUIModalProps
export interface ModalProps {
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  isDismissable?: boolean;
  hideCloseButton?: boolean;
  className?: string;
}

export function Modal({
  title,
  children,
  footer,
  size = 'md',
  isOpen,
  onOpenChange,
  isDismissable,
  hideCloseButton,
  className,
}: ModalProps) {
  return (
    <NextUIModal
      size={size}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      hideCloseButton={hideCloseButton}
      className={className}
    >
      <ModalContent>
        {(_onClose) => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1">
                {title}
              </ModalHeader>
            )}
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </NextUIModal>
  );
}
