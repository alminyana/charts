var paleta = {
  "lightgray": "#819090",
  "gray": "#708284",
  "mediumgray": "#536870",
  "darkgray": "#475b62",

  "darkblue": "#0a2933",
  "derkerblue": "#042029",

  "paleryellow": "#fcf4dc",
  "paleyellow": "#eae3cb",
  "yellow": "#a57706",
  "orange": "#bd3613",
  "red": "#d11c24",
  "pink": "#c61c6f",
  "purple": "#595ab7",
  "blue": "#2176c7",
  "green": "#259286",
  "yellowgreen": "#738a05"
};


var w = 700,
    h = 400;
var circleWidth = 10;

var nodes = [
  { name: "Web", target: [0]},
  { name: "Javascript", target: [0]},
  { name: "Php", target: [0] },
  { name: "Html", target: [0] },
  { name: "Css", target: [0] },
  { name: "other", target: [0] },
  { name: "JQuery", target: [1] },
  { name: "Laravel", target: [2] },
  { name: "Cake", target: [2] },
  { name: "AngularJS", target: [1] }

];

// var nodes = [
//   { name: "Parent" },
//   { name: "child1", target: [0] },
//   { name: "child2", target: [1] },
//   { name: "child3", target: [2] },
//   { name: "child4", target: [3] },
//   { name: "child5", target: [4] }
// ];


var links = [];

for (var i=0; i<nodes.length; i++) {
  if (nodes[i].target !== undefined) {
    for (var x=0; x<nodes[i].target.length; x++) {
      links.push({
        source: nodes[i],
        target: nodes[nodes[i].target[x]]
      });
    }
  }
}


//tooltip
var tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('padding', '10px')
      .style('background', 'white')
      .style('opacity', '0')
      .style('border-radius', '48%');



//crear chart
var chart = d3.select('#forcechart')
          .append('svg')
          .attr('width', w)
          .attr('height', h)

//layout force
var force = d3.layout.force()
            .nodes(nodes)
            .links([])
            .gravity(0.2)
            .charge(-1000)
            .size([w,h])
//lineas
var link = chart.selectAll('line')
            .data(links).enter().append('line')
            .attr('stroke', 'cyan')
//circulos de los nodos. Primero añadimos un 'g' y luego los circulos
var node = chart.selectAll('circle')
            .data(nodes).enter()
            .append('g')
            .call(force.drag)
    node.append('circle')
      .attr('cx', function(d){ return d.x; })
      .attr('cy', function(d){ return d.y; })
      .attr('r', function(d,i){
        if(i>0) {
          return circleWidth;
        } else return circleWidth+5;
      })
      .attr('fill', function(d,i) {
        if (i>0) {
          return paleta.orange;
        } else {
          return paleta.green;
        }
      })
      .attr('stroke', 'white')

	  node.append('text')
          .text(function(d){
            return d.name;
          })
          .attr('font-family', 'ubuntu condensed')
          .attr('font-weight', 'bold')
          .attr('fill', function(d,i){
            //color distinto para el primer nodo
            if (i>0) {
              return 'white';
            } else {
              return paleta.darkgray;
            }
          })
          .attr('text-anchor', function(d,i){
            if(i>0) {
              return 'beginning';
            } else {
              return 'end';
            }
          })
          .attr('x', function(d,i){
            if (i>0) {
              return 20;
            } else {
              return -20;
            }
          })
          .attr('font-size', function(d,i){
            if(i>0) {
              return '1em'
            } else {
              return '1.5em'
            }
          })


    force.on('tick', function(e) {
      node.attr('transform', function(d, i) {
        return 'translate('+d.x+','+d.y+')';
      })
      link
        .attr('x1', function(d){return d.source.x})
        .attr('y1', function(d){return d.source.y})
        .attr('x2', function(d){return d.target.x})
        .attr('y2', function(d){return d.target.y})

    })




force.start();
