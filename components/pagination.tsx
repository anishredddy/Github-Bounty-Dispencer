import { FC } from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ page, total, onPageChange }) => {
  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < total) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" onClick={handlePrevious} disabled={page === 1}>
        Previous
      </Button>
      <span>
        Page {page} of {total}
      </span>
      <Button variant="outline" onClick={handleNext} disabled={page === total}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
