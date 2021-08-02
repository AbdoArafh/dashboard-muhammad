// import './App.css';
import { Doughnut } from "react-chartjs-2";
import { React } from "react";

// rgb(210,221,236)
// rgb(44,123,229)

const firstColor = {
  r: 210,
  g: 221,
  b: 236,
};

const secondColor = {
  r: 44,
  g: 123,
  b: 229,
};

const colorsFromTo = (first, second, arr) => {
  let colors = [];
  const diff = {
    r: second.r - first.r,
    g: second.g - first.g,
    b: second.b - first.b,
  };

  const sortedArray = [...arr].sort((a, b) => a - b);
  const min = sortedArray[0];
  const max = sortedArray[sortedArray.length - 1];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    let precent = (item - min) / (max - min);
    let r = precent * diff.r + first.r;
    let g = precent * diff.g + first.g;
    let b = precent * diff.b + first.b;
    colors = [...colors, `rgb(${r}, ${g}, ${b})`];
  }
  return colors;
};

const list = [60, 25, 15];
const data = {
  labels: ["Direct", "Organic", "Refferal"],
  datasets: [
    {
      label: "Doughnut Data",
      data: list,
      backgroundColor: [...colorsFromTo(firstColor, secondColor, list)],
      borderWidth: 1,
    },
  ],
};

function App() {
  return (
    <div style={{ width: "400px" }}>
      <Doughnut
        data={data}
        options={{
          cutout: "90%",
          responsive: true,
          maintainAspectRatio: true,
          hoverOffset: 13,
          offset: 8,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              usePointStyle: true,
              labels: {
                usePointStyle: true,
              },
            },
            tooltip: {
              backgroundColor: "white",
              bodyColor: "black",
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
                label: (toolTipItem) => " " + toolTipItem.parsed,
              },
            },
            title: {
              display: true,
              text: "Average Data per month",
              fontSize: 20,
            },
          },
        }}
      />
    </div>
  );
}

export default App;

// defaults.plugins.legend.position = "bottom";
// defaults.plugins.legend.labels.usePointStyle = true;
// defaults.plugins.tooltip.borderColor = "black";
// defaults.plugins.tooltip.backgroundColor = "white";
// defaults.plugins.tooltip.usePointStyle = true;
// defaults.plugins.tooltip.footerColor = "black";
// defaults.plugins.tooltip.bodyColor = "black";
// defaults.elements.arc.borderWidth = 50;

// defaults.plugins.tooltip.callbacks.footer = (items) => {
//   return "hi";
// };
// defaults.plugins.tooltip.callbacks.afterBody = (tooltipItems) => "afterBody";

// tooltips: {
//   custom: (tooltip) => {
//     const chart = this._chartRef.current;
//     if (!chart) return;
//     if (tooltip.opacity === 0) {
//       this.hide();
//       return
//     }
//     const position = chart.chartInstance.canvas.getBoundingClientRect();
//     const left = position.left + tooltip.caretX; // todo add the pageXOffset
//     const top = position.top + tooltip.caretY;
//     const date = tooltip.dataPoints[0].Xlabel;
//     const value = tooltip.dataPoints[0].Ylabel;
//     this.backgroundColor = "white";
//     this.setPositionAndData({top, left, date, value})
//   }
// },

// const objFromTwoArrays = (keys, values) => {
//   const obj = {}
//   for (let i = 0; i < keys.length; i++) {
//     obj[keys[i]] = values[i];
//   }
//   return obj
// }

// const sortObjByArray = (obj, arr) => {
//   let newArray = [];
//   for (let item of arr) newArray = [...newArray, obj[item]];
//   return newArray;
// }

// const colorsFromTo = (first, second, arr) => {
//   const n = arr.length;
//   let colors = [];
//   const diff = {
//     r: second.r - first.r,
//     g: second.g - first.g,
//     b: second.b - first.b,
//   }
//   // todo change this to include all colors
//   for (let i = 0; i < n; i++) {
//     colors = [...colors, `rgb(\
// ${((diff.r/n) * i) + first.r}, \
// ${((diff.g/n) * i) + first.g}, \
// ${((diff.b/n) * i) + first.b})`];
//   }
//   // todo encounter for similar keys
//   const unordered = objFromTwoArrays(list, colors);
//   const ordered = sortObjByArray(unordered, list);
//   console.log("unordered: ", unordered);
//   // return ordered.reverse();
//   return colors.reverse();
// }
