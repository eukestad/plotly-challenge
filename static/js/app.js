// bring in data
const incomingData = bbData;

// set data subsets
var samples = incomingData.samples;

var names = incomingData.names;

var demos = incomingData.metadata;


// set variables for elements
var demoPanel = d3.select("#sample-metadata");

var idDropdown = d3.select('#selDataset');

var idNumber = idDropdown.property("value");

// populate drop down
names.forEach((item) => {
    idDropdown.append("option").text(item).property("value", item);
  });

// filter functions
function filterSamples (idNumber) {
    return samples.filter(sample => sample.id === idNumber);
};

function filterDemos (idNumber) {
    return demos.filter(demo => demo.id === +idNumber);
};

//handle events
function optionChanged(idNumber) {
    
    idFilter = idNumber;
    console.log(idFilter);

    demoData = filterDemos(idFilter);
    bellyData = filterSamples(idNumber);

    fillDemos(demoData);

    plotBar(bellyData);
   
    plotBubble(bellyData); 

    plotGauge(demoData);   

};

function clearDemos() {
    demoPars = d3.selectAll('#demo-line');
    demoPars.remove();
}

// populate demographics
function fillDemos(dataSet) {
    clearDemos();

    var demoList = [];

    Object.entries(dataSet[0]).forEach(([key,value]) => {
        demoList.push(`${key}: ${value}`);
    });
    console.log(demoList)

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

    //@TODO Layout
    
    var barData = [traceHBar]
    console.log(barData);
    
    Plotly.newPlot('bar', barData);
};

// plot bubble chart
function plotBubble(dataSet) {

    var xValues = dataSet.map(l => l.otu_ids)[0];
    var yValues = dataSet.map(v => v.sample_values)[0];
    var markerSize = yValues;
    var markerColor = xValues;
    var textValues = dataSet.map(t => t.otu_labels)[0];

    var traceBubble = {
        x: xValues,
        y: yValues,
        marker: {
            color: markerColor,
            size: markerSize
        },
        mode:'markers'
        
    };

    bubbleData = [traceBubble]

    Plotly.newPlot('bubble', bubbleData);
};




