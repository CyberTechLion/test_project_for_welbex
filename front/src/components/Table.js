import React from "react";
import { useState, useMemo, useEffect } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
const axios = require("axios").default;

function Table({ currentPage, setCurrentPage, ...props }) {
  const [tableInfo, setTableInfo] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const linesPerPage = 20;

  useEffect(() => {
    fetchTable();
  }, []);

  // getting and saving json from the server
  async function fetchTable() {
    const response = await axios.get("http://localhost:5000/api");
    setTableInfo(response.data);
  }

  // calculating needed line indexes for the correct rendering
  const lastListIndex = currentPage * linesPerPage;
  const firstListIndex = lastListIndex - linesPerPage;

  // first sorting of the lines by ascending or descending values if needed
  const sortedLines = useMemo(() => {
    if (sortField) {
      const sorted = [...tableInfo].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      return sorted;
    }
    return tableInfo;
  }, [sortField, sortOrder, tableInfo]);

  // filtering the table after sorting
  const sotredAndFilteredLines = useMemo(() => {
    if (props.filteringOption !== "") {
      let filteringOption = props.filteringOption;

      if ( //if filtering option supposed to be a number
        props.columnChoice === "amount" ||
        props.columnChoice === "distance"
      ) {
        // turning a string to a number
        filteringOption = +filteringOption;
      }

      if (props.signChoice === "=") {
        return sortedLines.filter(
          (line) => line[props.columnChoice] === filteringOption
        );
      } else if (props.signChoice === ">") {
        if (typeof filteringOption === "number") {
          return sortedLines.filter(
            (line) => line[props.columnChoice] > filteringOption
          );
        } else {
          return sortedLines.filter(
            (line) =>
              line[props.columnChoice].toLowerCase() >
              filteringOption.toLowerCase()
          );
        }
      } else if (props.signChoice === "<") {
        if (typeof filteringOption === "number") {
          return sortedLines.filter(
            (line) => line[props.columnChoice] < filteringOption
          );
        } else {
          return sortedLines.filter(
            (line) =>
              line[props.columnChoice].toLowerCase() <
              filteringOption.toLowerCase()
          );
        }
      } else if (props.signChoice === "Содержит") {
        if (typeof filteringOption === "number") {
          return sortedLines.filter((line) =>
            String(line[props.columnChoice]).includes(String(filteringOption))
          );
        } else {
          return sortedLines.filter((line) =>
            line[props.columnChoice]
              .toLowerCase()
              .includes(filteringOption.toLowerCase())
          );
        }
      }
    } else {
      return sortedLines;
    }
  }, [
    props.columnChoice,
    props.signChoice,
    props.filteringOption,
    sortedLines,
  ]);

  // slicing the table for the pagination
  const filteredPagination = useMemo(() => {
    return sotredAndFilteredLines.slice(firstListIndex, lastListIndex);
  }, [sotredAndFilteredLines, firstListIndex, lastListIndex]);

  return (
    <div>
      <div style={{ minHeight: "75vh", margin: "0 10%" }}>
        <table className="table">
          <TableHead
            columns={props.headers}
            sortField={sortField}
            sortOrder={sortOrder}
            setSortField={setSortField}
            setSortOrder={setSortOrder}
          />
          <TableBody
            columns={props.headers}
            data={filteredPagination}
            filteringOptions={props.filteringOptions}
            linesPerPage={linesPerPage}
          />
        </table>
      </div>
      <Pagination
        totalLines={sotredAndFilteredLines.length}
        linesPerPage={linesPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Table;
