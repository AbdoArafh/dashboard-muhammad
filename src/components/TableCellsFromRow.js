import { MoreVertical } from "react-feather";

const TableCellsFromRow = ({ row, rowKey }) => {
  return (
    <tr key={rowKey}>
      {row.cells.map((cell, index) => (
        <td key={`r-${rowKey}c-${index}`}>{cell.render("Cell")}</td>
      ))}
      <td key={`r-${rowKey}c-more`}>
        <MoreVertical stroke="#d2ddec" height="0.927rem" />
      </td>
    </tr>
  );
};

export default TableCellsFromRow;
