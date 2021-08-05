import { useMemo, useState } from "react";
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination,
  useRowSelect,
} from "react-table";
import { Paper, Checkbox } from "@material-ui/core";
import {
  Search as SearchIcon,
  Sliders,
  MoreVertical,
  ArrowLeft,
  ArrowRight,
} from "react-feather";
import "./table.css";

const imgAndName = (name, index) => (
  <div
    style={{
      display: "flex",
      justifyContent: "left",
      flexDirection: "row",
    }}
  >
    <img
      style={{
        borderRadius: Number.MAX_VALUE,
        width: "1.625rem",
        height: "1.625rem",
        display: "inline-block",
        marginRight: ".375rem",
      }}
      src={`https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-${index}.jpg`}
    />
    <span>{name}</span>
  </div>
);

const dummyData = [
  {
    name: "Dianna Smiley",
    jobTitle: "Designer",
    email: "diana.smiley@company.com",
    phone: "(988)568-3568",
    leadScore: "1/10",
    company: "Twitter",
  },
  {
    name: "Ab Hadley",
    jobTitle: "Developer",
    email: "ab.hadley@company.com",
    phone: "(650)430-9876",
    leadScore: "8/10",
    company: "Google",
  },
  {
    name: "Adolfo Hess",
    jobTitle: "Owner",
    email: "adolfo.hess@company.com",
    phone: "(968)682-1364",
    leadScore: "7/10",
    company: "Google",
  },
  {
    name: "Daniela Dewitt",
    jobTitle: "Designer",
    email: "daniela.dewitt@company.com",
    phone: "(650)430-9876",
    leadScore: "4/10",
    company: "Twitch",
  },
  {
    name: "Miyah Myles",
    jobTitle: "Founder",
    email: "miyah.myles@company.com",
    phone: "(935)165-8435",
    leadScore: "3/10",
    company: "Facebook",
  },
  {
    name: "Ryu Duke",
    jobTitle: "Designer",
    email: "ryu.duke@company.com",
    phone: "(937)596-0152",
    leadScore: "6/10",
    company: "Netflix",
  },
];

const dummyColumns = [
  {
    Header: "NAME",
    accessor: "name",
    Cell: ({ cell }) => imgAndName(cell.value, cell.row.index + 1),
  },
  {
    Header: "JOB TITLE",
    accessor: "jobTitle",
  },
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "PHONE",
    accessor: "phone",
  },
  {
    Header: "LEAD SCORE",
    accessor: "leadScore",
    Cell: ({ cell: { value } }) => <Score string={value} />,
  },
  {
    Header: "COMPANY",
    accessor: "company",
  },
];

const Score = ({ string }) => {
  const num = Number(string.split("/")[0]);
  return (
    <span
      style={{
        backgroundColor: num > 6 ? "#ccf7e5" : num > 3 ? "#fdf3d9" : "#fad7dd",
        color: num > 6 ? "#00d97e" : num > 3 ? "#f6c343" : "#e63757",
        padding: "0.2rem",
        borderRadius: ".375rem",
        fontSize: "76%",
      }}
    >
      {string}
    </span>
  );
};

const generateTableCellsFromRow = (row, rowKey) => {
  return (
    <tr key={rowKey}>
      {/* todo add the index as key */}
      {/* <td>
        <Checkbox
          className="table-checkbox"
          labelStyle={{ color: "black" }}
          iconStyle={{ fill: "white" }}
          style={{
            color: "#2c7be5",
            backgroundColor: "#e3ebf6",
            border: "none",
            borderRadius: "0.375rem",
            // height: "0.1rem",
            // width: "0.1rem",
          }}
        />
      </td> */}
      {row.cells.map((cell, index) => (
        <td>{cell.render("Cell")}</td>
      ))}
      <td>
        <MoreVertical stroke="#d2ddec" height="0.927rem" />
      </td>
    </tr>
  );
};

const generateTableHead = (headerGroups, getHeaderProps) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr>
          {/* <th>
            <Checkbox className="table-checkbox" />
          </th> */}
          {headerGroup.headers.map((column, index) => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              className={
                column.isSorted
                  ? column.isSortedDesc
                    ? "sort-desc"
                    : "sort-asc"
                  : ""
              }
              key={`head-${index}`}
              colSpan={column.id === "company" ? 2 : 1}
            >
              {column.render("Header")}
              <img
                className="sort-arrows"
                src="data:image/svg+xml;utf8,<svg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M3 0L6 4H0L3 0ZM3 10L0 6H6L3 10Z' fill='%2395AAC9'/></svg>"
              />
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

const CustomTable = ({ defaultPageSize = 10 }) => {
  // todo const { columns, data } = props;
  let [searchKey, setSearchKey] = useState("");
  const data = useMemo(() => dummyData, []);
  const columns = useMemo(() => dummyColumns, []);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination
    // useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = tableInstance;
  const handleSearchChange = (event) => {
    const value = event.target.value || undefined;
    setFilter("name", value || "");
    setSearchKey(value);
  };
  return (
    <Paper elevation={2} square={false} className="table-paper">
      <div className="controls">
        <SearchIcon
          id="search-icon"
          width=".9375rem"
          height=".9375rem"
          stroke="#95aac9"
        />
        <input
          value={searchKey}
          onChange={handleSearchChange}
          type="search"
          placeholder="Search"
          id="table-search"
        />
        <select
          className="cool-select"
          onChange={(event) => {
            setPageSize(Number(event.target.value) || defaultPageSize);
          }}
          defaultValue={defaultPageSize}
        >
          {[5, 10].map((count) => (
            <option value={count}>{count} per page</option>
          ))}
          <option value={Number.MAX_VALUE}>All</option>
        </select>
        <div className="table-filter">
          <Sliders id="sliders" width="0.8125rem" height="0.8125rem" />
          {" Filter"}
        </div>
      </div>
      <table>
        {generateTableHead(headerGroups)}
        <tbody>
          {page.map((row, index) => {
            prepareRow(row);
            return generateTableCellsFromRow(row, index);
          })}
        </tbody>
      </table>
      <div className="table-pages-controls">
        <div onClick={previousPage} className="previous-page">
          <ArrowLeft />
          Prev
        </div>
        <div onClick={nextPage} className="next-page">
          Next
          <ArrowRight />
        </div>
      </div>
    </Paper>
  );
};

const Contacts = ({ data, columns, tableView = true }) => {
  return tableView ? <CustomTable data={data} columns={columns} /> : null;
};

function App() {
  return <Contacts data={dummyData} columns={dummyColumns}></Contacts>;
}

export default App;
