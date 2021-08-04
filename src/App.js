import { useMemo, useState } from "react";
import { useTable } from "react-table";
import { Paper, Checkbox } from "@material-ui/core";
import { Search, Search as SearchIcon, Sliders } from "react-feather";
import "./table.css";
// todo remove these if neccessary
// import { Table } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

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
    leadScore: "5/10",
    company: "Google",
  },
];

const dummyColumns = [
  // {
  //   Header: <input type="checkbox" />,
  //   accessor: "checkbox",
  // },
  {
    Header: "NAME",
    accessor: "name",
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
      <td>
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
      </td>
      {row.cells.map((cell, index) =>
        cell.column.id == "leadScore" ? (
          <td>
            <Score string={cell.value} />
          </td>
        ) : (
          <td>{cell.render("Cell")}</td>
        )
      )}
    </tr>
  );
};

const generateTableHead = (headerGroups) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr>
          <th>
            <Checkbox className="table-checkbox" />
          </th>
          {headerGroup.headers.map((column, index) => (
            <th key={`head-${index}`}>
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

const CustomTable = (props) => {
  // todo const { columns, data } = props;
  let [searchKey, setSearchKey] = useState("");
  const data = useMemo(() => dummyData, []);
  const columns = useMemo(() => dummyColumns, []);
  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
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
          onChange={(event) => setSearchKey(event.target.value)}
          type="search"
          placeholder="Search"
          id="table-search"
        />
        <select className="cool-select">
          <option>10 per page</option>
          <option>5 per page</option>
          <option>All</option>
        </select>
        <div className="table-filter">
          <Sliders id="sliders" width="0.8125rem" height="0.8125rem" />
          {" Filter"}
        </div>
      </div>
      <table>
        {generateTableHead(headerGroups)}
        <tbody>
          {rows.map((row, index) => {
            prepareRow(row);
            return generateTableCellsFromRow(row, index);
          })}
        </tbody>
      </table>
    </Paper>
  );
};

const Contacts = (props, { tableView = true }) => {
  return tableView ? <CustomTable data={props.data} /> : null;
};

function App() {
  return <Contacts data={dummyData} columns={dummyColumns}></Contacts>;
}

export default App;
