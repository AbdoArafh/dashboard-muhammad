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

export default Score;
