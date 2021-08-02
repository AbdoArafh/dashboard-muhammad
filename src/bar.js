import { Bar } from "react-chartjs-2";
import { React } from "react";

// rgb(210,221,236)
// rgb(44,123,229)

const mainColor = "rgb(44,123,229)";

const dateFromTo = (from, to, month) => {
  let arr = [];
  for (let i = from; i <= to; i++) {
    arr = [...arr, month + i];
  }
  return arr;
};

const list = [25, 20, 30, 22, 17, 10, 18, 26, 28, 26, 20, 32];
const data = {
  labels: dateFromTo(1, 12, "Oct "),
  datasets: [
    {
      label: "Bar Data",
      data: list,
      backgroundColor: mainColor,
    },
  ],
};

function App() {
  return (
    <div style={{ width: "" }}>
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
          barThickness: 10,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              titleAlign: "center",
              titleFont: {
                size: 14,
                weight: "normal",
              },
              backgroundColor: "white",
              bodyColor: "#95aac9",
              usePointStyle: true,
              borderColor: "#cfd3d8",
              borderWidth: 1,
              yAlign: "bottom",
              xAlign: "center",
              titleColor: "black",
              animations: false,
              padding: 12,
              callbacks: {
                title: (toolTipItem) => toolTipItem[0].label,
                label: (toolTipItem) => " " + toolTipItem.formattedValue + "%",
              },
            },
            title: {
              display: true,
              text: "Conversations",
              fontSize: 20,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => value + "%",
                color: "#95aac9",
              },
              grid: {
                borderDash: [3, 3],
                drawBorder: false,
                drawTicks: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "#95aac9",
                maxRotation: 0,
                font: {
                  size: 10,
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default App;
