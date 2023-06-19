export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Title",
    Footer: "Title",
    accessor: "title",
  },
  {
    Header: "Author",
    Footer: "Author",
    accessor: "author",
    Cell: ({ value }) => (Array.isArray(value) ? value.join(", ") : value),
  },
  {
    Header: "Publisher",
    Footer: "Publisher",
    accessor: "publisher",
  },
  {
    Header: "Categories",
    Footer: "Categories",
    accessor: "categories",
  },
  {
    Header: "Page Count",
    Footer: "Page Count",
    accessor: "pageCount",
  },
];
