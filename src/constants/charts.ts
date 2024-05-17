export const defaultOptions = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const defaultBarChartOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Bar Chart',
    },
  },
  ...defaultOptions,
};

export const defaultLineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export const defaultScatterChartOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Scatter Chart',
    },
  },
  ...defaultOptions,
};

export const defaultBubbleChartOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Bubble Chart',
    },
  },
  ...defaultOptions,
};

export const defaultPieChartOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Pie Chart',
    },
  },
  ...defaultOptions,
};

export const defaultDoughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Doughnut Chart',
    },
  },
};

export const defaultPolarAreaOption = {
  title: {
    display: false,
    text: 'Chart Title',
  },

  legend: {
    display: true,
    position: 'bottom',
  },
  tooltips: {
    enabled: true,
  },
  scale: {
    display: true,
    ticks: {
      beginAtZero: true,
    },
  },
  layout: {
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
  },
};

export const defaultRadarOption = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Radar Area Chart',
    },
  },
};

export const defaultBarChartHeightWidth = {
  h: 10,
  w: 12,
};

export const defaultLineChartHeightWidth = {
  h: 10,
  w: 12,
};

export const defaultScatterChartHeightWidth = {
  h: 10,
  w: 12,
};

export const defaultBubbleChartHeightWidth = {
  h: 7,
  w: 12,
};

export const defaultPieChartHeightWidth = {
  h: 10,
  w: 12,
};

export const defaultDoughnutChartHeightWidth = {
  h: 10,
  w: 12,
};

export const defaultPolarAreaChartHeightWidth = {
  h: 10,
  w: 12,
};

export const defaultRadarHeightWidth = {
  h: 10,
  w: 12,
};
