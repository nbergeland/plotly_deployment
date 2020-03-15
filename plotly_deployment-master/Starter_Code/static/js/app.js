function buildchart(sample){

d3.json("samples.json").then((data) => {
    var samples = data.samples
    var samplearray = samples.filter(sampleobject=>sampleobject.id==sample)
    var result = samplearray[0]
    var sample_values = result.sample_values
    var otu_ids = result.otu_ids
    var otu_labels = result.otu_labels

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`)
    //  Create the Traces
    var trace1 = {
      x: sample_values.slice(0, 10),
      y: yticks,
      type: "bar",
      name: "Belly Button Biodiversity",
      orientation: 'h'
    };
  
    // Create the data array for the plot
    var data = [trace1];
  
    // Define the plot layout
    var layout = {
      title: "Belly Button Biodiversity",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };
  
    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", data, layout);
    var trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      };
      
      var data = [trace2];
      
      var layout = {
        title: 'Marker Size',
        showlegend: false,
      };
      
      Plotly.newPlot('bubble', data, layout);
  });
};

function init(){
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then((data) => {
    var names = data.names
    names.forEach(element => {
        dropdown.append("option").text(element).property("value",element)
    });
    var firstSample = names[0];
    buildchart(firstSample);

    });
};
function optionChanged(newSample) {
    buildchart(newSample);
    
  };
  init();