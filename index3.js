function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}

let scores = [
    { name: 'Sung', score: 65 },
    { name: 'Sung2', score: 79 },
    { name: 'Sung3', score: 88 },
    { name: 'Sung4', score: 98 },
    { name: 'Sung5', score: 100 }
]



var margin = { top: 20, right: 20, bottom: 60, left: 30 };
var width = 425 - margin.left - margin.right;
var height = 625 - margin.top - margin.bottom;


let svg = d3.select('.chart')
    .append('svg')
    .attr('width', 425)
    .attr('height', 625)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

//getting y Axis
let extent = d3.extent(scores, d => {
    return d.score
})
var yScale = d3.scaleLinear()
    .domain(extent)
    .range([height, 0]);
var yAxis = d3.axisLeft(yScale);
svg.call(yAxis)

//getting x Axis
var xScale = d3.scaleBand()
    .padding(0.2)
    .domain(scores.map(val => val.score))
    .range([0, width]);
var xAxis = d3.axisBottom(xScale);

svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('transform', 'rotate(-45)')

svg.selectAll('rect')
    .data(scores)
    .enter()
    .append('rect')
    .attr('x', d => {
        return xScale(d.score)
    })
    .attr('y', d => {
        return yScale(d.score)
    })
    .attr('width', d => xScale.bandwidth())
    .attr('height', d => height - yScale(d.score))