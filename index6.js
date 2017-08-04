let margin = { top: 50, left: 50, right: 50, bottom: 50 };
let height = 400 - margin.left - margin.right;
let width = 800 - margin.top - margin.bottom;

let svg = d3.select('#map')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(0,${margin.top})`);


d3.queue()
    .defer(d3.json, 'https://unpkg.com/world-atlas@1/world/110m.json')
    .defer(d3.csv, 'https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json')
    .await(ready)


var projection = d3.geoMercator()
    .translate([width / 2, height / 2])
    .scale(100)

var path = d3.geoPath()
    .projection(projection)


function ready(err, data, capitals) {
    var countries = topojson.feature(data, data.objects.countries).features
    svg.selectAll('.country')
        .data(countries)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', path)
        .classed('selected', true)

    console.log(capitals)

    svg.selectAll('.city-circle')
        .data(capitals)
        .enter()
        .append('circle')
        .attr('r', 2)
        .attr('cx', d => {
            return 10
        })
        .attr('cy', d => {
            return 10
        })
}