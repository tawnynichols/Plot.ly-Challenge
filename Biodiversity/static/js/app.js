// Fetch the JSON data and console log it
d3.json("samples.json").then(function(importedData) {
    // console.log(importedData.names);
    console.log(importedData)
        // console.log(importedData.samples.otu_ids)
        // console.log(importedData.samples[0].sample_values)

    // Use the map method with the arrow function to return all the filtered movie titles.
    var ids = importedData.samples.map(d => d.otu_ids);
    console.log(ids)

    // Get top 10 ids
    var top10_ids = ids.slice(0, 10)

    // add text to lable for plot
    var get_ids = top10_ids.map(d => "OUT " + d)
    console.log(top10_ids)


    // Use the map method with the arrow function to return all the filtered movie metascores.
    var values = importedData.samples.map(d => d.sample_values);

    // Get to 10 values
    var top10_values = values.slice(0, 10)
    console.log(top10_values)


    // create labels
    var labels = importedData.samples.map(d => d.otu_labels)

    // Create title
    var id_title = importedData.names[0]

    function init() {

        // Create your trace.
        var trace = {
            x: top10_values[0],
            y: get_ids[0],
            type: "bar"
        };

        // Create the data array for our plot
        var data = [trace];

        // Define the plot layout
        var layout = {
            title: "Top 10 OUT",
            xaxis: { title: "otu_ids" },
            yaxis: { title: "Sample Values" }
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data, layout);

    }

    // On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("change", getData);

    // Function called by DOM changes
    function getData(id) {
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        // Initialize an empty array for the country's data
        var data = [];

        if (dataset == '940') {
            importedData = 940;
        } else if (dataset == 'uk') {
            data = uk;
        } else if (dataset == 'canada') {
            data = canada;
        }
        // Call function to update the chart
        updatePlotly(data);
    }

    // Update the restyled plot's values
    function updatePlotly(newdata) {
        Plotly.restyle("bar", "values", [newdata]);
    }

    init();

});