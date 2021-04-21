// bring in data
const incomingData = bbData;

// set data subsets
var samples = incomingData.samples;

var names = incomingData.names;

var demos = incomingData.metadata;

// populate drop down
var idDropdown = d3.select('#selDataset');

var idNumber = idDropdown.property("value");

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


    // demoData = demos.filter(demo => demo.id === idNumber)
    console.log(demoData);

    fillDemos(demoData);

    plotBar(bellyData);
   

    

    

};

// populate demographics
function fillDemos(dataSet) {
    var demoPanel = d3.select("#sample-metadata");
    var demoList = [];

    Object.entries(dataSet[0]).forEach(([key,value]) => {
        demoList.push(`${key}: ${value}`);
    });
    console.log(demoList)


    demoList.forEach((item) => {
        demoPanel.append("p").text(item);
      });
};

// plot bar chart
function plotBar(dataSet) {

    var values = dataSet.map(v => v.sample_values)[0].slice(0,10);
    var labels = dataSet.map(l => l.otu_ids)[0].slice(0,10).map(v => `OTU ${v}`);
    var hoverText = dataSet.map(t => t.otu_labels)[0].slice(0,10);

    traceHBar = {
        x: values,
        y: labels,
        text: hoverText,
        type: "bar",
        orientation: 'h'
    };
    
    barData = [traceHBar]
    console.log(barData);
    
    Plotly.newPlot('bar', barData);
};




