import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useRowSelect } from "react-table";
import { COLUMNS } from "./columns";
import styles from "./table.module.css";
import { useNavigate } from "react-router-dom";

function Table(props) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => props.BooksData, [props.BooksData]);
  const navigate = useNavigate();

  const [selectedRowId, setSelectedRowId] = useState(props.book);

  // Setuping up table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: props.page - 1 },
    },
    usePagination,
    useRowSelect
  );

  // Handling row selection functionality
  const handleRowClick = (row) => {
    setSelectedRowId(row.id);
    navigate(
      "/search/" +
        props.author +
        "/" +
        (pageIndex + 1) +
        "/" +
        row.allCells[0].value
    );
  };

  // Updating page when props (URL) changes
  useEffect(() => {
    gotoPage(parseInt(props.page) - 1);
  }, [props.page, gotoPage]);

  useEffect(() => {
    let foundIndex = page.findIndex((row) => {
      return row.cells[0].value === props.book;
    });
    foundIndex = foundIndex + 10 * (props.page - 1);
    setSelectedRowId(foundIndex.toString());
  }, [props.book, page, props.page]);

  return (
    <div>
      <div className={styles["pagination"]}>
        <button
          onClick={() => {
            navigate("/search/" + props.author + "/" + +"1");
          }}
          disabled={!canPreviousPage}
        >
          {"First"}
        </button>
        <button
          onClick={() => {
            navigate("/search/" + props.author + "/" + pageIndex);
          }}
          disabled={!canPreviousPage}
        >
          {"Previous"}
        </button>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button
          onClick={() => {
            navigate("/search/" + props.author + "/" + (pageIndex + 2));
          }}
          disabled={!canNextPage}
        >
          {"Next"}
        </button>
        <button
          onClick={() => {
            navigate("/search/" + props.author + "/" + pageCount);
          }}
          disabled={!canNextPage}
        >
          {"Last"}
        </button>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps({
                  onClick: () => handleRowClick(row),
                })}
                className={
                  row.id === selectedRowId
                    ? `${row.getRowProps().className} ${styles["selected"]}`
                    : `${row.getRowProps().className} ${styles["not-selected"]}`
                }
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  page: PropTypes.string,
  book: PropTypes.string,
  author: PropTypes.string,
  BooksData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.array,
      publisher: PropTypes.string,
      publishedDate: PropTypes.string,
      pageCount: PropTypes.string,
      language: PropTypes.string,
      categories: PropTypes.array,
      snippet: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

export default Table;
