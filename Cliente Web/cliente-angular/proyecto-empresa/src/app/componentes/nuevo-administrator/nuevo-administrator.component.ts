import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/clases/administrator';
import { Department } from 'src/app/clases/department';
import { CargaAdministratorService } from 'src/app/servicios/carga-administrator.service';
import { CargaDepartmentService } from 'src/app/servicios/carga-department.service';
import { CargaSupervisorService } from 'src/app/servicios/carga-supervisor.service';
import { CargaUserService } from 'src/app/servicios/carga-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-administrator',
  templateUrl: './nuevo-administrator.component.html',
  styleUrls: ['./nuevo-administrator.component.css']
})

export class NuevoAdministratorComponent implements OnInit {
  public empleados!: Array<any>;
  public empleadosFind: number = 0;
  public administrator: Administrator;
  public departments!: Department[];
  public departmentSelected!: Department;

  constructor(private titleService: Title, private cargaAdministrator: CargaAdministratorService, private cargaSupervisor: CargaSupervisorService, private cargaUser: CargaUserService, private cargaDepartment: CargaDepartmentService, private router: Router) {
    this.administrator = new Administrator(0, '', '', '', '', 0, '', '', '');
    this.cargaDepartment.getDepartments().subscribe(
      departments => {
        this.departments = departments;
      },
      error => console.log(error)
    );

    this.cargaAdministrator.getAdministrators().subscribe(
      administrators => {
        this.empleados = administrators;
      },
      error => console.log(error)
    );

    this.cargaSupervisor.getSupervisors().subscribe(
      supervisors => {
        this.empleados = this.empleados.concat(supervisors);
      },
      error => console.log(error)
    );

    this.cargaUser.getUsers().subscribe(
      users => {
        this.empleados = this.empleados.concat(users);
      },
      error => console.log(error)
    );
  }

  ngOnInit(): void {
    this.titleService.setTitle('Nuevo administrador');
    this.administrator.role = 'administrator';
  }

  optionSelected(i: number): void {
    document.getElementsByClassName('department_option')[i].setAttribute('selected', '');
    this.departmentSelected = this.departments[i];
  }

  crearAdministrador(): void {
    this.empleados.forEach(empleado => {
      if ((empleado.username === this.administrator.username) || (empleado.email === this.administrator.email)) {
        this.empleadosFind++;
      }
    });
    if (this.empleadosFind === 0) {
      this.administrator.department = Number(this.administrator.department);
      this.cargaAdministrator.postNewAdministrator(this.administrator).subscribe(
        administrators => {
          console.log('Nuevo administrador creado');
          console.log(this.administrator);
          Swal.fire(
            'Administrador creado',
            'El administrador ha sido creado correctamente',
            'success'
          );
          this.departmentSelected.numEmpleados = this.departmentSelected.numEmpleados + 1;
          this.cargaDepartment.modifyDepartmentById(this.departmentSelected).subscribe(
            department => {
              console.log(department);
            },
            error => console.log(error)
          );
          this.router.navigate(['/administradores']);
        },
        error => console.log(error)
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Datos repetidos',
        text: 'El usuario o el email introducidos ya están siendo usados por otro empleado',
      });
      this.empleadosFind = 0;
    }
  }
}
