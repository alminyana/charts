var width = 600,
    height =300;

// var dataset = [
//   { apples: 5, oranges: 10, grapes: 22 },
//   { apples: 4, oranges: 12, grapes: 28 },
//   { apples: 2, oranges: 19, grapes: 32 },
//   { apples: 7, oranges: 23, grapes: 35 },
//   { apples: 23, oranges: 17, grapes: 43 }
// ];

var dataset = [
  [
    { x: 0, y: 5 },
    { x: 1, y: 4 },
    { x: 2, y: 2 },
    { x: 3, y: 7 },
    { x: 4, y: 23 }
  ],
  [
    { x: 0, y: 10 },
    { x: 1, y: 12 },
    { x: 2, y: 19 },
    { x: 3, y: 23 },
    { x: 4, y: 17 }
  ],
  [
    { x: 0, y: 22 },
    { x: 1, y: 28 },
    { x: 2, y: 32 },
    { x: 3, y: 35 },
    { x: 4, y: 43 }
  ]
];

//
console.log(dataset[0].length)
var stack = d3.layout.stack();
    stack(dataset);

var xScale = d3.scale.ordinal()
                  .domain([0, d3.range(stack(dataset).length)])
                  .range([0, width]);

var yScale = d3.scale.ordinal()
                .domain([0, d3.max(dataset)])
                .range([0, height]);

var chart = d3.select('#stackchart')
              .append('svg')
              .attr('width', width)
              .attr('height', height);

var rects = chart.selectAll('rect')
              .data(dataset)
              .enter()
              .append("rect")
              .attr("x", function(d, i) {
              return xScale(i);
              })
              .attr("y", function(d) {
              return yScale(d.y0);
              })
              .attr("height", function(d) {
              return yScale(d.y);
              })
              .attr("width", function(d,i){
                return xScale(i);
              });
