import { useState } from "react";

const UsePagination = (count, size, skipValue) => {
  const perPageItems = Math.ceil(count / size);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [...Array(perPageItems).keys()];
  const pagination = (
    <>
      {/* Pagination */}
      <div className="w-full dark:bg-gray-800 my-8">
        <div className="container flex flex-col items-center px-6 py-5 mx-auto space-y-6 sm:flex-row sm:justify-between sm:space-y-0 ">
          <div className="-mx-2">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`${
                  currentPage === page
                    ? "bg-orange-400 text-white"
                    : "bg-gray-100"
                } inline-flex items-center justify-center px-4 py-1 mx-2 text-gray-700 transition-colors duration-300 transform  rounded-lg dark:text-white dark:bg-gray-700`}
              >
                {page + 1}
              </button>
            ))}
          </div>

          <div className="text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-100">
              {skipValue + 1} - {skipValue + size}
            </span>{" "}
            of {count} records
          </div>
        </div>
      </div>
    </>
  );
  return [pagination, currentPage];
};

export default UsePagination;
