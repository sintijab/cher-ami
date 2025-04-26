import React, { useState } from "react";

type PaginationProps = {
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  return (
    <div className="row flex">
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md rounded-r-none border border-r-0 border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg cursor-pointer text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" />
        </svg>
      </button>

      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;

        const baseClasses =
          "border cursor-pointer border-r-0 border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

        const activeClasses = isActive
          ? "text-white bg-slate-800 border-slate-800"
          : "text-slate-600";

        const rounding =
          page === 1
            ? "rounded-md rounded-r-none"
            : page === totalPages
            ? "rounded-md rounded-l-none"
            : "rounded-none";

        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`${baseClasses} ${activeClasses} ${rounding}`}
            type="button"
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md rounded-l-none border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 cursor-pointer hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path fillRule="evenodd" clipRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
