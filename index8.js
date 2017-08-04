var svg = d3.select('#usMap')
    .append('svg')
    .attr('width', 800)
    .attr('height', 800)
    .call(responsivefy)
    .append('g')

d3.json('https://raw.githubusercontent.com/deldersveld/topojson/master/countries/china/china-provinces.json', data => {

    var china = topojson.feature(data, data.objects.CHN_adm1).features
    console.log(china)
    var group = svg
        .selectAll('g')
        .data(china)
        .enter()
        .append('g')

    var projection = d3.geoMercator()
        .translate([-700, 700])
        .scale(600)
    var path = d3.geoPath()
        .projection(projection)

    var areas = group
        .append('path')
        .attr('class', d => {
            return `item${d.properties.ID_1}`
        })
        .attr('d', path)
        .attr('fill', 'steelblue');


    var text = svg.selectAll('.place-label')
        .data(china)
        .enter()
        .append('text')
        .attr('class', 'place-label')
        .attr('transform', d => {
            let cord = path.centroid(d)

            return `translate(${cord})`
        })
        .attr('dy', '0.35em')
        .text(d => {
            return d.properties.NAME_1
        })
        .attr('dx', '2px')
        .classed('city', true)



    svg.selectAll(".place-label")
        .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
        .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });

    const colorAPI = async() => {
        let response = await fetch('https://raw.githubusercontent.com/bahamas10/css-color-names/master/css-color-names.json');
        return await response.json();
    }

    //randomize color
    colorAPI()
        .then(data => {
            let values = Object.values(data)
            return values;
        })
        .then(color => {
            for (let i = 1; i < 32; i++) {
                var ranColor = Math.floor(Math.random() * color.length + 1);
                document.querySelector(`.item${i}`).style.fill = color[ranColor];
            }
        })

})