import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrator } from 'src/app/clases/administrator';
import { Department } from 'src/app/clases/department';
import { CargaAdministratorService } from 'src/app/servicios/carga-administrator.service';
import { CargaSupervisorService } from 'src/app/servicios/carga-supervisor.service';
import { CargaDepartmentService } from 'src/app/servicios/carga-department.service';
import { CargaUserService } from 'src/app/servicios/carga-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-administrator',
  templateUrl: './detalles-administrator.component.html',
  styleUrls: ['./detalles-administrator.component.css']
})

export class DetallesAdministratorComponent implements OnInit {
  public empleados!: Array<any>;
  public empleadosFind: number = 0;
  public administrator: Administrator;
  public idAdministrator!: number;
  public departments!: Department[];
  public departmentSelected!: Department;

  constructor(private route: ActivatedRoute, private titleService: Title, private cargaAdministrator: CargaAdministratorService, private cargaSupervisor: CargaSupervisorService, private cargaUser: CargaUserService, private cargaDepartment: CargaDepartmentService, private router: Router) {
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
    this.idAdministrator = this.route.snapshot.params['id'];
    if (Number.isNaN(Number(this.idAdministrator)) || Number(localStorage.getItem('idAdministrador')) !== Number(this.idAdministrator)) {
      this.router.navigate(['/administradores']);
    } else {
      this.cargaAdministrator.getAdministratorById(this.idAdministrator).subscribe(
        administrator => {
          if (administrator !== null) {
            this.administrator = administrator;
          } else {
            this.router.navigate(['/administradores']);
          }
          console.log(this.administrator);
        },
        error => console.log(error)
      );
    }
    this.titleService.setTitle('Modificar administrador ' + this.idAdministrator);
  }

  optionSelected(i: number): void {
    document.getElementsByClassName('department_option')[i].setAttribute('selected', '');
    this.departmentSelected = this.departments[i];
  }

  modificarAdministrador(): void {
    this.empleados.forEach(empleado => {
      if ((empleado.username === this.administrator.username) || (empleado.email === this.administrator.email)) {
        this.empleadosFind++;
      }
    });
    if (this.empleadosFind < 2) {
      this.departmentSelected.numEmpleados = this.departmentSelected.numEmpleados - 1;
      this.cargaDepartment.modifyDepartmentById(this.departmentSelected).subscribe(
        department => {
          console.log(department);
        },
        error => console.log(error)
      );
      this.administrator.department = Number(this.administrator.department);
      this.cargaAdministrator.modifyAdministratorById(this.administrator).subscribe(
        administrator => {
          console.log('Administrador ' + this.idAdministrator + ' modificado');
          console.log(this.administrator);
          Swal.fire(
            'Administrador modificado',
            'El administrador ha sido modificado con éxito',
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
