var margin = {
    top: 30,
    right: 30,
    bottom: 45,
    left: 40
};

var width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var bardata = [];
//obtener data
d3.json("datos.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;
  data.forEach(function(d) {
      console.log(d.datos);
      bardata.push(d.datos);
    });
    console.log(bardata);

    //crear svg para grafica
    var graf = d3.select('#lineschart')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)

    //crear lineas
    var lines = graf.append('g')
                //.attr('transform', 'translate('+margin.left+','+margin.top+')')
                .selectAll('line')
                .data(bardata)
                .enter()
                .append('line')
                .attr('x1',0)
                .attr('y1',function(d, i){
                  return i*30
                })
                .attr('x2', width)
                .attr('y2', function(d, i){
                  return i*30
                })
                .style('stroke', 'orange');

      var circulos = graf.selectAll('circle')
              .data(bardata)
              .enter()
              .append('circle')
              .attr('cy', function(d,i){
                return i*30;
              })
              .attr('cx', function (d,i){
                return i*40;
              })
              .attr('r', 5)
              .attr('fill', 'pink')



});
