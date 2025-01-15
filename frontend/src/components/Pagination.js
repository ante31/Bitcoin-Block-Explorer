import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination className="mt-3 justify-content-center">
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        const page =
          currentPage <= 3
            ? i + 1
            : currentPage > totalPages - 2
            ? totalPages - 4 + i
            : currentPage - 2 + i;

        return (
          page >= 1 &&
          page <= totalPages && (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Pagination.Item>
          )
        );
      })}
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

export default PaginationComponent;
