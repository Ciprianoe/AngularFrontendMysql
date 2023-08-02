import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private myAppUrl:string;
  private myApiUrl:string;
  constructor(private http:HttpClient) { 
    this.myAppUrl= environment.endpoint; 
    this.myApiUrl= 'api/products';
  }

getProducts():Observable<Product[]>{
  /* para obtener los productos necesitamos tener el token que se genera desde el login aca usaremos 
  la logica para alamacenarlo y setearlo de forma correspondiente */
  /* sacamos el token del localstorage */
  // const token = localStorage.getItem('tokenId');
  /* se lo pasamos al header */
  // const headers = new HttpHeaders().set('authorization',`Bearer ${token}`)
  // return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`,{headers:headers});
  return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
}



}
