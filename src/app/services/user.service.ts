import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /* crearemos dos variables para almacenar la url del api */

  private myAppUrl:string;
  private myApiUrl:string;
  constructor(private http:HttpClient) { 
    this.myAppUrl= environment.endpoint;
    this.myApiUrl= 'api/users';
  }


  signIn(user:User):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,user);
  }

  login(user:User):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`,user)
  }


}