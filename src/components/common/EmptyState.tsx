import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-2xl px-lg text-center gap-md">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface-variant">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <div className="space-y-xs max-w-xs">
        <p className="font-display text-base font-bold text-on-surface uppercase tracking-wide">
          {title}
        </p>
        {description && (
          <p className="font-body-md text-sm text-secondary leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-sm">{action}</div>}
    </div>
  );
}
