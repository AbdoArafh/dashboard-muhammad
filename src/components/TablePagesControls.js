import { ArrowRight, ArrowLeft } from "react-feather";

const TablePagesControls = ({
  instance: { canPreviousPage, previousPage, canNextPage, nextPage },
}) => (
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
);

export default TablePagesControls;
