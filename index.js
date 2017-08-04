const linearScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 600])
    .clamp(true);


console.log(linearScale(0))
console.log(linearScale(100))

const timeScale = d3.scaleTime()
    .domain([new Date(2017, 0, 1), new Date()])
    .range([0, 100])


console.log(timeScale(new Date(2017, 4, 15)))

console.log(timeScale.invert(50))




const quantizeScale = d3.scaleQuantize()
    .domain([0, 100])
    .range(['red', 'white', 'green'])

console.log(quantizeScale(22))
console.log(quantizeScale(52))
console.log(quantizeScale(82))
console.log(quantizeScale.invertExtent('white'))


const ordinalScale = d3.scaleOrdinal()
    .domain(['poor', 'good', 'great'])
    .range(['red', 'white', 'green'])



console.log(ordinalScale('good'))
console.log(ordinalScale('great'))


const gettingJSON = async() => {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return await response.json();
}

const gettingJSONHelper = async() => {
    return await gettingJSON()
        .then(data => {
            let extent = d3.extent(data, d => {
                return d.id
            })
            let ages = d3.set(data, d => {
                return d.id
            })
            return {
                extent,
                ages
            };
        })
}
gettingJSONHelper()
    .then(data => {
        let scaleExample = d3.scaleLinear()
            .domain(data.extent)
            .range([0, 600])

        console.log(scaleExample(24))
        console.log(data.ages.values())
    })


const div = d3.select('div')
console.log(div.nodes())

const divLinks = div.selectAll('a');
console.log(divLinks.nodes())

const secondLink = div.selectAll('a:nth-child(2)')
    .attr('href', 'http://google.com')
    .classed('red', true)
    .append('div')
    .html('Inventory <b>Sale</b>')
    .append('button')
    .text('buy')
console.log(secondLink.nodes())



d3.select('.action').remove();