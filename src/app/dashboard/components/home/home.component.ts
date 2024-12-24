import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MainDashoardService } from '../../services/main-dashoard.service';
declare const ApexCharts: any;
declare const Chart: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit,OnInit{
    data:any
    chartInstance: any;
    constructor(private service:MainDashoardService) {
        
        
    }
    ngOnInit(): void {
        this.loadData()
    }
    
  ngAfterViewInit(): void {
    this.function1();
    this.function2();
    this.function3();
  }

  loadData(){
this.service.statistics.getAll().subscribe(res=>{
    this.data=res.data
})
  }
month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  function1(){
  
    var options = {
      series: [
          {
              type: 'line',
              name: 'المستخدمين',
              data:this.data.lastYearJoinedUsersCount.map((x:any)=>{
                return {
                    x:this.month[x.month-1],
                    y:x.count
                };
              })
          },
          {
              type: 'line',
              name: 'المشاركين',
              chart: {
                  dropShadow: {
                      enabled: true,
                      // enabledOnSeries: true,
                      top: 5,
                      left: 0,
                      blur: 3,
                      color: '#000',
                      opacity: 0.1
                  }
              },
              data: this.data.participantsLastOneYearCount.map((x:any)=>{
                return {
                    x:this.month[x.month-1],
                    y:x.count
                };
              })
          },
          {
              type: 'area',
              name: 'الانشطة',
              chart: {
                  dropShadow: {
                      enabled: true,
                      // enabledOnSeries: undefined,
                      top: 5,
                      left: 0,
                      blur: 3,
                      color: '#000',
                      opacity: 0.1
                  }
              },
              data: this.data.participantsLastOneYearCount.map((x:any)=>{
                return {
                    x:this.month[x.month-1],
                    y:x.count
                };
              })
          }
      ],
      chart: {
          height: 350,
          animations: {
              speed: 500
          },
          dropShadow: {
              enabled: true,
              // enabledOnSeries: true,
              top: 8,
              left: 0,
              blur: 3,
              color: '#000',
              opacity: 0.1
          },
      },
      colors: ["rgb(132, 90, 223)", "rgba(35, 183, 229, 0.85)", "rgba(119, 119, 142, 0.05)"],
      dataLabels: {
          enabled: false
      },
      grid: {
          borderColor: '#f1f1f1',
          strokeDashArray: 3
      },
      stroke: {
          curve: 'smooth',
          width: [2, 2, 0],
          dashArray: [0, 5, 0],
      },
      xaxis: {
          axisTicks: {
              show: false,
          },
      },
    //   yaxis: {
    //       labels: {
    //           formatter: function (value:any) {
    //               return "n" + value;
    //           }
    //       },
    //   },
      tooltip: {
          y: [{
              formatter: function(e:any) {
                  return void 0 !== e ? "" + e.toFixed(0) : e
              }
          }, {
              formatter: function(e:any) {
                  return void 0 !== e ? "" + e.toFixed(0) : e
              }
          }, {
              formatter: function(e:any) {
                  return void 0 !== e ? e.toFixed(0) : e
              }
          }]
      },
      legend: {
          show: true,
          customLegendItems: ['المستخدمين', 'المشاركين', 'الانشطة'],
          inverseOrder: true
      },
      title: {
          text: 'عدد المستخدمين والمشاركين والانشطه لكل شهر',
          align: 'left',
          style: {
              fontSize: '.8125rem',
              fontWeight: 'semibold',
              color: '#8c9097'
          },
      },
      markers: {
          hover: {
              sizeOffset: 5
          }
      }
  };
  document.getElementById('crm-revenue-analytics').innerHTML = '';
  var chart = new ApexCharts(document.querySelector("#crm-revenue-analytics"), options);
  chart.render();
  
  }

  function2(){
    const ctx = document.getElementById('leads-source') as HTMLCanvasElement;
    Chart.defaults.elements.arc.borderWidth = 0;
    Chart.defaults.datasets.doughnut.cutout = '85%';

    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: 'My First Dataset',
          data: [this.data.distinguishedCount,this.data.participantsCount,this.data.activityCount,this.data.totalUsersCount],
          backgroundColor: [
            'rgb(132, 90, 223)',
            'rgb(35, 183, 229)',
            'rgb(38, 191, 148)',
            'rgb(245, 184, 73)',
          ]
        }]
      },
      plugins: [{
        afterUpdate: (chart: any) => {
          const arcs = chart.getDatasetMeta(0).data;

          arcs.forEach((arc: any) => {
            arc.round = {
              x: (chart.chartArea.left + chart.chartArea.right) / 2,
              y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
              radius: (arc.outerRadius + arc.innerRadius) / 2,
              thickness: (arc.outerRadius - arc.innerRadius) / 2,
              backgroundColor: arc.options.backgroundColor
            };
          });
        },
        afterDraw: (chart: any) => {
          const { ctx, canvas } = chart;

          chart.getDatasetMeta(0).data.forEach((arc: any) => {
            const startAngle = Math.PI / 2 - arc.startAngle;
            const endAngle = Math.PI / 2 - arc.endAngle;

            ctx.save();
            ctx.translate(arc.round.x, arc.round.y);
            ctx.fillStyle = arc.options.backgroundColor;
            ctx.beginPath();
            ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          });
        }
      }]
    });

  }

  function3()
{
  var options = {
    series: [{
        name: "المستخدمين",
        data: this.data.lastYearJoinedUsersCount.map((x:any)=>{
            return x.count
          }),
    }, {
        name: "المشاركين",
        data: this.data.participantsLastOneYearCount.map((x:any)=>{
            return x.count
          }),
    }],
    chart: {
        height: 340,
        type: "bar",
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [1.1, 1.1],
        show: true,
        curve: ['smooth', 'smooth'],
    },
    grid: {
        borderColor: '#f3f3f3',
        strokeDashArray: 3
    },
    xaxis: {
        axisBorder: {
            color: 'rgba(119, 119, 142, 0.05)',
        },
    },
    legend: {
        show: false
    },
    labels: this.data.lastYearJoinedUsersCount.map((x:any)=>{
        return this.month[x.month-1]
      }),
    markers: {
        size: 0
    },
    colors: ["rgb(132, 90, 223)", "#e9e9e9"],
    plotOptions: {
        bar: {
            columnWidth: "50%",
            borderRadius: 2,
        }
    },
};
document.getElementById('courses-earnings').innerHTML = ''
var chart1 = new ApexCharts(document.querySelector("#courses-earnings"), options);
chart1.render();
}



}


