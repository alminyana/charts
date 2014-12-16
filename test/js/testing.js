var width = 980,
    height = 500;

//creo una escala para el radio de 1 al valor más alto del array de planetas
var rScale = d3.scale.linear()
      .domain([0, d3.max(planets, function(d){ return d.diametro; })])
      .range([1, 100]);

planets.forEach(function(planet){
  planet.radius = rScale(planet.diametro);
});


//crear el svg dentro de nuestro div id='michart'
var svg = d3.select('#michart')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

//creamos el layout force()
var force = d3.layout.force()
      .gravity(0.05)
      .charge(function (d){ return d.radius * -1; })
      .nodes(planets)
      .size([width, height]);

var root = planets[0];
    root.fixed = true;

force.start();

var circles = svg.selectAll('circle')
        .data(planets)

//enter
  circles.enter().append('circle')
      .attr('class', function(d){
        return d.name.toLowerCase();
      })
      .style('fill', function(d){
        return d.color;
      })
      .attr('r',0)

//upadate
  circles
      .transition()
      .duration(1000)
      .attr('r', function(d){
        return d.radius;
      })


//exit
  circles.exit()
      .remove();

//cada frame
force.on('tick', function(e){
  var q = d3.geom.quadtree(planets),
      i = 0,
      n = planets.length;

  while (++i <n) {
    q.visit(collide(planets[i]));
  }

  svg.selectAll('circle')
        .attr('cx', function(d){
          return d.x;
        })
        .attr('cy', function(d){
          return d.y;
        })
});


function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x -r,
      nx2 = node.x +r,
      ny1 = node.y -r,
      ny2 = node.y +r;
      return function (quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Math.sqrt(x*x + y * y),
              r = node.radius + quad.point.radius;
          if (l<r) {
            l = (l-r) / l * .5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2
            ||  x2 < nx1
            || y1 > ny2
            || y2 < ny1;

      };
}
