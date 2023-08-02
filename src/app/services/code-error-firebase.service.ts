import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorEnum } from '../shared/spinner/utils/firebase-code-error';


@Injectable({
  providedIn: 'root'
})
export class CodeErrorFirebaseService {

  constructor(private router:Router, private toastr:ToastrService) { }


  createUserError(code:string){
    /* hay otra forma de hacerlo: en el disparador this.createUserError(error.code) esto envolverlo
      this.toastr.error(this.createUserError(error.code),'erro') quedari asi en createUser y cambiar dependiende del caso   
    */
    switch(code){

      /* error password debil */
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'Revisa que el password que coincida y sea mayor a 5 caracteres';
         /* error email ya registrado */
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'Usuario ya registrado, Si olvido contraseña puede recuperarla!!!';
         /* error email invalido */
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Introduce un correo valido!';
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Contraseña Incorrecta';
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'Usuario no Existe';
        case FirebaseCodeErrorEnum.AuthInvalidValue:
        return 'Proporcionar Correo Valido o Usuario no existe';
      default:
        return 'Error desconocido'; 
    }
  }






}
