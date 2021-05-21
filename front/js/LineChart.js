const stock_line_labels = [
    '월',
    '화',
    '수',
    '목',
    '금',
  ];
  const stock_line_data = {
    labels: stock_line_labels,
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
   const stock_line_config = {
    type: 'line',
    data: stock_line_data,
    options: {
      indexAxis:'x',
      scales: {
        x: {
          beginAtZero: true
        }
      }
    },
  };

  // myChart 위치에 그래프 그리기
  var stock_sale_line = new Chart(
    document.getElementById('stock_sale_line'),
    stock_line_config
  );