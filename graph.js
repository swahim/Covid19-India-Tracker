let myChart = document.getElementById('myChart').getContext('2d');
    const Url = "https://api.covid19api.com/dayone/country/india"
    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';
    let xLabel = []
    let yTemps = []
    drawChart()
    async function drawChart(){
      await getData();
    let massPopChart = new Chart(myChart, {
      type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:xLabel,
        datasets:[{
          label:'Cases',
          data: yTemps,
          //backgroundColor:'green',
          backgroundColor:[
        
             'rgba(214, 91, 120,0.6)'
          ],
          borderWidth:0.5,
          borderColor:'#d65b78',
          hoverBorderWidth:3,
          hoverBorderColor:'#E97F2D'
        }]
      },
      options:{
        title:{
          display:true,
          text:'Total Registered Cases from Januray 30, 2020',
          fontSize:25,
          fontColor: '#000000'
        },
        scales: {
          xAxes: [{
              ticks: {
                  fontSize: 13,
                  display: true,
                fontSize :12 ,
                display : false,
                fontColor : '#6c757d'
              }
          
          }],
          yAxes: [{
            ticks: {
                fontSize: 13,
                display: true,
              fontSize :15 ,
            
              fontColor : '#ff083a',
              beginAtZero:true,
              userCallback: function(value, index, values) {
                  value = value.toString();
                  value = value.split(/(?=(?:...)*$)/);
                  value = value.join(',');
                  return value;
              }
            }
        
        }]
          
    },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000000',
            fontSize : 12
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });}

    async function getData(){
    await fetch(Url).then((data) => {
      return data.text()
    }).then((result) => {
        let array = JSON.parse(result)
        // console.log(array)
        array.forEach(Element => {
            xLabel.push(Element.Date);
            yTemps.push(Element.Confirmed);
        })
    })}
  
    
    
