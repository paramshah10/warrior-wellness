// Colors
var colors = {
    gray: {
        100: "#f6f9fc",
        200: "#e9ecef",
        300: "#dee2e6",
        400: "#ced4da",
        500: "#adb5bd",
        600: "#8898aa",
        700: "#525f7f",
        800: "#32325d",
        900: "#212529"
    },
    theme: {
        default: "#172b4d",
        primary: "#5e72e4",
        secondary: "#f4f5f7",
        info: "#11cdef",
        success: "#2dce89",
        danger: "#f5365c",
        warning: "#fb6340"
    },
    black: "#12263F",
    white: "#FFFFFF",
    transparent: "transparent"
};

// Example 1 of Chart inside src/views/Index.js (Sales value - Card)
let chartExample1 = {
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              color: colors.gray[900],
              zeroLineColor: colors.gray[900]
            },
            ticks: {
              callback: function(value) {
                return value;
              }
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function(item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
  
            if (data.datasets.length > 1) {
              content += label;
            }
  
            // content += '$' + yLabel + 'k';
            content += yLabel;
            return content;
          }
        }
      }
    },
    data1: canvas => {//sleep score by week
      return {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: "Stress Score by Week",
            data: [6.6, 6.7, 7.5, 7.2, 7.9, 6.8, 6.9]
          }
        ]
      };
    },
    data2: canvas => {//sleep score by month
      return {
        labels: ["1st", "2nd", "4th", "6th", "8th", "10th", "12th", "14th", "16th", "18th", "20th", "22nd", "24th", "26th", "28th", "30th"],
        datasets: [
          {
            label: "Stress Score by Month",
            data: [7.5, 6.9, 7.2, 8, 8.1, 6.1, 6.4, 6.9, 7, 8, 7.6, 7.7, 8.1, 6.9, 7.3, 7.5]
          }
        ]
      };
    }
};
  
  // Example 2 of Chart inside src/views/Index.js (Total orders - Card)
let chartExample2 = {
options: {
    scales: {
    yAxes: [
        {
        ticks: {
            callback: function(value) {
            if (!(value % 5)) {
                //return '$' + value + 'k'
                return value;
            }
            }
        },
        stacked: true,
        }
    ],
    xAxes: [{
      stacked: true,
    }]
    },
    tooltips: {
        callbacks: {
            label: function(item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
                content += label;
            }
            content += " " + yLabel;
            return content;
            }
    }
    }
},
data1: canvas => {//Sleep by week
    return {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "Stress Management Activites Minutes",
            data: [13, 25, 41, 15, 35, 21, 28],
        }
    ]
    };
},
data2: canvas => { //sleep by month
    return {  
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
        {
            label: "Stress Management Activites Minutes",
            data: [13, 25, 21, 28],
        }
    ]
    };
}
};

let chartExample3 = {
    options: {
        scales: {
            yAxes: [
                {
                ticks: {
                    callback: function(value) {
                        return value;
                    }
                },
                stacked: true,
                }
            ],
            xAxes: [{
              stacked: true,
            }]
        },
        tooltips: {
            callbacks: {
                label: function(item, data) {
                    return data.datasets[item.datasetIndex].data[item.index];
                }
            }
        },
      responsive: true,
      maintainAspectRatio: false,
    },

    data1: canvas => {
        return {
        labels: ["Very High (20-25)", "High (15-20)", "Moderate (10-15)", "Low (0-10)"],
        datasets: [
            {
            label: "Stress count by score in the past month",
            data: [1, 5, 4, 7],
            backgroundColor: [
                "#b50000",
                '#ff4242',
                '#36A2EB',
                '#DCDCDC'
                ],
            }
        ],
        }
    },

    data2: canvas => {
        return {
        labels: ["Very High", "High", "Moderate", "Low"],
        datasets: [
            {
            label: "Stress count by score in the past month",
            data: [3, 25, 61, 15],
            backgroundColor: [
                "#b50000",
                '#ff4242',
                '#36A2ED',
                '#DCDCDC'
                ],
            }
        ],
        innerWidth: 100,
        }
    }
}

let chartExample4 = {
  options: {
    scales: {
        yAxes: [
            {
            ticks: {
                callback: function(value) {
                if (!(value % 1)) {
                    return value;
                }
                }
            },
            stacked: true,
            }
        ],
        xAxes: [{
          stacked: true,
        }]
        },
    tooltips: {
        callbacks: {
            label: function(item, data) {
                return data.datasets[item.datasetIndex].data[item.index];
            }
    }
    },
    responsive: true,
    maintainAspectRatio: false,
  },

  data1: canvas => {
      return {
      labels: ["Work (Admin)", "Work (Field)" , "Social", "Family", "Financial"],
      datasets: [
          {
          label: "Stress count by category in the past month",
          data: [2, 4, 1, 2, 3],
          backgroundColor: [
              "#0dd406",
              '#ff4242',
              '#36A2ED',
              '#DCDCDC',
              "#f79216",
              ],
          }
      ]
      }
  },

  data2: canvas => {
      return {
      labels: ["Work (Admin)", "Work (Field)" , "Social", "Family", "Financial"],
      datasets: [
          {
          label: "Stress count by category in the past month",
          data: [7, 13, 10, 5, 15],
          backgroundColor: [
              "#0dd406",
              '#ff4242',
              '#36A2ED',
              '#DCDCDC',
              "#f79216",
              ],
          }
      ]
      }
    }
  }

module.exports = {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4,
};