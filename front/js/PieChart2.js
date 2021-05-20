

/*학생 숙제 내역 */

const hw_pie_data = {
  labels: [
    '소득세',
    '부동산세',
  ],
  datasets: [{
    data: [33, 20],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
    ],
    hoverOffset: 4,
  }]
};
const hw_pie_config = {
  type: 'pie',
  data: hw_pie_data,
  options: {
    responsive:false,
    plugins: {
      title: {
        display: true,
        text: '숙제 통계',
        padding: {
          top: 10,
          bottom: 30
        }
      }

    }
  }
};

var hw_pie = new Chart(
  document.getElementById('homework_pie'),
  hw_pie_config
);
