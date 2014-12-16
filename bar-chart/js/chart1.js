//datos genéricos
var padding = 20;
var w = 600;
var h = 250;
var datos = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11,
            12, 15, 20, 18, 17, 16, 18, 23, 25,21,8,11,15,5,23];

//datos ordenados ascendente o descendentemente
// datos.sort(function compareNumbers(a,b){
//   return a-b;
// });

  //generar el svg
var svg = d3.select('#chart1')
                .append('svg')
                .attr('width', w)
                .attr('height', h)

//Scales eje x
var xScale = d3.scale.ordinal()
              .domain(d3.range(datos.length))
              .rangeRoundBands([0, w], 0.05);
var xScaleInv = d3.scale.ordinal()
              .domain(d3.range(datos.length))
              .rangeRoundBands([w, 0], 0.05);


    //genear barres i adaptar amples de barra a l'amplada del svg
    svg.selectAll('rect')
      .data(datos)
      .enter()
      .append('rect')
      //ajustar espacio entre barras al ancho del svg
      .attr('x', function(d,i){
        return i * (w / datos.length);
      })
      .attr('y', function(d) {
        return h - d*5;
      })
      .attr('width', w / datos.length - 2)
      .attr('height', function (d){
        return d*10;
      })
      .attr('fill', function(d) {
        return 'rgb(0,'+(d*10)+',0)';
      });
      //.attr('fill', 'teal');

    //labels
    svg.selectAll('text')
      .data(datos)
      .enter()
      .append('text')
      .text(function(d){
        return d;
      })
      .attr('x', function(d, i){
        return i * (w / datos.length) + (w / datos.length -1 ) /2;
      })
      .attr('y', function(d) {
        return h-d*5+15;
      })
      .attr('fill', 'white')
      .attr('font-size', 11)
      .attr('text-anchor', 'middle');


    //boton ordenar ascendente
    d3.select('#dos')
        .on('click', function(){
          ordenaBarras();
        });
    d3.select('#tres')
        .on('click', function(){
          ordenaBarrasDesc();
        })

    var ordenaBarrasDesc = function(texto) {
      svg.selectAll('rect')
           .sort(function(a,b){
             return d3.ascending(b,a);
           })
           .transition()
           .duration(1000)
           .attr('x', function(d,i){
             return xScale(i);
           });
       svg.selectAll('text')
           .sort(function(a,b){
             return d3.ascending(a,b);
           })
           .transition()
           .duration(1000)
           .attr('x', function(d,i){
             return 10+xScaleInv(i);
           })

           .attr('text-anchor', 'middle');
    }


     var ordenaBarras = function(texto) {
       svg.selectAll('rect')
            .sort(function(a,b){
              return d3.ascending(a,b);
            })
            .transition()
            .duration(1000)
            .attr('x', function(d,i){
              return xScale(i);
            });
        svg.selectAll('text')
            .sort(function(a,b){
              return d3.ascending(a,b);
            })
            .transition()
            .duration(1000)
            .attr('x', function(d,i){
              return 10+xScale(i);
            })

            .attr('text-anchor', 'middle');
     }

    //boton generar datos aleatorios.
    d3.select("#uno")
        .on("click", function () {
          //svg.selectAll('text').remove();
          //New values for dataset

          var numValues = datos.length; //Count original length of dataset
          dataset = []; //Initialize empty array
          for (var i = 0; i < numValues; i++) { //Loop numValues times
          var newNumber = Math.floor(Math.random() * 45)+3; //New random integer (0-24)
          dataset.push(newNumber); //Add new number to array
          }
          //Update all rects
          svg.selectAll("rect")
          .data(dataset)
          .transition()
          .duration(1000)
          // .delay(function(d,i){
          //   return i*100;
          // })
          //linear, elastic, circle, bounce
          //.ease('linear')
          .attr("y", function(d) {
            return h-d*5;
          })
          .attr("height", function(d) {
            return d*10;
          })
          .attr("fill", function(d) {
            return "rgb(0,  " + (d * 10) + ", 0)";
          });

          //update labels
          svg.selectAll('text')
              .data(dataset)
              .transition()
              .duration(1000)
              // .delay(function(d,i){
              //   return i*100;
              // })
              .text(function(d){
                return d;
              })
              .attr('x', function(d, i){
                return i * (w / dataset.length) + (w / dataset.length -1 ) /2;
              })
              .attr('y', function(d) {
                return h-d*5+15;
              })
              .attr('fill', 'white')
              .attr('font-size', 11)
              .attr('text-anchor', 'middle');

        });
