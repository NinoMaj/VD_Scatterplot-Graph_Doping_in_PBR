
// Chart 2
var data = [4, 8, 15, 16, 23, 42];

var x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

d3.select(".chart-2")
    .selectAll("div")
    .data(data)
    .enter().append("div")
    .style("width", function (d) { return x(d) + "px"; })
    .text(function (d) { return d; });


// 4
var data = [4, 8, 15, 16, 23, 42];

var width = 420,
    barHeight = 20;

var x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, width]);

var chart = d3.select(".chart-4")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function (d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function (d) { return d; });


// 5
var width = 420,
    barHeight = 20;

var x = d3.scaleLinear()
    .range([0, width]);

var chart = d3.select(".chart-5")
    .attr("width", width);

d3.tsv("data.tsv", type, function (error, data) {
    x.domain([0, d3.max(data, function (d) { return d.value; })]);

    chart.attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", function (d) { return x(d.value); })
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function (d) { return x(d.value) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function (d) { return d.value; });
});

function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}

// 6
// var svg = d3.select(".chart-6"),
//     margin = { top: 20, right: 20, bottom: 30, left: 40 },
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom;

// var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
//     y = d3.scaleLinear().rangeRound([height, 0]);

// var g = svg.append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.tsv("data2.tsv", function (d) {
//     d.frequency = +d.frequency;
//     return d;
// }, function (error, data) {
//     if (error) throw error;

//     x.domain(data.map(function (d) { return d.letter; }));
//     y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

//     g.append("g")
//         .attr("class", "axis axis--x")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));

//     g.append("g")
//         .attr("class", "axis axis--y")
//         .call(d3.axisLeft(y).ticks(10, "%"))
//         .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", "0.71em")
//         .attr("text-anchor", "end")
//         .text("Frequency");

//     g.selectAll(".bar")
//         .data(data)
//         .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function (d) { return x(d.letter); })
//         .attr("y", function (d) { return y(d.frequency); })
//         .attr("width", x.bandwidth())
//         .attr("height", function (d) { return height - y(d.frequency); });
// });

// 7
// var request = new XMLHttpRequest();
// request.open('GET', "//ipinfo.io/json", true); // The last argument specifies whether you want your request to run asynchronously or not.
// request.send();
// request.addEventListener("readystatechange", processRequest, false); // readystatechange event that is fired by our XMLHttpRequest object whenever your request hits an important milestone on its epic journey
// function processRequest(e) {
//   if (request.readyState == 4 && request.status == 200) {
//     var response = JSON.parse(request.responseText);
//     console.log(response);
//   }
// }

// var request = new XMLHttpRequest();
// request.open('GET', "//ipinfo.io/json", true); // The last argument specifies whether you want your request to run asynchronously or not.
// request.send();
// request.onreadystatechange = processRequest;
// function processRequest(e) {
//   if (request.readyState == 4 && request.status == 200) {
//     var response = JSON.parse(request.responseText);
//     console.log(response);
//   }
// }

// var request = new XMLHttpRequest();
// request.open('GET', "//ipinfo.io/json", true); // The last argument specifies whether you want your request to run asynchronously or not.
// request.send();
// request.onreadystatechange = e => {
//   if (request.readyState == 4 && request.status == 200) {
//     var response = JSON.parse(request.responseText);
//     console.log(response);
//   }
// }

// var svg = d3.select(".chart-7"),
//     margin = {top: 20, right: 20, bottom: 30, left: 50},
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom,
//     g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var parseTime = d3.timeParse("%d-%b-%y");

// var x = d3.scaleTime()
//     .rangeRound([0, width]);

// var y = d3.scaleLinear()
//     .rangeRound([height, 0]);

// var line = d3.line()
//     .x(function(d) { return x(d.date); })
//     .y(function(d) { return y(d.close); });

// d3.tsv("data3.tsv", function(d) {
//   d.date = parseTime(d.date);
//   d.close = +d.close;
//   return d;
// }, function(error, data) {
//   if (error) throw error;

//   x.domain(d3.extent(data, function(d) { return d.date; }));
//   y.domain(d3.extent(data, function(d) { return d.close; }));

//   g.append("g")
//       .attr("class", "axis axis--x")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));

//   g.append("g")
//       .attr("class", "axis axis--y")
//       .call(d3.axisLeft(y))
//     .append("text")
//       .attr("fill", "#000")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", "0.71em")
//       .style("text-anchor", "end")
//       .text("GDP, US ($)");

//   g.append("path")
//       .datum(data)
//       .attr("class", "line")
//       .attr("d", line);
// });

// 8

var request = new XMLHttpRequest();
request.open('GET', "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", true); // The last argument specifies whether you want your request to run asynchronously or not.
request.send();
request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
        var response = JSON.parse(request.responseText);
        console.log(response.data);
        var data7 = response.data;
        var data7F = [];
        for (let i = 0; i < data7.length; ++i) {
            data7F[i] = {};
            data7F[i].date = data7[i][0];
            data7F[i].close = +data7[i][1];
        }
        // Set the dimensions of the canvas / graph
        var margin = { top: 30, right: 20, bottom: 30, left: 50 },
            width = 600 - margin.left - margin.right,
            height = 330 - margin.top - margin.bottom;

        const FCC = document.querySelector(".enlarge");
        FCC.addEventListener("click", enlarge);
        function enlarge() {
            let maxWidth = 730;
            let maxWidthPx = "";
            document.querySelector(".enlarge").style.visibility = "hidden";
            var id = setInterval(frame, 25);
            function frame() {
                if (maxWidth == 1080) {
                    clearInterval(id);
                    width = 850;
                    FCC.removeEventListener('click', enlarge);
                    document.querySelector(".containerAfterFCC").style.maxWidth = "730px";
                    let chart8 = document.querySelector(".chart-8").innerHTML = "";
                    drawGraph();
                } else {
                    maxWidth += 10;
                    maxWidthPx = maxWidth + "px";
                    document.querySelector(".FCC").style.maxWidth = maxWidthPx;
                }
            }
        }
        function drawGraph() {
            // Parse the date / time
            var parseDate = d3.timeParse("%d-%b-%y");
            var formatTime = d3.timeFormat("%b-%y");

            // Set the ranges
            var x = d3.scaleTime().range([0, width]);
            var y = d3.scaleLinear().range([height, 0]);

            // Define the axes
            var xAxis = d3.axisBottom(x).ticks(7).tickFormat(d3.timeFormat("%Y"));
            var yAxis = d3.axisLeft(y).ticks(6);

            // Define the line
            var valueline = d3.line()
                .x(function (d) { return x(d.date); })
                .y(function (d) { return y(d.close); });

            // Define the div for the tooltip
            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // Adds the svg canvas
            var svg8 = d3.select(".chart-8")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

            // Get the data
            data7F.forEach(function (d) {
                // d.date = parseDate(d.date);
                d.date = new Date(d.date);
                d.close = d.close;
            });

            // Scale the range of the data
            x.domain(d3.extent(data7F, function (d) { return d.date; }));
            y.domain([0, d3.max(data7F, function (d) { return d.close; })]);

            // Add the valueline path.
            svg8.append("path")
                .attr("class", "line")
                .attr("d", valueline(data7F));

            // Add the scatterplot
            svg8.selectAll("dot")
                .data(data7F)
                .enter().append("circle")
                .attr("r", 4)
                .style("fill", "steelblue")
                .attr("cx", function (d) { return x(d.date); })
                .attr("cy", function (d) { return y(d.close); })
                .on("mouseover", function (d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html("<b>" + formatTime(d.date) + "</b>" + ":<br/>" + d3.format("($,.2f")(d.close))
                        .style("left", (d3.event.pageX - 34) + "px")
                        .style("top", (d3.event.pageY - 42) + "px");
                })
                .on("mouseout", function (d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
            // Add the X Axis
            svg8.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the Y Axis
            svg8.append("g")
                .attr("class", "y axis")
                .call(yAxis);
        }
        drawGraph();

    }
}


