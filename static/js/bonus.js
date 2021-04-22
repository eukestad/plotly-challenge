// plot gauge chart
function plotGauge(dataSet) {
    washFreq = dataSet[0].wfreq
    console.log(washFreq)

    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: washFreq,
          title: { text: "Scrubs per Week" },
          type: "indicator",
          mode: "gauge",
          gauge: {
            bgcolor: "",
            bordercolor: "",
            axis: { range: [0, 9],
                ticks: "inside",
                nticks: 9,
                tickvals: [1,2,3,4,5,6,7,8,9]                
                // ticktext: []
            },
            steps: [
              { range: [0, 1], color: "linen", name: '0-1'},
              { range: [1, 2], color: "beige", name: '1-2' },
              { range: [2, 3], color: "gainsboro", name: '2-3' },
              { range: [3, 4], color: "darkkhaki", name: '3-4' },
              { range: [4, 5], color: "yellowgreen", name: '4-5' },
              { range: [5, 6], color: "olive", name: '5-6' },
              { range: [6, 7], color: "forestgreen", name: '6-7' },
              { range: [7, 8], color: "green", name: '7-8' },
              { range: [8, 9], color: "darkgreen", name: '8-9' }
            ],
          }
        }
      ];
      
      var layout = {width: 600, height: 450, margin: { t: 0, b: 0 }};
      Plotly.newPlot('gauge', data, layout);
};
