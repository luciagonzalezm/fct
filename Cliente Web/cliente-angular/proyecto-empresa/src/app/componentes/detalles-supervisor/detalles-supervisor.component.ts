import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/clases/department';
import { Supervisor } from 'src/app/clases/supervisor';
import { CargaAdministratorService } from 'src/app/servicios/carga-administrator.service';
import { CargaDepartmentService } from 'src/app/servicios/carga-department.service';
import { CargaSupervisorService } from 'src/app/servicios/carga-supervisor.service';
import { CargaUserService } from 'src/app/servicios/carga-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-supervisor',
  templateUrl: './detalles-supervisor.component.html',
  styleUrls: ['./detalles-supervisor.component.css']
})

export class DetallesSupervisorComponent implements OnInit {
  public empleados!: Array<any>;
  public empleadosFind: number = 0;
  public supervisor: Supervisor;
  public idSupervisor!: number;
  public departments!: Department[];
  public departmentSelected!: Department;

  constructor(private route: ActivatedRoute, private titleService: Title, private cargaAdministrator: CargaAdministratorService, private cargaSupervisor: CargaSupervisorService, private cargaUser: CargaUserService, private cargaDepartment: CargaDepartmentService, private router: Router) {
    this.supervisor = new Supervisor(0, '', '', '', '', 0, '', '', '');
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
    this.idSupervisor = this.route.snapshot.params['id'];
    if (localStorage.getItem('role') === 'administrator' || Number(localStorage.getItem('idSupervisor')) === Number(this.idSupervisor)) {
      if (Number.isNaN(Number(this.idSupervisor))) {
        this.router.navigate(['/supervisores']);
      } else {
        this.cargaSupervisor.getSupervisorById(this.idSupervisor).subscribe(
          supervisor => {
            if (supervisor !== null) {
              this.supervisor = supervisor;
            } else {
              this.router.navigate(['/supervisores']);
            }
            console.log(this.supervisor);
          },
          error => console.log(error)
        );
      }
    } else {
      this.router.navigate(['/supervisores']);
    }
    this.titleService.setTitle('Modificar supervisor ' + this.idSupervisor);
  }

  optionSelected(i: number): void {
    document.getElementsByClassName('department_option')[i].setAttribute('selected', '');
    this.departmentSelected = this.departments[i];
  }

  modificarSupervisor(): void {
    this.empleados.forEach(empleado => {
      if ((empleado.username === this.supervisor.username) || (empleado.email === this.supervisor.email)) {
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
      this.supervisor.department = Number(this.supervisor.department);
      this.cargaSupervisor.modifySupervisorById(this.supervisor).subscribe(
        supervisor => {
          console.log('Supervisor ' + this.idSupervisor + ' modificado');
          console.log(this.supervisor);
          Swal.fire(
            'Supervisor modificado',
            'El supervisor ha sido modificado con éxito',
            'success'
          );
          this.departmentSelected.numEmpleados = this.departmentSelected.numEmpleados + 1;
          this.cargaDepartment.modifyDepartmentById(this.departmentSelected).subscribe(
            department => {
              console.log(department);
            },
            error => console.log(error)
          );
          this.router.navigate(['/supervisores']);
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
