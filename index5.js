// metrics
let margin = { top: 10, left: 10, right: 10, bottom: 10 }
let width = 500 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;


//data 
var data = [10, 20, 30, 40, 50, 60, 70];

//Xaxis

let Xscale = d3.scaleLinear()
    .domain([10, 70])
    .range([0, width]);

let xAxis = d3.axisBottom(Xscale)

let canvas = d3.select('body')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);


let bars = canvas.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', d => {
        return Xscale(d)
    })
    .attr('height', 50)
    .attr('y', (d, i) => {
        return i * 60
    })


canvas.append('g')
    .attr('tranform', `translate(0, ${height})`)
    .call(xAxis)