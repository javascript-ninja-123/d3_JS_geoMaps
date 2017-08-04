var width = 960,
    height = 600;

var svg = d3.select('#usMap')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .call(responsivefy)
    .append('g');

var svg = d3.select("svg");

var path = d3.geoPath();

d3.json("https://unpkg.com/us-atlas@1/us/10m.json", function(error, us) {
    if (error) throw error;

    svg.append("path")
        .classed('us-counties', true)
        .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); })));

    svg.append("path")
        .attr("stroke-width", 0.5)
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

    svg.append("path")
        .attr("d", path(topojson.feature(us, us.objects.nation)));
});