import React, { useEffect } from "react";

type PaginationProps = {
  data: any;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  currentPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setDisplayData: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function Pagination({
  data,
  setCurrentPage,
  totalPages,
  currentPage,
  setItemsPerPage,
  itemsPerPage,
  setDisplayData,
}: PaginationProps) {
  useEffect(() => {
    if (data?.length === 0) {
      setDisplayData([]); // Clear displayData when no items exist
      setCurrentPage(1); // Reset to page 1 when data is empty
    } else {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
      setDisplayData(currentItems);
    }
  }, [currentPage, itemsPerPage, data, setDisplayData, setCurrentPage]);

  if (data?.length === 0) return null; // Hide pagination if no data

  const incrementPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const decrementPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPages = [1];
    const endPages = [totalPages];
    const aroundCurrentPage = [
      currentPage - 1,
      currentPage,
      currentPage + 1,
    ].filter((page) => page > 1 && page < totalPages);

    const pagesSet = new Set([
      ...startPages,
      ...aroundCurrentPage,
      ...endPages,
    ]);

    for (let i = 1; i <= totalPages; i++) {
      if (pagesSet.has(i)) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`${
              currentPage === i
                ? "btn btn-sm border-none bg-green-500 text-white"
                : ""
            } hover:bg-gray-100 rounded p-2`}
          >
            {i}
          </button>,
        );
      } else if (
        i === currentPage - 2 ||
        i === currentPage + 2 ||
        (i === 2 && !pagesSet.has(i - 1)) ||
        (i === totalPages - 1 && !pagesSet.has(i + 1))
      ) {
        pages.push(
          <span key={i} className="p-2">
            ...
          </span>,
        );
      }
    }

    return pages;
  };

  return (
    <div className="mt-5 flex flex-col justify-between rounded p-2 lg:flex-row">
      <div className="flex flex-col items-center space-x-2 text-xs lg:flex-row">
        <select
          className="text-gray-600 hover:bg-gray-100 inline-flex items-center rounded border bg-white px-2 py-2 font-medium dark:bg-boxdark-2 dark:text-bodydark"
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(1);
          }}
          value={itemsPerPage}
        >
          <option value="10">10 items</option>
          <option value="20">20 items</option>
          <option value="30">30 items</option>
          <option value="40">40 items</option>
          <option value="50">50 items</option>
        </select>
        <p className="text-gray-500 mt-4 lg:mt-0">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, data?.length)}{" "}
          to {Math.min(currentPage * itemsPerPage, data?.length)} of{" "}
          {data?.length} entries
        </p>
      </div>

      <nav
        aria-label="Pagination"
        className="text-gray-600 mt-8 flex items-center justify-center lg:mt-0"
      >
        <button
          type="button"
          onClick={decrementPage}
          disabled={currentPage === 1}
          className="btn btn-sm mr-3 bg-transparent px-4 font-medium shadow-none disabled:opacity-50 dark:bg-gray dark:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Prev
        </button>

        {renderPageNumbers()}

        <button
          type="button"
          className="btn btn-sm ml-3 bg-transparent px-4 font-medium shadow-none disabled:opacity-50 dark:bg-gray dark:text-black"
          onClick={incrementPage}
          disabled={currentPage === totalPages}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}
