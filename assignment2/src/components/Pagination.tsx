import React, { FunctionComponent } from "react";

interface IProp {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  totalResult: number;
}

export const Pagination: FunctionComponent<IProp> = ({
  pageNumber,
  setPageNumber,
  totalResult,
}) => {
  const paginationArr = usePagination(totalResult, pageNumber);
  const totalPages = Math.ceil(totalResult / 10);

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination mb-0 justify-content-center">
          <li className={`page-item ${pageNumber == 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              Previous
            </button>
          </li>
          {paginationArr.map((page, index) => {
            if (page == "DOTS") {
              return (
                <li key={index} className="page-item">
                  <button className="page-link">&#8230;</button>
                </li>
              );
            }

            return (
              <li
                key={index}
                className={`page-item ${pageNumber == page ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPageNumber(+page)}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li
            className={`page-item ${
              pageNumber == totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

function usePagination(totalResult: number, currentPage: number) {
  const range = (start: number, end: number) => {
    let length = end - start + 1;

    return Array.from({ length }, (_, i) => i + start);
  };
  const totalPages = Math.ceil(totalResult / 10);
  const maxPages = 6;

  if (totalPages <= maxPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - 1, 1);
  const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 5;
    let leftRange = range(1, leftItemCount);

    return [...leftRange, "DOTS", totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 5;
    let rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [1, "DOTS", ...rightRange];
  }

  let middleRange = range(leftSiblingIndex, rightSiblingIndex);
  return [1, "DOTS", ...middleRange, "DOTS", totalPages];
}
