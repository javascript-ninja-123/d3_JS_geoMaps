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

var dataArray = [20, 40, 50, 70];
let extent = d3.extent(dataArray)

var margin = { top: 20, right: 20, bottom: 80, left: 30 };
var width = 500 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var widthScale = d3.scaleLinear()
    .domain([0, 70])
    .range([0, width])
var xAxis = d3.axisBottom(widthScale);




var color = d3.scaleLinear()
    .domain([0, 70])
    .range(['red', 'blue'])


var canvas = d3.select('.chart')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

var bars = canvas.selectAll('rect')
    .data(dataArray)
    .enter()
    .append('rect')
    .attr('width', d => {
        return widthScale(d)
    })
    .attr('fill', d => {
        return color(d)
    })
    .attr('height', 50)
    .attr('y', (d, i) => {
        return i * 100;
    })

canvas
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)