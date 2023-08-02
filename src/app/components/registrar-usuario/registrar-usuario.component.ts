import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { CodeErrorFirebaseService } from 'src/app/services/code-error-firebase.service';
import { Auth } from '@angular/fire/auth';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {

  registrarUsuario: FormGroup;
  loading:boolean = false;

  constructor(
    private formGroup:FormBuilder, 
    private toastr:ToastrService,
    private loginService:LoginService,
    private router:Router,
    private codeError:CodeErrorFirebaseService,
    private user:UserService,
    private auth:Auth){

/* inicializamos la variable para 
manejar el formGroup de resgitro */
    this.registrarUsuario = this.formGroup.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      repetirPassword:['',[Validators.required,Validators.minLength(6)]]

    })

  }
   

  crearUser(){    
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    console.log(this.registrarUsuario);   
    if(password != repetirPassword){
      this.toastr.info('Las constraseñas deben coincidir', 'Error');
      return;
    }    
    this.loading =  true;
    this.loginService.register(this.registrarUsuario.value)    
    .then(response =>{
      this.loading =  false;
      /* para Mysql-sequelize */
      const user: User ={username: email, password:password}
      this.user.signIn(user).subscribe(/* data =>{this.toastr.info('Usuario Registrado Verifica tu correo','Registro Exitoso!!!');} */)  
      /* fin Mysql */
      console.log(response.user);
      this.loginService.verificarEmail(response.user);
      this.toastr.info(`Usuario ${email} Verifica tu correo` ,'Registro Exitoso!!!')
      //console.log(response);     
      this.router.navigate(['/login']);     
        })
    .catch(error => { 
      this.loading =  false;
    console.log(error);
    this.toastr.error(this.codeError.createUserError(error.code), 'error');
  });
   
  }

}
