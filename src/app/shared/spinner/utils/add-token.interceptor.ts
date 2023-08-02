import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { HttpEvent,HttpRequest,HttpHandler,HttpInterceptor,HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor  ( private router:Router, private errorService: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /* Obtenemos el token */
    const token = localStorage.getItem('tokenId');
    /* validamos que haya token */
    if(token){      
        request = request.clone({setHeaders:{Authorization:`Bearer ${token}`}})
      }

      /* Si no tiene token va al login */
      return next.handle(request).pipe(
        catchError((error:HttpErrorResponse)=>{
          if(error.status === 401){
            this.errorService.msjError(error)
            this.router.navigate(['/login'])
          }
            return  throwError(()=> new Error('Error'))
        })
      );
    
  }
}
