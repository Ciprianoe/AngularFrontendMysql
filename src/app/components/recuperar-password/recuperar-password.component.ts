import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CodeErrorFirebaseService } from 'src/app/services/code-error-firebase.service';



@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {

  recuperarUsuario: FormGroup;
  loading:boolean = false;

  constructor( private loginService:LoginService, 
    private formBuilder:FormBuilder,
    private router:Router,
    private toastr:ToastrService,
    private codeError:CodeErrorFirebaseService){

      this.recuperarUsuario = this.formBuilder.group({
        email:['',[Validators.required,Validators.email]]
      });
    }
    recuperar(){
      const email = this.recuperarUsuario.value.email;
      this.loading=true;
      console.log(this.recuperarUsuario.value)
      this.loginService.recuperarService(this.recuperarUsuario.value.email)
      
      .then(response=>{
        this.loading = false;
        this.router.navigate(['/login']);
        this.toastr.info('Correo enviado para restablecer','Recuperar Password',{positionClass:'toast-top-right'})
          console.log(response);
      })
      .catch(error =>{
        console.log(error);
        this.loading = false;
        this.toastr.error(this.codeError.createUserError(error.code),'Error',{positionClass:'toast-top-right'})
      });
    }


}
