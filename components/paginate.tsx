import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Paginate() {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
      <p className="w-full text-sm text-muted-foreground text-center sm:text-left">
        Menampilkan <span className="font-semibold text-foreground">1</span> –{" "}
        <span className="font-semibold text-foreground">6</span> dari{" "}
        <span className="font-semibold text-foreground">9</span> event
      </p>

      <Pagination className="mx-0 sm:justify-end">
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className="rounded-xl h-9 px-3 text-sm"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-xl h-9 w-9 text-sm">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              className="rounded-xl h-9 w-9 text-sm"
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-xl h-9 w-9 text-sm">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" className="rounded-xl h-9 px-3 text-sm" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
