var width = 600,
    height = 200;
var dataset = [4, 6, 3, 12, 25,10,14,21,5,9,13];

var chart = d3.select('#circles')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height)

d3.select('svg').style('background', '#222');

//scala eje x
var xScale = d3.scale.ordinal()
    .domain(d3.range(0, dataset.length))
    .rangeBands([0,width], 0.5);



chart.selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('cy', height/2)
            .attr('cx', function(d, i){
              return xScale(i);
            })
            .attr('r', function(d){
              return d;
            })
            .attr('fill', 'grey')
            .on('mouseover', function(){
              d3.select(this)
                  .transition()
                  .attr('fill', '#8a3a54')
                  .attr('cursor', 'pointer')
            })
            .on('mouseout', function(){
              d3.select(this)
                  .transition()
                  .attr('fill', 'grey')
            })


chart.selectAll('text')
            .data(dataset)
            .enter()
            .append('text')
            .text(function(d){
              return d;
            })
            .attr('x', function(d, i){
              return xScale(i);
            })
            .attr('y',function(d){
              return  55+height/2;
            })
            .attr('text-anchor', 'middle')
            .attr('font-family', 'verdana')
