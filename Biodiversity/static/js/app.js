function getValues(id) {

    // Fetch the JSON data and console log it
    d3.json("samples.json").then(importedData => {
        // console.log(importedData.names);
        //console.log(importedData)
        // console.log(importedData.samples.otu_ids)
        // console.log(importedData.samples[0].sample_values)

        // Use the map method with the arrow function to return all the filtered movie titles.
        var ids = importedData.samples[0].otu_ids;
        var sampleValues = importedData.samples[0].sample_values

        // Get top 10 ids
        var top10_ids = (importedData.samples[0].otu_ids.slice(0, 10)).reverse();

        // add text to lable for plot
        var get_ids = top10_ids.map(d => "OUT " + d)
            // console.log(get_ids)

        // Use the map method with the arrow function to return all the filtered movie metascores.
        var values = importedData.samples[0].sample_values.slice(0, 10).reverse();

        // create labels
        var labels = importedData.samples[0].otu_labels.slice(0, 10);
        // console.log(labels)

        // Create title
        var id_title = importedData.names[0]

        // Create your trace.
        var trace = {
            x: values,
            y: get_ids,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Create the data array for our plot
        var data = [trace];

        // Define the plot layout
        var layout = {
            title: "title",
            yaxis: {
                tickmode: "linear",
            }
        };

        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", data, layout);

        // Create data array for bubble chart
        var trace1 = {
            x: ids,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: ids
            },
            text: importedData.samples[0].otu_labels

        };

        var data1 = [trace1];
        //Creat layout of bubble chart
        var layout1 = {
            xaxis: { title: "OTU ID" },
            height: 800,
            width: 1200
        };

        //Plot bubble chart
        Plotly.newPlot("bubble", data1, layout1);

    })
}

// // On change to the DOM, call getData()
function getData(id) {
    d3.json("samples.json").then((data) => {
        var demoData = data.metadata;
        console.log(demoData)

        // define variable to filter data
        var info = demoData.filter(d => d.id.toString() === id)[0];

        // select demographic data
        var demoInfo = d3.select("#sample-metadata");

        //clear demographic info before update
        demoInfo.html("");

        // get demographic data for the id and append to panel
        Object.entries(info).forEach((key) => {
            demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1]);


        });

        //Create gauge chart
        // var data2 = [{
        //     type: "indicator",
        //     mode: "gauge+neddle",
        //     value: info.wfreq,
        //     title: { text: "Speed", font: { size: 24 } },
        //     //delta: { reference: 9, increasing: { color: "RebeccaPurple" } },
        //     gauge: {
        //         axis: { range: [null, 9], tickwidth: 1, tickcolor: "red" },
        //         // lables: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        //         bar: { color: "red" },
        //         textposition: "inside",
        //         //bgcolor: "white",
        //         //borderwidth: 2,
        //         //bordercolor: "gray",
        //         steps: [
        //                 { range: [0, 1], color: "#f1f1d2" },
        //                 { range: [1, 2], color: "#dae7bd" },
        //                 { range: [2, 3], color: "#c5dea8" },
        //                 { range: [3, 4], color: "#b2d494" },
        //                 { range: [4, 5], color: "#9fc97f" },
        //                 { range: [5, 6], color: "#8ebe6b" },
        //                 { range: [6, 7], color: "#7fb356" },
        //                 { range: [7, 8], color: "#73a842" },
        //                 { range: [8, 9], color: "#699c2b" }
        //             ]
        //             // ,
        //             // threshold: {
        //             //     line: { color: "red", width: 4 },
        //             //     thickness: 0.75,
        //             //     value: 490
        //             // }
        //     }
        // }];

        //Crete layout for gauge chart
        // var layout2 = {
        //     width: 500,
        //     height: 400,
        //     margin: { t: 25, r: 25, l: 25, b: 25 },
        //     paper_bgcolor: "lavender",
        //     font: { color: "darkblue", family: "Arial" }
        // };

        // Enter a speed between 0 and 180
        var level = info.wfreq * 20.5 //info.wfreq;

        // Trig to calc meter point
        var degrees = 180 - level,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
        var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        // Path: may have to change to create a better triangle
        var mainPath = path1,
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX, space, pathY, pathEnd);

        var data2 = [{
                type: 'scatter',
                x: [0],
                y: [0],
                marker: { size: 14, color: '850000' },
                showlegend: false,
                name: 'speed',
                text: level,
                hoverinfo: 'text+name'
            },
            {
                values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
                rotation: 90,
                text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
                textinfo: 'text',
                textposition: 'inside',
                marker: {
                    colors: ['#699c2b', '#73a842',
                        '#7fb356', '#8ebe6b', '#9fc97f', '#b2d494', '#c5dea8', '#dae7bd', '#f1f1d2',
                        'rgba(0, 0, 0, 0)'
                    ]
                },
                hoverinfo: 'label',
                hole: .5,
                type: 'pie',
                showlegend: false
            }
        ];

        var layout2 = {
            shapes: [{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
            }],
            title: "Belly Button Washing Frequency",
            subtitle: 'Plot Subtitle',
            height: 400,
            width: 400,
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1],
                titlefont: {
                    title: 'x Axis',
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            },
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            }
        };

        //Plot gauge chart
        Plotly.newPlot('gauge', data2, layout2);
    });

}

// create  function for change event
function optionChanged(id) {
    getValues(id);
    getData(id);
}


function init() {
    // Assign the value of the dropdown menu option to a variable
    var dropdownMenu = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data) => {
        console.log(data)

        //get ids for dropdow
        data.names.forEach(function(name) {
            dropdownMenu.append("option").text(name).property("value");
        })

        // call functions to display plot
        getValues(data.names[0]);
        getData(data.names[0]);

    })
}

init();