import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CodeErrorFirebaseService } from 'src/app/services/code-error-firebase.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

loginForm:FormGroup;
loading:boolean = false;

  constructor(
    private loginService:LoginService, 
    private formBuilder:FormBuilder,
    private router:Router,
    private toastr:ToastrService,
    private codeError:CodeErrorFirebaseService,
    private user:UserService){
      /* Init loginForm en constructo */
      this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
      })
    }
    
    loginUser(){
      const email =  this.loginForm.value.email;
      const password =  this.loginForm.value.password;
      console.log(this.loginForm.value);
      this.loading = true; 
      this.loginService.loginUser(this.loginForm.value)     
      .then((response)=>{
        console.log(response)
        if(response.user.emailVerified){
        this.loading = false;
      /* para Mysql-sequelize */
      const user: User ={username: email, password:password}
      this.user.login(user).subscribe({ next: (token)=>{
        /* con esto guardamos el token en el localstorage para despues tomarlo y pasarlo al header */
        localStorage.setItem('tokenId',token);
        //console.log(token);
        this.router.navigate(['/dashboard']);        
        this.toastr.success('Logueo Exitoso!!!','Usuario: '+email)
      }})  
      /* fin Mysql */        
        }else{
          this.loginService.verificarEmail(response.user)
          this.router.navigate(['/verificar-correo']);
        }        
      })
      .catch(error=>{
        this.loading = false;
        console.log(error)
        this.toastr.error(this.codeError.createUserError(error.code), 'Error',{positionClass:'toast-top-right'}); 
      });
    }

    logInGoogle(){
      const email =  this.loginForm.value.email;
      const password =  this.loginForm.value.password;
      this.loginService.logInGoogle()
      .then(response =>{
        this.toastr.success('Logueo Exitoso!!!','Login',{positionClass:'toast-top-right'})
        this.router.navigate(['/login']);
        console.log(response);
      })
      .catch(error =>{
        console.log(error);
      });
      console.log('GOOGLE');
    }

   /*  logOut(){
      this.loginService.logOutUser()
      .then(()=>{
        this.router.navigate(['/login']);
      })
      .catch(error=>{
        console.log(error);
      });
    } */

 /* auth/wrong-password */
}
