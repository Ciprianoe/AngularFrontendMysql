import { Component } from '@angular/core';
import { ChartConfiguration, } from 'chart.js';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  title = 'bar-chart';
   dataA: number[] = [65, 59, 80, 81, 56, 55, 40];
   dataB: number[]=  [ 28, 48, 40, 19, 86, 27, 90 ];
    colors:string[] = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)'
  ];

  colorBootStrap:string[]= [
  'rgba(0, 123, 255, 0.2)',
  'rgba(40, 167, 69, 0.2)',
  'rgba(220, 53, 69, 0.2)',
  'rgba(255, 193, 7, 0.2)',
  'rgba(23, 162, 184, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(0, 0, 0, 0.2)',
  'rgba(108, 117, 125, 0.2)'
  ]

  public barChartLegend = true;
  public barChartPlugins = [];


  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      data: this.dataA,
      label: 'Series A',
      backgroundColor: this.colorBootStrap.map(color => `${color}`),
      borderColor: this.colorBootStrap.map(color => `${color.slice(0, -4)}1)`),
      borderWidth: 1,
      pointBackgroundColor: this.colorBootStrap.map(color => `${color}`),
      pointBorderColor: this.colorBootStrap.map(color => `${color.slice(0, -4)}1)`)
    }as any, // Utilizar any para permitir propiedades adicionales
    {
      data: this.dataB,
      label: 'Series B',
      backgroundColor: this.colorBootStrap.map(color => `${color}`),
      borderColor: this.colorBootStrap.map(color => `${color.slice(0, -4)}1)`),
      borderWidth: 1,
      pointBackgroundColor: this.colorBootStrap.map(color => `${color}`),
      pointBorderColor: this.colorBootStrap.map(color => `${color.slice(0, -4)}1)`)
    }as any
  ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor() {
  }


}
