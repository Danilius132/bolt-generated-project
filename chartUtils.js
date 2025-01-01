import { Chart } from 'chart.js';

    export function createPaymentsByManagerChart(data, canvasId) {
      const managers = {};
      data.forEach((item) => {
        managers[item.manager] = (managers[item.manager] || 0) + item.payment;
      });

      new Chart(document.getElementById(canvasId), {
        type: 'bar',
        data: {
          labels: Object.keys(managers),
          datasets: [
            {
              label: 'Сумма оплат по менеджерам',
              data: Object.values(managers),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value + ' р.';
                },
              },
            },
          },
        },
      });
    }

    export function createPaymentsOverTimeChart(data, canvasId) {
      const paymentsOverTime = {};
      data.forEach((item) => {
        const dateStr = item.date.toISOString().split('T')[0];
        paymentsOverTime[dateStr] = (paymentsOverTime[dateStr] || 0) + item.payment;
      });

      const sortedDates = Object.keys(paymentsOverTime).sort(
        (a, b) => new Date(a) - new Date(b)
      );
      const sortedPayments = sortedDates.map((date) => paymentsOverTime[date]);

      new Chart(document.getElementById(canvasId), {
        type: 'line',
        data: {
          labels: sortedDates,
          datasets: [
            {
              label: 'Оплаты по времени',
              data: sortedPayments,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value + ' р.';
                },
              },
            },
          },
        },
      });
    }

    export function createPaymentsByServiceTypeChart(data, canvasId) {
      const serviceTypes = {};
      data.forEach((item) => {
        serviceTypes[item.service] = (serviceTypes[item.service] || 0) + item.payment;
      });

      const uniqueColors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 0, 0, 0.5)',
        'rgba(0, 255, 0, 0.5)',
        'rgba(0, 0, 255, 0.5)',
        'rgba(255, 255, 0, 0.5)',
        'rgba(255, 0, 255, 0.5)',
        'rgba(0, 255, 255, 0.5)',
      ];

      const borderColors = uniqueColors.map((color) => color.replace('0.5', '1'));

      new Chart(document.getElementById(canvasId), {
        type: 'pie',
        data: {
          labels: Object.keys(serviceTypes),
          datasets: [
            {
              label: 'Оплаты по типам услуг',
              data: Object.values(serviceTypes),
              backgroundColor: uniqueColors.slice(0, Object.keys(serviceTypes).length),
              borderColor: borderColors.slice(0, Object.keys(serviceTypes).length),
              borderWidth: 1,
            },
          ],
        },
      });
    }
