import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

constructor(
  private loginService:LoginService, 
  private router:Router,
  private toastr:ToastrService){}


  logOut(){
    this.loginService.logOutUser()
    .then(()=>{
      this.router.navigate(['/login']);
    })
    .catch(error=>{
      console.log(error);
    });
  }


}
