import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PantallaLoginComponent } from './componentes/pantalla-login/pantalla-login.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { CargaLoginService } from './servicios/carga-login.service';
import { DetallesDepartmentComponent } from './componentes/detalles-department/detalles-department.component';
import { NuevoDepartmentComponent } from './componentes/nuevo-department/nuevo-department.component';
import { DepartmentComponent } from './componentes/department/department.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { CargaDepartmentService } from './servicios/carga-department.service';
import { CargaAdministratorService } from './servicios/carga-administrator.service';
import { CargaSupervisorService } from './servicios/carga-supervisor.service';
import { CargaUserService } from './servicios/carga-user.service';
import { AdministratorComponent } from './componentes/administrator/administrator.component';
import { DetallesAdministratorComponent } from './componentes/detalles-administrator/detalles-administrator.component';
import { NuevoAdministratorComponent } from './componentes/nuevo-administrator/nuevo-administrator.component';
import { SupervisorComponent } from './componentes/supervisor/supervisor.component';
import { DetallesSupervisorComponent } from './componentes/detalles-supervisor/detalles-supervisor.component';
import { NuevoSupervisorComponent } from './componentes/nuevo-supervisor/nuevo-supervisor.component';
import { UserComponent } from './componentes/user/user.component';
import { DetallesUserComponent } from './componentes/detalles-user/detalles-user.component';
import { NuevoUserComponent } from './componentes/nuevo-user/nuevo-user.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { VisualizarEncuestasComponent } from './componentes/visualizar-encuestas/visualizar-encuestas.component';

@NgModule({
  declarations: [
    AppComponent,
    PantallaLoginComponent,
    CabeceraComponent,
    DetallesDepartmentComponent,
    NuevoDepartmentComponent,
    DepartmentComponent,
    InicioComponent,
    FooterComponent,
    AdministratorComponent,
    DetallesAdministratorComponent,
    NuevoAdministratorComponent,
    SupervisorComponent,
    DetallesSupervisorComponent,
    NuevoSupervisorComponent,
    UserComponent,
    DetallesUserComponent,
    NuevoUserComponent,
    EncuestaComponent,
    VisualizarEncuestasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CargaLoginService, CargaDepartmentService, CargaAdministratorService, CargaSupervisorService, CargaUserService, Title],
  bootstrap: [AppComponent]
})

export class AppModule { }
