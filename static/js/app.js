// bring in data
const incomingData = bbData;

// set data subsets
var samples = incomingData.samples;
var init_samples = incomingData.samples;

var demos = incomingData.metadata;
var init_demos = incomingData.metadata;

var names = incomingData.names;

// set variables for elements
var demoPanel = d3.select("#sample-metadata");

var idDropdown = d3.select('#selDataset');

var idNumber = idDropdown.property("value");

// populate drop down
names.forEach((item) => {
    idDropdown.append("option").text(item).property("value", item);
  });

// data functions
function filterSamples (idNumber) {
    return samples.filter(sample => sample.id === idNumber);
};

function filterDemos (idNumber) {
    return demos.filter(demo => demo.id === +idNumber);
};

function buildBellyPlots (bellyData) {

    plotBar(bellyData);
   
    plotBubble(bellyData); 
};

function buildDemoPlots (demoData) {

    fillDemos(demoData);

    plotGauge(demoData); 
};


//handle events
function optionChanged (idNumber) {
    idFilter = idNumber;
    console.log(idFilter);

    demoData = filterDemos(idFilter);
    bellyData = filterSamples(idNumber);

    buildDemoPlots(demoData);
    buildBellyPlots(bellyData);
};

function clearDemos() {
    demoPars = d3.selectAll('#demo-line');
    demoPars.remove();
};

// populate demographics
function fillDemos(dataSet) {
    clearDemos();

    var demoList = [];

    Object.entries(dataSet[0]).forEach(([key,value]) => {
        demoList.push(`${key}: ${value}`);
    });
    console.log(demoList);

    demoList.forEach((item) => {
        demoPanel.append("p").text(item).attr('id','demo-line');
      });
};

// plot bar chart
function plotBar(dataSet) {

    var values = dataSet.map(v => v.sample_values)[0].slice(0,10);
    var labels = dataSet.map(l => l.otu_ids)[0].slice(0,10).map(v => `OTU ${v}`);
    var hoverText = dataSet.map(t => t.otu_labels)[0].slice(0,10);

    var traceHBar = {
        x: values,
        y: labels,
        text: hoverText,
        type: "bar",
        orientation: 'h'
    };

    var layout = {title: {text: '<b>Top 10 OTUs</b>'}};
    
    var barData = [traceHBar];
    console.log(barData);
    
    Plotly.newPlot('bar', barData, layout);
};

// plot bubble chart
function plotBubble(dataSet) {
   
    var xValues = dataSet.map(l => l.otu_ids)[0];
    var yValues = dataSet.map(v => v.sample_values)[0];
    var textValues = dataSet.map(t => t.otu_labels)[0];
    
    var markerSize = yValues;
    var markerColor = xValues;
 
    var traceBubble = {
        x: xValues,
        y: yValues,
        text: textValues,
        marker: {
            color: markerColor,
            size: markerSize
        },
        mode:'markers'
        
    };

    var bubbleData = [traceBubble];

    var layout = {title: {text: '<b>All OTU Samples</b>'},
                    xaxis: {title: { text: 'OUT ID'}}};

    Plotly.newPlot('bubble', bubbleData, layout);
};

function plotGauge(dataSet) {
    washFreq = dataSet[0].wfreq
    console.log(washFreq)

    // get the needle level
    var level = parseFloat(washFreq) * 20;

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    console.log(radians, x, y)

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
    x: [0], y:[0],
        marker: {size: 12, color:'850000'},
        showlegend: false,
        name: 'scrubs',
        text: washFreq,
        hoverinfo: 'text+name'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6',
                '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition:'inside',	  
    marker: {colors:[
        'rgba(0, 100, 0, .5)',
        'rgba(14, 127, 0, .5)', 
        'rgba(110, 154, 22, .5)',
        'rgba(170, 202, 42, .5)', 
        'rgba(202, 209, 95, .5)',
        'rgba(210, 206, 145, .5)', 
        'rgba(232, 226, 202, .5)',
        'rgba(255, 255, 240, .5)',
        'rgba(255, 255, 245, .5)',
        'rgba(255, 255, 255, 0)', 
        ]},
    labels: ['8-9', '7-8', '6-7', '5-6',
    '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];

    var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
            color: '850000'
        }
        }],
    title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
    height: 500,
    width: 500,
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };
      Plotly.newPlot('gauge', data, layout);
};

// load initial charts
function init() {
    console.log(idNumber);

    init_bellyData = init_samples.filter(sample => sample.id === '940');
    init_demoData = init_demos.filter(demo => demo.id === +'940');

    buildDemoPlots(init_demoData);
    buildBellyPlots(init_bellyData);

};

init();

