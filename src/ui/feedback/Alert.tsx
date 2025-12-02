import { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles = {
  info: {
    bg: 'bg-[var(--app-info-bg)]',
    border: 'border-[var(--app-info)]',
    text: 'text-[var(--app-info)]',
    icon: Info,
  },
  success: {
    bg: 'bg-[var(--app-success-bg)]',
    border: 'border-[var(--app-success)]',
    text: 'text-[var(--app-success)]',
    icon: CheckCircle2,
  },
  warning: {
    bg: 'bg-[var(--app-warning-bg)]',
    border: 'border-[var(--app-warning)]',
    text: 'text-[var(--app-warning)]',
    icon: AlertTriangle,
  },
  danger: {
    bg: 'bg-[var(--app-danger-bg)]',
    border: 'border-[var(--app-danger)]',
    text: 'text-[var(--app-danger)]',
    icon: AlertCircle,
  },
};

export function Alert({
  children,
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
  className = '',
}: AlertProps) {
  const styles = variantStyles[variant];
  const Icon = styles.icon;

  return (
    <div
      className={`${styles.bg} ${styles.border} border-l-4 rounded-lg p-4 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${styles.text} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          {title && (
            <div className={`font-medium mb-1 ${styles.text}`}>{title}</div>
          )}
          <div className="text-sm text-[var(--app-text)]">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={`${styles.text} hover:opacity-70 transition-opacity`}
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
