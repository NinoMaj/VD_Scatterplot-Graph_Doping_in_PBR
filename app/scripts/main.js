let request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json', true); // The last argument specifies whether you want your request to run asynchronously or not.
request.send();
request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
        let response = JSON.parse(request.responseText);
        console.log('resonse:', response);
        let data = response;
        console.log('data:', data);
        let fastestTime = data[0].Seconds;
        console.log('fastestTime:', fastestTime);

        // function addFlag(country) {
        //     switch (country):
        //         case 1:
        //     }

        // Set the dimensions of the canvas / graph
        let margin = { top: 30, right: 20, bottom: 40, left: 40 },
            width = 820 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        function drawGraph() {
            // Parse the date / time
            let parseDate = d3.timeParse('%d-%b-%y');
            let formatTime = d3.timeFormat("%S s");

            // Set the ranges
            let x = d3.scaleLinear().range([0, width]);
            let y = d3.scaleLinear().range([height, 0]);

            // Define the axes
            let xAxis = d3.axisBottom(x).ticks(10);
            let yAxis = d3.axisLeft(y).ticks(6);

            // Define the div for the tooltip
            let div = d3.select('body').append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0);

            // Adds the svg canvas
            let svg = d3.select('.chart')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')');

            // Scale the range of the data
            x.domain([0, d3.max(data, function (d) { return d.Seconds - fastestTime; })]);
            y.domain([0, d3.max(data, function (d) { return d.Place; })]);

            var defs = svg.append('svg:defs');

            function putFlag(Nationality) {
                let country = "";
                switch (Nationality) {
                    case "ITA":
                        country = "it"
                        break;
                    case "USA":
                        country = "us"
                        break;
                    case "GER":
                        country = "de"
                        break;
                    case "ESP":
                        country = "es"
                        break;
                    case "SUI":
                        country = "ch"
                        break;
                    case "DEN":
                        country = "dk"
                        break;
                    case "FRA":
                        country = "fr"
                        break;
                    case "POR":
                        country = "pt"
                        break;
                    case "COL":
                        country = "co"
                        break;
                    case "UKR":
                        country = "ua"
                        break;
                    case "RUS":
                        country = "ru"
                        break;
                    default:
                        country = "hr";
                }
                defs.append("svg:pattern")
                    .attr("id", country)
                    .attr("width", 20)
                    .attr("height", 20)
                    .attr("patternUnits", "objectBoundingBox")
                    .append("svg:image")
                    .attr("xlink:href", `../images/png/${country}.png`)
                    .attr("width", 20)
                    .attr("height", 20)
                    .attr("x", 0)
                    .attr("y", -4);
                return `url(#${country})`;
            }

            function strokeColor(doping) {
                if (doping === "") {
                    return "#33ff33";
                } else {
                    return "black";
                }
            }
            // Add the scatterplot
            svg.selectAll('dot')
                .data(data)
                .enter().append('rect')
                .attr('height', 13)
                .attr('width', 20)
                .style("fill", function (d) { return putFlag(d.Nationality) })
                .style("stroke-width", "2")
                .style("stroke", function (d) { return strokeColor(d.Doping) })
                .attr('x', function (d) { return x(d.Seconds - fastestTime); })
                .attr('y', function (d) { return y(d.Place) - 2; })
                .on('mouseover', function (d) {
                    div.transition()
                        .duration(200)
                        .style('opacity', .9);
                    div.html(
                        `<b>Name: </b>  ${d.Name}</br>
                        <b>Nationality: </b> ${d.Nationality}</br>
                        <b>Place: </b> ${d.Place}</br>
                        <b>Time: </b> ${d.Time}</br>
                        <b>Year: </b> ${d.Year}</br>
                        ${d.Doping}`
                    )
                        .style('left', (d3.event.pageX - 150) + 'px')
                        .style('top', (d3.event.pageY - 150) + 'px');
                })
                .on('mouseout', function (d) {
                    div.transition()
                        .duration(500)
                        .style('opacity', 0);
                });
            // Add the X Axis
            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);

            // Add the Y Axis
            svg.append('g')
                .attr('class', 'y axis')
                .call(yAxis);

            // adding names to axes
            svg.append("text")
                .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
                .attr("transform", "translate(" + (-margin.left / 2 - 10) + "," + (30) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
                .text("Ranking");

            svg.append("text")
                .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
                .attr("transform", "translate(" + (width - 50) + "," + (height + (margin.left / 2 + 10)) + ")")
                .text("Seconds behind best time ever");

            svg.append("rect")
                .attr('height', 13)
                .attr('width', 20)
                .style("fill", "none")
                .style("stroke-width", "2")
                .style("stroke", "#33ff33")
                .attr("transform", "translate(" + (width - 160) + "," + (height - 52) + ")")

            svg.append("text")
                .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
                .attr("transform", "translate(" + (width - 60) + "," + (height - 40) + ")")
                .attr("font-weight", "bold")
                .text("No doping alligations");

            svg.append("rect")
                .attr('height', 13)
                .attr('width', 20)
                .style("fill", "none")
                .style("stroke-width", "2")
                .style("stroke", "black")
                .attr("transform", "translate(" + (width - 160) + "," + (height - 32) + ")")

            svg.append("text")
                .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
                .attr("transform", "translate(" + (width - 70) + "," + (height - 20) + ")")
                .attr("font-weight", "bold")
                .text("Doping alligations");
        }
        function show() {
            console.log("button show pressed");
            drawGraph();
            document.querySelector('#source').style.visibility = "visible";
            document.querySelector('.btn-show').style.display = "none";
        }
        document.querySelector('.btn-show').addEventListener('click', show);
    }
}


