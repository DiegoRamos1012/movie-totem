import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// TODO: Incluir Tooltip nos botões "Anterior" e "Próximo"

type Props = {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (p: number) => void;
  className?: string;
  siblingCount?: number; // quantas páginas vizinhas mostrar (default 1)
};

function range(from: number, to: number) {
  const res: number[] = [];
  for (let i = from; i <= to; i++) res.push(i);
  return res;
}

/**
 * Simple pagination with:
 * - Prev / Next
 * - Window with elipses when many pages
 */
export function Pagination({
  total,
  pageSize,
  currentPage,
  onPageChange,
  className,
  siblingCount = 1,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // if only one page, render nothing (you can change this)
  if (totalPages <= 1) return null;

  // compute visible pages window
  const leftSiblingIndex = Math.max(1, currentPage - siblingCount);
  const rightSiblingIndex = Math.min(totalPages, currentPage + siblingCount);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  const pages: (number | "ellipsis")[] = [];

  // always show first
  pages.push(firstPageIndex);

  if (shouldShowLeftEllipsis) {
    pages.push("ellipsis");
  }

  const start = shouldShowLeftEllipsis ? leftSiblingIndex : 2;
  const end = shouldShowRightEllipsis ? rightSiblingIndex : totalPages - 1;

  pages.push(...range(start, end));

  if (shouldShowRightEllipsis) {
    pages.push("ellipsis");
  }

  if (totalPages > 1) {
    pages.push(lastPageIndex);
  }

  return (
    <nav
      aria-label="Pagination"
      className={clsx("flex items-center gap-2", className)}
    >
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <ul className="flex items-center gap-1 list-none p-0 m-0">
        {pages.map((p, idx) =>
          p === "ellipsis" ? (
            <li
              key={`e-${idx}`}
              className="px-2 select-none text-sm text-muted-foreground"
            >
              …
            </li>
          ) : (
            <li key={p}>
              <Button
                onClick={() => onPageChange(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={clsx(
                  "px-3 py-1 rounded-md text-sm",
                  p === currentPage
                    ? "bg-primary text-white px-4 py-2"
                    : "border"
                )}
              >
                {p}
              </Button>
            </li>
          )
        )}
      </ul>

      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </nav>
  );
}

export default Pagination;
