var bardata = [];



//----------------generar data aleatoria-------------
// for (var i=0; i<30; i++) {
//   var num = (Math.random()*20)+1;
//     //num = num.toFixed(3);
//     bardata.push(num);



  //---------------importar tsv-------------------
  //d3.tsv('js/data.tsv', function (data){
  d3.json('data.json', function (data){
    for (key in data) {
      bardata.push(parseInt(data[key].valor));
    }
    //console.log (data);

    //------mostrar los datos ordenados menor a mayor o alrevés-------
    // bardata.sort(function compareNumbers(a,b){
    //   return a-b;
    // });
    console.log(bardata.length);
    //--------objeto con los márgenes de la gráfica-------------
      var margin = {
          top: 30,
          right: 30,
          bottom: 45,
          left: 40
      }
      //medidas del chart y las barras y el offset
      var height = 300 - margin.top - margin.bottom,
          width = 600 - margin.left - margin.right,
          barWidth = 50,
          barOffset = 5;
      var tempColor;
      //scala de colores en función de la posición en la gráfica
      var colores2  = d3.scale.linear()
          .domain([0, bardata.length*0.5, bardata.length])
          .range(['yellow','green','blue']);

      //scala de colores en función del valor (d)
      var colores = d3.scale.linear()
          .domain([0, d3.max(bardata)])
          .range(['yellow', 'red']);

      //scala eje y
      var yScale = d3.scale.linear()
          .domain([0, d3.max(bardata)])
          .range([0, height]);
      //scala eje x
      var xScale = d3.scale.ordinal()
          .domain(d3.range(0, bardata.length))
          .rangeBands([0,width], 0.05,.3);

      //tooltip
      var tooltip = d3.select('body').append('div')
            .style('position', 'absolute')
            .style('padding', '10px')
            .style('background', 'white')
            .style('opacity', '0')
            .style('border-radius', '6px');
      //grafica
      var miChart = d3.select('#chart').append('svg')
            .style('background', '#222')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom )
            .append('g')
            .attr('transform', 'translate('+margin.left+','+margin.top+')')
            .selectAll('rect').data(bardata)
            .enter().append('rect')
                //.style('fill', colores)
                 .style('fill', function (d, i){ //crear degradado de izq a derecha
                   return colores2(i);
                 })
                .attr('width', xScale.rangeBand())
                .attr('x', function(d, i){
                  return xScale(i);
                })
                .attr('height', 0)
                .attr('y', height)

              .on('mouseover', function(d){
                  tooltip.transition().delay(100)
                          .style('opacity', .8)
                  tooltip.html('<h4 class="text-primary"><strong>Ventas:</strong> '+d+'</h4>')
                           .style('left', (d3.event.pageX+20)+'px')
                           .style('top', (d3.event.pageY-60)+'px')

                tempColor = this.style.fill;
                d3.select(this)
                      .transition()
                      .style('opacity', .5)
                      .style('fill', 'yellow');
              })
              .on('mouseout', function(d){
                tooltip.transition()
                        .style('opacity', 0)
                d3.select(this)
                      .transition()
                      .delay(200)
                      .duration(300)
                      .style('opacity', 1)
                      .style('fill', tempColor);
              });
          //animar transicion de 0 a d
          miChart.transition()
            .delay(function(d,i){
              return i *25;
            })
            .duration(600)
            //.ease('elastic')
            .attr('height', function(d){
              return yScale(d);
            })
            .attr('y', function(d){
              return height -  yScale(d);
            });

          //crear escala vertical para el eje
          var vGuideScale = d3.scale.linear()
                  .domain([0, d3.max(bardata)])
                  .range([height, 0]);
          //creando eje vertical
          var vAxis = d3.svg.axis()
                .scale(vGuideScale)
                .orient('left')
                .ticks(10);
          //añado el eje vertical dentro del 'svg' en un nuevo 'g'
          var vGuide = d3.select('svg').append('g')
                vAxis(vGuide);
                vGuide.attr('transform', 'translate('+margin.left+','+margin.top+')')
                vGuide.selectAll('path')
                    .style({
                      fill: 'none',
                      stroke: '#fff'
                    });
                vGuide.selectAll('line')
                    .style({
                      stroke: '#fff'
                    });
            var hAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient('bottom')
                  .tickValues(xScale.domain().filter(function(d,i){
                    return !(i % (bardata.length/4)); //length dividido por un numero múltiplo del length
                  }));

            var hGuide = d3.select('svg').append('g')
                  hAxis(hGuide);
                  hGuide.attr('transform', 'translate('+margin.left+','+(height+margin.top)+')');
                  hGuide.selectAll('path')
                      .style({
                        fill: 'none',
                        stroke: '#fff'
                      });
                  hGuide.selectAll('line')
                      .style({
                        stroke: '#fff'
                      });
  });
