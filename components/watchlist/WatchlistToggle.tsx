'use client';

import { useCallback } from 'react';
import { Heart, LoaderIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface WatchlistToggleProps {
  id: string;
  isInWatchlist: boolean;
  disabled?: boolean;
  onToggle: (payload: { id: string; nextState: boolean }) => void;
  className?: string;
  label?: string;
};

export default function WatchlistToggle({
  id,
  isInWatchlist,
  disabled = false,
  onToggle,
  className = '',
  label = 'Watchlist',
}: WatchlistToggleProps) {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onToggle({ id, nextState: !isInWatchlist });
  }, [disabled, id, isInWatchlist, onToggle]);

  return (
    <button
      type="button"
      aria-pressed={isInWatchlist}
      aria-label={label}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium transition-colors',
        isInWatchlist
          ? 'border-(--color-primary)/30 bg-(--color-primary)/10 text-(--color-primary)'
          : 'border-(--border-input) bg-(--bg-surface) text-(--text-primary) hover:bg-(--bg-elevated)',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className
      )}
    >
      {
        disabled
          ? <LoaderIcon className="animate-spin" size={16} />
          : <Heart
              aria-hidden="true"
              size={14}
              className={cn('shrink-0', isInWatchlist ? 'fill-current text-(--color-primary)' : 'fill-none')}
            />
      }
    </button>
  );
};
