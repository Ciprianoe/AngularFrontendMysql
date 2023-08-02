import { Component,OnInit  } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent {
    empleados: any[]=[];
 
  constructor(
    private _empleadoService:EmpleadoService,
    private toastr: ToastrService,
    private router:Router,
     private loginService:LoginService){
    
  }

  ngOnInit():void{
      this._empleadoService.getEmpleados().subscribe(empleados => {
        this.empleados = empleados;
        empleados.forEach((element:any)=>{          
          //console.log(this.empleados);
        })
      //this.empleados = empleados;
      //console.log(this.empleados);
    })
  }
 
  async eliminarEmpleado(empleadoId:any){
    const response =await this._empleadoService.eliminarEmpleado(empleadoId);
    this.toastr.error('Usuario Eliminado Sactifactoriamente','Empleado Borrado');
    console.log(empleadoId);
  }

  logOut(){
    localStorage.removeItem('tokenId');
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

 /*  async onClickDelete(place: Place) {
    const response = await this.placesService.deletePlace(place);
    console.log(response);
  } */

}
