import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const TableTemplate = ({
  data,
  headers,
  links = true,
  linksTitle,
  onClick,
  handleShowResult,
  onClickIs = true,
  handleShowResultIs = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last item of the current page
  const lastIndex = currentPage * 10;
  const firstIndex = lastIndex - 10;
  console.log(data);
  // Get the current page's data
  const currentData = data.slice(firstIndex, lastIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / 10);

  // Generate an array of page numbers to render
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="main-user">
        {headers?.[0] ? <h2>{headers[0]}</h2> : null}
        <table style={{ textCenter: "center" }}>
          {headers?.[1] ? (
            <thead>
              <tr>
                {headers.slice(1).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
                {links ? (
                  <td>
                    <NavLink
                      onClick={() => {
                        if (onClickIs) {
                          onClick(item?.club_name);
                          if (handleShowResultIs) {
                            handleShowResult(item, item?.competition_id);
                          }
                        } else {
                          handleShowResult(item?.competition_title);
                        }
                      }}
                    >
                      {linksTitle}
                    </NavLink>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-table">
          {pageNumbers.map((number) => (
            <span
              key={number}
              className={currentPage === number ? "active" : ""}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableTemplate;
