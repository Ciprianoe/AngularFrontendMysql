import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CreateEmpleadosComponent } from './components/create-empleados/create-empleados.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/spinner/utils/auth.guard';


const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full' },
  {path:'login', component:LoginComponent},
  {path:'registrar-usuario', component:RegistrarUsuarioComponent},
  {path:'verificar-correo', component:VerificarCorreoComponent},
  {path:'recuperar-password', component:RecuperarPasswordComponent},
  {path:'dashboard', component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'list-empleados', component:ListEmpleadosComponent,canActivate:[AuthGuard]},
  {path:'create-empleados', component:CreateEmpleadosComponent,canActivate:[AuthGuard]},
  {path:'edit-empleado/:id', component:CreateEmpleadosComponent,canActivate:[AuthGuard]},
  {path:'**', redirectTo:'login',pathMatch:'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
