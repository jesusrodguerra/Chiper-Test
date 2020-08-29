import React from "react";

const Pagination = ({ page, updatePage }) => {
  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li className="page-item">
          <a
            className="pagination-previous"
            disabled={1 === page}
            onClick={() => {
              updatePage(-1);
            }}
            href="!#"
          >
            Previous
          </a>
        </li>
        <li>
          <a href="!#" className="pagination-link">
            {page}
          </a>
        </li>
        <li className="page-item">
          <a
            className="page-link"
            href="!#"
            onClick={() => {
              updatePage(1);
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
