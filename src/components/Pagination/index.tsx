import React from 'react';
import IconArrowBack from "@assets/icons/icon-arrow-back.svg";
import IconArrowForward from "@assets/icons/icon-arrow-forward.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsCount: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  currentPage,
  totalPages,
}) => {
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination">
      {currentPage !== 1 && <button
        onClick={() => onPageChange(currentPage - 1)}
        className="pagination-arrow"
      >
        <img src={IconArrowBack} className="icon-arrow" alt="Previous"/>
      </button>}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${page === currentPage ? 'pagination-number-active' : ''} pagination-number`}
        >
          {page}
        </button>
      ))}

      {currentPage !== totalPages && <button
        onClick={() => onPageChange(currentPage + 1)}
        className="pagination-arrow"
      >
        <img src={IconArrowForward} className="icon-arrow" alt="Next"/>
      </button>}
    </div>
  );
};

export default Pagination;