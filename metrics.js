export function calculateMetrics(data) {
      const totalRevenue = data.reduce((sum, item) => sum + item.payment, 0);
      const averageCheck = totalRevenue / data.length;
      const uniqueClients = new Set(data.map((item) => item.client)).size;

      return {
        totalRevenue: totalRevenue.toFixed(2),
        averageCheck: averageCheck.toFixed(2),
        numberOfClients: uniqueClients,
      };
    }

    export function displayMetrics(metrics, containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';

      const createMetricCard = (title, value, color) => {
        const card = document.createElement('div');
        card.className = 'metric-card';
        card.style.backgroundColor = color;

        const titleElement = document.createElement('h4');
        titleElement.className = 'metric-title';
        titleElement.textContent = title;
        card.appendChild(titleElement);

        const valueElement = document.createElement('p');
        valueElement.className = 'metric-value';
        valueElement.textContent = value;
        card.appendChild(valueElement);

        return card;
      };

      const totalRevenueCard = createMetricCard(
        'Общая выручка',
        `₽${metrics.totalRevenue}`,
        '#e0f2f1'
      );
      const averageCheckCard = createMetricCard(
        'Средний чек',
        `₽${metrics.averageCheck}`,
        '#e8eaf6'
      );
      const numberOfClientsCard = createMetricCard(
        'Количество клиентов',
        metrics.numberOfClients,
        '#fce4ec'
      );

      container.appendChild(totalRevenueCard);
      container.appendChild(averageCheckCard);
      container.appendChild(numberOfClientsCard);
    }
