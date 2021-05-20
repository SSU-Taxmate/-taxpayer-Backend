// === include 'setup' then 'config' above ===
/*세입 내역 */
const revenue_pie_data = {
  labels: [
    '소득세',
    '부동산세',
    '자리세',
    '부가가치세',
    '인지세',
    '증권 거래세'
  ],
  datasets: [{
    data: [33, 20,2,3,40,10],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    hoverOffset: 4
  }]
};
const revenue_pie_config = {
  type: 'pie',
  data:revenue_pie_data,
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
var rev_pie = new Chart(
  document.getElementById('revenue_pie'),
  revenue_pie_config
);

/*세출 내역 */

const expenditure_pie_data = {
  labels: [
    '문화비',
    '교육비',
    '환경미화비'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 205, 86)',
      'rgb(153, 102, 255)',
    ],
    hoverOffset: 4
  }]
};
const expenditure_pie_config = {
  type: 'pie',
  data:expenditure_pie_data,
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
var ex_pie = new Chart(
  document.getElementById('expenditure_pie'),
  expenditure_pie_config
);


