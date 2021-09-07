const TableHead = ({ headerGroups }) => {
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

export default TableHead;
