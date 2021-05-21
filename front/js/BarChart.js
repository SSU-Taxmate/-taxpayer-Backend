// === include 'setup' then 'config' above ===
const stock_bar_labels = [
    '코스닥',
    '코스피',
    '금',
  ];
  const stock_bar_data = {
    labels: stock_bar_labels,
    datasets: [{
      label: '매도',
      data: [2, 6, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        
      ],
      borderWidth: 1
    },{
      label: '매수',
      data: [10, 2, 3],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgb(54, 162, 235)'
      ],
      borderWidth: 1
    }
    ]
  };
  // 설정 
  const stock_bar_config = {
    type: 'bar',
    data: stock_bar_data,
    options: {
      responsive:false,
      indexAxis:'y',
      scales: {
        x: {
          beginAtZero: true
        }
      }
    },
  };
  /*매매 동향 bar그래프 */
  // myChart 위치에 그래프 그리기
  var stock_sale_bar = new Chart(
    document.getElementById('stock_sale_bar'),
    stock_bar_config
  );


  /* 재정상황 그래프 */
  const finance_labels = [
    '3월',
    '4월',
    '5월',
    '6월',
    '8월',
    '9월',
    '10월',
    '11월',
  ];
  const finance_data = {
    labels: finance_labels,
    datasets: [{
      label: '세입',
      data: [5, 6, 3, 8, 5, 0, 0],
      backgroundColor: [
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(153, 102, 255)'
      ],
      borderWidth: 1
    },{
      label: '세출',
      data: [10, 0, 3, 1, 10, 0, 0],
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
      ],
      borderWidth:1
    }
    ]
  };
  const finance_config = {
    type: 'bar',
    data: finance_data,
    options: {
      responsive:false,
      indexAxis:'x',
      scales: {
        x: {
          beginAtZero: true
        }
      }
    },
  };
  var finance_last = new Chart(
    document.getElementById('finance_last'),
    finance_config
  );