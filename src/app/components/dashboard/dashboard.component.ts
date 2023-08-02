import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';
import {ChartData} from 'chart.js';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/products';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  listProducts: Product[]=[];

   datasets: ChartData <'bar', {key: string, value: number} []> = {
    datasets: [{
      data: [{key: 'Sales', value: 20}, {key: 'Revenue', value: 10}],
      parsing: {
        xAxisKey: 'key',
        yAxisKey: 'value'
      }
    }],
  };



  constructor(
      private loginService:LoginService,
      private router:Router,
      private cargaScript:CargarScriptsService,
      private productService: ProductService ){
      
    this.cargaScript.cargar(['color-modes']);
  }

  ngOnInit():void{
    this.getProducts();
    
  }

  getProducts(){
    this.productService.getProducts().subscribe( products =>{
      this.listProducts= products;
      console.log(this.listProducts);
    })
  }

     logOut(){
      this.loginService.logOutUser()
      .then(()=>{
        this.router.navigate(['/login']);
      })
      .catch(error=>{
        console.log(error);
      });
    }

    singOut(){
      localStorage.removeItem('tokenId');
      this.loginService.logOutUser()
      .then(()=>{
        this.router.navigate(['/login']);
      })
      .catch(error=>{
        console.log(error);
      });
    }

}
