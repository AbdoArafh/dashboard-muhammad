import logo from './logo.svg';
import './App.css';
import { Doughnut } from 'react-chartjs-2';

// rgb(210,221,236)
// rgb(44,123,229)

const firstColor = {
  r: 210,
  g: 221,
  b: 236
}

const secondColor = {
  r: 44,
  g: 123,
  b: 229
}


const colorsFromTo = (first, second, arr) => {
  let colors = [];
  const diff = {
    r: second.r - first.r,
    g: second.g - first.g,
    b: second.b - first.b
  }

  const sortedArray = [...arr].sort((a, b) => a - b);
  const min = sortedArray[0];
  const max = sortedArray[sortedArray.length - 1];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    let precent = (item - min) / (max - min);
    let r = (precent * diff.r) + first.r;
    let g = (precent * diff.g) + first.g;
    let b = (precent * diff.b) + first.b;
    colors = [...colors, `rgb(${r}, ${g}, ${b})`];
  }
  return colors;
}

// 'rgb(0, 0, 255)',
//           'rgb(0, 40, 240)',
//           'rgb(0, 80, 225)',
//           'rgb(0, 120, 210)',
//           'rgb(0, 160, 200)',
//           'rgb(0, 200, 190)'

const list = [60, 25, 15];
const data = {
  labels: ['Direct', 'Organic', 'Refferal'],
  datasets: [{
    label: '# of Votes',
      data: list,
      backgroundColor: [
          ...colorsFromTo(firstColor, secondColor, list)
      ],
      borderWidth: 1
  }]
}

function App() {
  return (
    <div style={{width: "500px"}}>
      <Doughnut data={data} options={{
        cutout: "90%",
        responsive: true,
        maintainAspectRatio: true}}/>
    </div>
  );
}

export default App;

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
