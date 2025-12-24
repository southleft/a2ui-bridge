import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Pagination({ node, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const currentPage = properties.currentPage ?? 1;
  const totalPages = properties.totalPages ?? 1;
  const showFirstLast = properties.showFirstLast ?? true;

  const handlePageChange = (page: number) => {
    if (properties.onChange?.name && onAction) {
      onAction({
        actionName: properties.onChange.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { page },
      });
    }
  };

  const buttonClass = cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium',
    'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'
  );

  // Generate page numbers to display
  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', classesToString((theme.components as any).Pagination?.all ?? {}))}
    >
      <ul className="flex flex-row items-center gap-1">
        {showFirstLast && (
          <li>
            <button
              className={buttonClass}
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              aria-label="Go to first page"
            >
              {'<<'}
            </button>
          </li>
        )}
        <li>
          <button
            className={buttonClass}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            {'<'}
          </button>
        </li>
        {pages.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="px-4 py-2">...</span>
            ) : (
              <button
                className={cn(
                  buttonClass,
                  page === currentPage && 'bg-primary text-primary-foreground hover:bg-primary/90'
                )}
                onClick={() => handlePageChange(page as number)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            className={buttonClass}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            {'>'}
          </button>
        </li>
        {showFirstLast && (
          <li>
            <button
              className={buttonClass}
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Go to last page"
            >
              {'>>'}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
