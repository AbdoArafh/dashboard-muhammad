import CheckedBoxIcon from "./CheckedBoxIcon";

const DeletePopup = ({ selectedFlatRows, data, setData }) => (
  <div className="delete-popup-container">
    <div
      className="delete-popup"
      style={{
        visibility: selectedFlatRows.length === 0 ? "hidden" : "visible",
      }}
    >
      <CheckedBoxIcon className="checked-box-icon" />
      {selectedFlatRows.length < 2
        ? `${selectedFlatRows.length} item`
        : `${selectedFlatRows.length} items`}
      <button
        onClick={() => {
          const dataCopy = [...data];
          for (let i = selectedFlatRows.length - 1; i >= 0; i--)
            dataCopy.splice(selectedFlatRows[i].index, 1);
          setData(dataCopy);
        }}
        className="delete-popup-button"
      >
        Delete
      </button>
    </div>
  </div>
);

export default DeletePopup;
