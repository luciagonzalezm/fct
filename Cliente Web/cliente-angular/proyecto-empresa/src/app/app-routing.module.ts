import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './componentes/administrator/administrator.component';
import { DepartmentComponent } from './componentes/department/department.component';
import { DetallesAdministratorComponent } from './componentes/detalles-administrator/detalles-administrator.component';
import { DetallesDepartmentComponent } from './componentes/detalles-department/detalles-department.component';
import { DetallesSupervisorComponent } from './componentes/detalles-supervisor/detalles-supervisor.component';
import { DetallesUserComponent } from './componentes/detalles-user/detalles-user.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { NuevoAdministratorComponent } from './componentes/nuevo-administrator/nuevo-administrator.component';
import { NuevoDepartmentComponent } from './componentes/nuevo-department/nuevo-department.component';
import { NuevoSupervisorComponent } from './componentes/nuevo-supervisor/nuevo-supervisor.component';
import { NuevoUserComponent } from './componentes/nuevo-user/nuevo-user.component';
import { PantallaLoginComponent } from './componentes/pantalla-login/pantalla-login.component';
import { SupervisorComponent } from './componentes/supervisor/supervisor.component';
import { UserComponent } from './componentes/user/user.component';
import { VisualizarEncuestasComponent } from './componentes/visualizar-encuestas/visualizar-encuestas.component';
import { AuthGuardConsultarSupervisorsGuard } from './servicios/auth-guard-consultar-supervisors.guard';
import { AuthGuardConsultarUsersGuard } from './servicios/auth-guard-consultar-users.guard';
import { AuthGuardCrearEncuestaGuard } from './servicios/auth-guard-crear-encuesta.guard';
import { AuthGuardCrearSupervisorsGuard } from './servicios/auth-guard-crear-supervisors.guard';
import { AuthGuardCrearUsersGuard } from './servicios/auth-guard-crear-users.guard';
import { AuthGuardCrudAdministratorsGuard } from './servicios/auth-guard-crud-administrators.guard';
import { AuthGuardCrudDepartmentsGuard } from './servicios/auth-guard-crud-departments.guard';
import { AuthGuardInicioGuard } from './servicios/auth-guard-inicio.guard';
import { AuthGuardModificarSupervisorsGuard } from './servicios/auth-guard-modificar-supervisors.guard';
import { AuthGuardModificarUsersGuard } from './servicios/auth-guard-modificar-users.guard';

const routes: Routes = [
  { path: 'login', component: PantallaLoginComponent },


  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuardInicioGuard] },


  { path: 'departamentos', component: DepartmentComponent, canActivate: [AuthGuardCrudDepartmentsGuard] },
  { path: 'departamentos/modificar/:id', component: DetallesDepartmentComponent, canActivate: [AuthGuardCrudDepartmentsGuard] },
  { path: 'departamentos/nuevo', component: NuevoDepartmentComponent, canActivate: [AuthGuardCrudDepartmentsGuard] },


  { path: 'administradores', component: AdministratorComponent, canActivate: [AuthGuardCrudAdministratorsGuard] },
  { path: 'administradores/modificar/:id', component: DetallesAdministratorComponent, canActivate: [AuthGuardCrudAdministratorsGuard] },
  { path: 'administradores/nuevo', component: NuevoAdministratorComponent, canActivate: [AuthGuardCrudAdministratorsGuard] },


  { path: 'supervisores', component: SupervisorComponent, canActivate: [AuthGuardConsultarSupervisorsGuard] },
  { path: 'supervisores/modificar/:id', component: DetallesSupervisorComponent, canActivate: [AuthGuardModificarSupervisorsGuard] },
  { path: 'supervisores/nuevo', component: NuevoSupervisorComponent, canActivate: [AuthGuardCrearSupervisorsGuard] },

  { path: 'supervisores/encuesta/nueva', component: EncuestaComponent, canActivate: [AuthGuardCrearEncuestaGuard] },
  { path: 'supervisores/encuestas/mostrar', component: VisualizarEncuestasComponent, canActivate: [AuthGuardCrearEncuestaGuard] },


  { path: 'usuarios', component: UserComponent, canActivate: [AuthGuardConsultarUsersGuard] },
  { path: 'usuarios/modificar/:id', component: DetallesUserComponent, canActivate: [AuthGuardModificarUsersGuard] },
  { path: 'usuarios/nuevo', component: NuevoUserComponent, canActivate: [AuthGuardCrearUsersGuard] },

  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
