import logo from './logo.svg';
import './App.css';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6'],
  datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
          'rgb(0, 0, 255)',
          'rgb(0, 40, 240)',
          'rgb(0, 80, 225)',
          'rgb(0, 120, 210)',
          'rgb(0, 160, 200)',
          'rgb(0, 200, 190)'
      ],
      borderWidth: 1
  }]
}

function App() {
  return (
    <div style={{width: "300px"}}>
      <Doughnut data={data} width={100} options={{cutout: "90%", responsive: true, maintainAspectRatio: true}}/>
    </div>
  );
}

export default App;
