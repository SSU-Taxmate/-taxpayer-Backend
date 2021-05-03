// === include 'setup' then 'config' above ===
const labels = [
    '코스닥',
    '코스피',
    '금',
    'April',
    'May',
    'June',
    'July'
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: '매도',
      data: [2, 6, 3, 15, 5, 33, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    },{
      label: '매수',
      data: [10, 0, 3, 1, 20, 0, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }
    ]
  };
  // 설정 
  const config = {
    type: 'bar',
    data: data,
    options: {
      indexAxis:'y',
      scales: {
        x: {
          beginAtZero: true
        }
      }
    },
  };

  // myChart 위치에 그래프 그리기
  var myChart4 = new Chart(
    document.getElementById('barChart'),
    config
  );
