import { Chart, registerables } from 'chart.js';
    import { rawData, parseData } from './data.js';
    import {
      createPaymentsByManagerChart,
      createPaymentsOverTimeChart,
      createPaymentsByServiceTypeChart,
    } from './chartUtils.js';
    import { calculateMetrics, displayMetrics } from './metrics.js';
    import * as Radix from '@radix-ui/themes';

    Chart.register(...registerables);

    const parsedData = parseData(rawData);

    createPaymentsByManagerChart(parsedData, 'paymentsByManager');
    createPaymentsOverTimeChart(parsedData, 'paymentsOverTime');
    createPaymentsByServiceTypeChart(parsedData, 'paymentsByServiceType');

    const metrics = calculateMetrics(parsedData);
    displayMetrics(metrics, 'metrics');
