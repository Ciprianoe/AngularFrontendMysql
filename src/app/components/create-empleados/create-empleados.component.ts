import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DataSnapshot } from '@angular/fire/database';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent {

  createEmpleado: FormGroup;
  submit=false;
  loading=false;
  id: String | null;
  editEmpleado: any;
  titulo ="Agregar Empleado";

  constructor(
    private formbuilder:FormBuilder,
    private empleadoService:EmpleadoService,
    private router:Router,
    private toastr: ToastrService,
    private aRoute:ActivatedRoute){
    this.createEmpleado = this.formbuilder.group({
      
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      dni:['',Validators.required],
      cargo:['',Validators.required],
      salario:['',Validators.required]
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    //console.log(this.id);
  }

ngOnInit(){
  this.actualizarEmpleado()
}

  agregarEditarEmpleado(){
    this.submit = true;
    if(this.createEmpleado.invalid){
      return;
    }

    if (this.id === null){
      this.titulo = "Agregar Empleado";
      this.agregarEmpleado();      
    }else{

      this.editaEmpleados(this.id)
      //this.titulo = "Editar Empleado";
    }

    /* para capturar los datos en una variable */
   /*  let empleado: any ={
      nombre:this.createEmpleado.value.nombre,
      apellido:this.createEmpleado.value.apellido,
      dni:this.createEmpleado.value.dni,
      cargo:this.createEmpleado.value.cargo,
      salario:this.createEmpleado.value.salario,
      fechaCreate: new Date(),
      fechaUpdate: new Date()
    }
    // console.log(empleado);
    this.loading=true;
    this.empleadoService.agregarEmpleado(empleado).then(()=>{     
      //this.loading=true;
      console.log('Registrado');
      this.toastr.success('Usuario Registrado Exitosamente','Empleado Guardado');
      this.router.navigate(['/list-empleado']);     
    }).catch(error =>{
      console.log(error);
      this.loading=false;
    }) */
    
  }

  agregarEmpleado(){
    /* para capturar los datos en una variable */
    let empleado: any ={
      nombre:this.createEmpleado.value.nombre,
      apellido:this.createEmpleado.value.apellido,
      dni:this.createEmpleado.value.dni,
      cargo:this.createEmpleado.value.cargo,
      salario:this.createEmpleado.value.salario,
      fechaCreate: new Date(),
      fechaUpdate: new Date()
    }
    // console.log(empleado);
    this.loading=true;
    this.empleadoService.agregarEmpleado(empleado).then(()=>{     
      //this.loading=true;
      console.log('Registrado');
      this.toastr.success('Usuario Registrado Exitosamente','Empleado Guardado');
      this.router.navigate(['/list-empleados']);     
    }).catch(error =>{
      console.log(error);
      this.loading=false;
    })
  }


    editaEmpleados(id:any){
      console.log('Editar empleados');
      let empleado: any ={
        nombre:this.createEmpleado.value.nombre,
        apellido:this.createEmpleado.value.apellido,
        dni:this.createEmpleado.value.dni,
        cargo:this.createEmpleado.value.cargo,
        salario:this.createEmpleado.value.salario,
        fechaUpdate: new Date()
      }
      this.loading=true;
      this.empleadoService.actualizarEmpleado(id,empleado).then(()=>{
        this.loading=false;
        this.toastr.info('Empleado Modificado con Exito','Empleado Actualizado')
        this.router.navigate(['/list-empleados']); 
      })


    }

  actualizarEmpleado(){
     
      if(this.id !== null){
        this.loading = true;
        this.titulo = "Editar Empleado";   
        console.log('hay ID'); 
         this.empleadoService.getEmpleado(this.id).then( data => {            
           //console.log(data);
           this.loading = false;
           this.editEmpleado=data;
           console.log(this.editEmpleado.nombre);
           this.createEmpleado.setValue({
            nombre:this.editEmpleado.nombre,
            apellido:this.editEmpleado.apellido,
            dni:this.editEmpleado.dni,
            cargo:this.editEmpleado.cargo,
            salario:this.editEmpleado.salario,
            //fechaUpdate: new Date()
           })

         })
        
             
        }
      }
  


}
