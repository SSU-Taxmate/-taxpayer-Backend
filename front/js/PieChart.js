// === include 'setup' then 'config' above ===
const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];
// 데이터 설정
const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

// 설정 
const config = {
  type: 'pie',
  data,
  options: {
    responsive:false,
    plugins: {
      title: {
        display: true,
        text: '세입내역',
        padding: {
          top: 10,
          bottom: 30
        }
      }

    }
  }
};
const config2 = {
  type: 'pie',
  data,
  options: {
    responsive:false,
    plugins: {
      title: {
        display: true,
        text: '세출내역',
        padding: {
          top: 10,
          bottom: 30
        }
      }

    }
  }
};


// myChart 위치에 그래프 그리기
var myChart = new Chart(
  document.getElementById('myChart'),
  config
);

var myChart2 = new Chart(
  document.getElementById('myChart2'),
  config2
);

