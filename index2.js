//data
const gettingAPI = async() => {
        let response = await fetch('https://jsonplaceholder.typicode.com/comments')
        let json = await response.json();
        return json.map(value => {
            let id = value.id;
            let email = value.email;
            return {
                id,
                email
            }
        })
    }
    // gettingAPI().then(data => {
    //     let updates = d3.select('.chart')
    //         .selectAll('div')
    //         .data(data, d => {
    //             return d ? d.email : this.innerText;
    //         })
    //         .style('color', 'blue');

//     let enter = updates.enter()
//         .append('div')
//         .text(d => {
//             return d.email;
//         })

//     updates.exit()
//         .remove();

//     updates.merge(enter)
//         .style('background', 'lightgreen')
//         .style('border', '1px solid black')
//         .style('height', '50px')
//         .style('width', d => {
//             return `${d.id}px`
//         })
// });



// gettingAPI()
//     .then(data => {
//         let bar = d3.select('.chart')
//             .append('svg')
//             .attr('width', 255)
//             .attr('height', 300)
//             .selectAll('g')
//             .data(data)
//             .enter()
//             .append('g')
//             .attr('transform', (d, i) => {
//                 return `translate(0,${i*33})`
//             });

//         bar.append('rect')
//             .style('width', d => {
//                 return `${d.id}px`
//             })
//             .text(d => {
//                 return d.email
//             })
//             .classed('individual', true)

//         bar.append('text')
//             .attr('y', 20)
//             .text(d => {
//                 return d.email
//             });

//     })


// let scores = [
//     { name: 'Sung', score: 65 },
//     { name: 'Sung2', score: 79 },
//     { name: 'Sung3', score: 88 },
//     { name: 'Sung4', score: 98 },
//     { name: 'Sung5', score: 99 }
// ]

// let bar = d3.select('.chart')
//     .append('svg')
//     .attr('width', 300)
//     .attr('height', 300)
//     .selectAll('g')
//     .data(scores)
//     .enter()
//     .append('g')
//     .attr('transform', (d, i) => {
//         return `translate(0,${i*33})`
//     });

// bar.append('rect')
//     .style('width', d => {
//         return `${d.score}px`
//     })
//     .classed('individual', true)
//     .on('mouseover', function(d, i, element) {
//         d3.select(this)
//             .call(scaleBar, 2)
//             .call(fill, 'orange')
//         d3.selectAll(element)
//             .filter(':not(:hover)')
//             .call(fade, 0.4)
//     })
//     .on('mouseout', function(d, i, element) {
//         d3.select(this)
//             .call(scaleBar, 1)
//             .call(fill, 'lightgreen')

//         d3.selectAll(element)
//             .call(fade, 1)
//     })

// bar.append('text')
//     .attr('y', 20)
//     .text(d => {
//         return d.name
//     })

// function scaleBar(selection, scale) {
//     selection.style('transform', `scaleX(${scale})`)
// }

// function fade(selection, opacity) {
//     selection.style('fill-opacity', opacity)
// }

// function fill(selection, color) {
//     selection.style('fill', color)
// }


var margin = { top: 10, right: 20, bottom: 20, left: 30 }
var width = 425 - margin.left - margin.right;
var height = 625 - margin.top - margin.bottom;

var fullWidth = 425;
var fullHeight = 625;

var svg = d3.select('.chart')
    .append('svg')
    .attr('width', 425)
    .attr('height', 625)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

svg.append('rect')
    .attr('x', width / 2)
    .attr('width', width / 2)
    .attr('height', height)
    .style('fill', 'lightblue')
    .style('stroke', 'green')

svg.append('rect')
    .attr('width', width / 2)
    .attr('height', height)
    .style('fill', 'lightblue')
    .style('stroke', 'green')

var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])

var xScale = d3.scaleTime()
    .domain([new Date(2017, 0, 1), new Date()])
    .range([0, width])

var yAxis = d3.axisLeft(yScale);
svg.call(yAxis)

var xAxis = d3.axisBottom(xScale).ticks(5).tickSize(10);
svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis)