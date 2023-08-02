import { Component,OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CodeErrorFirebaseService } from 'src/app/services/code-error-firebase.service';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent {

constructor(private loginServer:LoginService){

}


ngOnInit(){

  
}

}
