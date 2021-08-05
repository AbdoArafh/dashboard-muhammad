import { useMemo, useState, useRef, useEffect, forwardRef } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import "./table.css";

const useStyles = makeStyles({
  icon: {
    backgroundColor: "#e3ebf6",
    borderRadius: ".375rem",
    width: "1rem",
    height: "1rem",
    border: "none",
    outline: "none",
  },
  checkedIcon: {
    backgroundColor: "#2c7be5",
    borderRadius: ".375rem",
    width: "1rem",
    height: "1rem",
    border: "none",
    outline: "none",
    "&:before": {
      display: "block",
      width: "1rem",
      height: "1rem",
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
  indeterminate: {
    backgroundColor: "#2c7be5",
    borderRadius: ".375rem",
    width: "1rem",
    height: "1rem",
    border: "none",
    outline: "none",
    "&:before": {
      display: "block",
      width: "1rem",
      height: "1rem",
      backgroundImage:
        "url(\"data:image/svg+xml;charset=UTF-8,%3csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cline x1='12' y1='8' x2='4' y2='8' stroke='white' stroke-width='2' stroke-linecap='round'/%3e%3c/svg%3e\")",
      content: '""',
    },
  },
});

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

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  const classes = useStyles();
  console.log(classes.checkedIcon);

  return (
    <Checkbox
      className={classes.root}
      icon={<span className={classes.icon} />}
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      indeterminateIcon={
        <span className={clsx(classes.icon, classes.indeterminate)} />
      }
      indeterminate={
        resolvedRef.current ? resolvedRef.current.indeterminate : false
      }
      ref={resolvedRef}
      {...rest}
    />
  );
});

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
              colSpan={index + 1 == headerGroup.headers.length ? 2 : 1}
            >
              {column.render("Header")}
              {column.id != "selection" ? (
                <img
                  className="sort-arrows"
                  src="data:image/svg+xml;utf8,<svg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M3 0L6 4H0L3 0ZM3 10L0 6H6L3 10Z' fill='%2395AAC9'/></svg>"
                  alt="<>"
                />
              ) : (
                ""
              )}
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
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
    selectedFlatRows,
    state: { selectedRowIds },
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
      <table {...getTableProps}>
        {generateTableHead(headerGroups)}
        <tbody {...getTableBodyProps}>
          {page.map((row, index) => {
            prepareRow(row);
            return generateTableCellsFromRow(row, index);
          })}
        </tbody>
      </table>
      <div className="table-pages-controls">
        <div
          onClick={previousPage}
          className={`previous-page${canPreviousPage ? "" : " disabled"}`}
        >
          <ArrowLeft />
          Prev
        </div>
        <div
          onClick={nextPage}
          className={`next-page${canNextPage ? "" : " disabled"}`}
        >
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
