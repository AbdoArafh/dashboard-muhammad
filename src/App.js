import { useMemo, useState } from "react";
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination,
  useRowSelect,
} from "react-table";
import { Paper } from "@material-ui/core";
import { Search as SearchIcon, Sliders } from "react-feather";
import "./table.css";
import IndeterminateCheckbox from "./components/IndeterminateCheckbox";
import Score from "./components/Score";
import ImgAndName from "./components/ImgAndName";
import TableHead from "./components/TableHead";
import DeletePopup from "./components/DeletePopup";
import TableCellsFromRow from "./components/TableCellsFromRow";
import TablePagesControls from "./components/TablePagesControls";

const dummyData = [
  {
    name: { string: "Dianna Smiley", index: 1 },
    jobTitle: "Designer",
    email: "diana.smiley@company.com",
    phone: "(988)568-3568",
    leadScore: "1/10",
    company: "Twitter",
  },
  {
    name: { string: "Ab Hadley", index: 2 },
    jobTitle: "Developer",
    email: "ab.hadley@company.com",
    phone: "(650)430-9876",
    leadScore: "8/10",
    company: "Google",
  },
  {
    name: { string: "Adolfo Hess", index: 3 },
    jobTitle: "Owner",
    email: "adolfo.hess@company.com",
    phone: "(968)682-1364",
    leadScore: "7/10",
    company: "Google",
  },
  {
    name: { string: "Daniela Dewitt", index: 4 },
    jobTitle: "Designer",
    email: "daniela.dewitt@company.com",
    phone: "(650)430-9876",
    leadScore: "4/10",
    company: "Twitch",
  },
  {
    name: { string: "Miyah Myles", index: 5 },
    jobTitle: "Founder",
    email: "miyah.myles@company.com",
    phone: "(935)165-8435",
    leadScore: "3/10",
    company: "Facebook",
  },
  {
    name: { string: "Ryu Duke", index: 6 },
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
    Cell: ({ cell }) => (
      <ImgAndName string={cell.value.string} index={cell.value.index} />
    ),
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

const CustomTable = ({
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 20],
  columns,
  data,
}) => {
  let [searchKey, setSearchKey] = useState("");
  const [tableData, setTableData] = useState(useMemo(() => data, []));
  const tableColumns = useMemo(() => columns, []);
  const tableInstance = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
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
    page,
    setPageSize,
    selectedFlatRows,
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
          {pageSizeOptions.map((count) => (
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
        {<TableHead headerGroups={headerGroups} />}
        <tbody {...getTableBodyProps}>
          {page.map((row, index) => {
            prepareRow(row);
            return <TableCellsFromRow row={row} index={index} />;
          })}
        </tbody>
      </table>
      <TablePagesControls instance={tableInstance} />
      <DeletePopup
        selectedFlatRows={selectedFlatRows}
        data={tableData}
        setData={setTableData}
      />
    </Paper>
  );
};

const Contacts = ({ data, columns, tableView = true }) => {
  return <CustomTable data={data} columns={columns} tableview={tableView} />;
};

function App() {
  return <Contacts data={dummyData} columns={dummyColumns}></Contacts>;
}

export default App;
