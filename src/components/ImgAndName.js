const ImgAndName = ({ string, index }) => (
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
    <span>{string}</span>
  </div>
);

export default ImgAndName;
