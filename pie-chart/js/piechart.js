var width = 450,
    height = 450,
    radius = 200;
//var colors = d3.scale.category20c();
var colorTemporal;
var arrayColors = ['#595AB7','#A57706','#D11C24',
                    '#C61C6F','#BD3613','#2176C7',
                    '#259286','#738A05'];
var colors = d3.scale.ordinal()
              .range(arrayColors);
var piedata = [
  {
    label: "groenlandia",
    value: 40
  },{
    label: "europa",
    value: 30
  },
  {
    label: "asia",
    value: 45
  },
  {
    label: "america",
    value: 40
  },
  {
    label: "africa",
    value: 50
  }
];

var pie = d3.layout.pie()
      .value(function(d) {
        return d.value;
      })

var arc = d3.svg.arc()
      .innerRadius(100)
      .outerRadius(radius)




var tooltip = d3.select('body').append('div')
      .style({
        width: '230px',
        height: '250px',
        padding: '15px',
        position: 'absolute',
        background: '#333',
        color: 'white',
        opacity: '0'
      })
      .style('border-radius', '7px')


var myChart = d3.select('#chart').append('svg')
              .attr('width', width)
              .attr('height', height)
              .append('g')
                .attr('transform', 'translate('+(width-radius-25)+','+(height-radius-25)+')')
                .selectAll('path').data(pie(piedata))
                .enter()
                .append('g')
                .attr('class', 'slice')

var slices = d3.selectAll('g.slice')
              .append('path')
              .attr('fill', function(d, i){
                return colors(i);
              })
              .attr('stroke', '#fff')
              .attr('stroke-width', '1px')
              .attr('d', arc);

    slices.on('mouseover', function(d){
            tooltip.transition().delay(100)
                  .style('opacity',.9);
            tooltip.html(
              '<h4 class="text-warning"><span class="text-primary">Continente </span>'+d.data.label+'</h4>'
              +'<h4 class="text-danger">'+'<span class="text-primary">Barriles </span>'+d.data.value+' millones al año.</h4>'
              +'<img src="img/'+d.data.label+'.png" width="100px" />'
              )
                  .style('left', width+100+'px')
                  .style('top', '130px')
            colorTemporal = this.style.fill;
            d3.select(this)
            .transition()
            .style('opacity', .5)
            //.style('fill', 'yellow');
          })
          .on('mouseout', function(d){

          tooltip.transition()
                  .delay(1000)
                  .duration(1000)
                  .style('opacity', 0)

            d3.select(this)
                  .transition()
                  .delay(111)
                  .duration(300)
                  .style('opacity', 1)
                  //.style('fill', colorTemporal);
          })

var text = d3.selectAll('g.slice')
              .append('text')
              .text(function(d, i){
                console.log(d);
                return d.data.label;
              })
              .attr('text-anchor', 'middle')
              .attr('fill', '#fff')
              .attr('transform', function(d) {
                d.innerRadius = 0;
                d.outerRadius = radius;
                return 'translate('+arc.centroid(d)+')'
              })
