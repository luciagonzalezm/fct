import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/clases/department';
import { User } from 'src/app/clases/user';
import { CargaAdministratorService } from 'src/app/servicios/carga-administrator.service';
import { CargaDepartmentService } from 'src/app/servicios/carga-department.service';
import { CargaSupervisorService } from 'src/app/servicios/carga-supervisor.service';
import { CargaUserService } from 'src/app/servicios/carga-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-user',
  templateUrl: './detalles-user.component.html',
  styleUrls: ['./detalles-user.component.css']
})

export class DetallesUserComponent implements OnInit {
  public empleados!: Array<any>;
  public empleadosFind: number = 0;
  public user: User;
  public idUser!: number;
  public departments!: Department[];
  public departmentSelected!: Department;

  constructor(private route: ActivatedRoute, private titleService: Title, private cargaAdministrator: CargaAdministratorService, private cargaSupervisor: CargaSupervisorService, private cargaUser: CargaUserService, private cargaDepartment: CargaDepartmentService, private router: Router) {
    this.user = new User(0, '', '', '', '', 0, '', '', '');
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
    this.idUser = this.route.snapshot.params['id'];
    if (localStorage.getItem('role') === 'supervisor' || Number(localStorage.getItem('idUsuario')) === Number(this.idUser)) {
      if (Number.isNaN(Number(this.idUser))) {
        this.router.navigate(['/usuarios']);
      } else {
        this.cargaUser.getUserById(this.idUser).subscribe(
          user => {
            if (user !== null) {
              this.user = user;
            } else {
              this.router.navigate(['/usuarios']);
            }
            console.log(this.user);
          },
          error => console.log(error)
        );
      }
    } else {
      this.router.navigate(['/usuarios']);
    }
    this.titleService.setTitle('Modificar usuario ' + this.idUser);
  }

  optionSelected(i: number): void {
    document.getElementsByClassName('department_option')[i].setAttribute('selected', '');
    this.departmentSelected = this.departments[i];
  }

  modificarUsuario(): void {
    this.empleados.forEach(empleado => {
      if ((empleado.username === this.user.username) || (empleado.email === this.user.email)) {
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
      this.user.department = Number(this.user.department);
      this.cargaUser.modifyUserById(this.user).subscribe(
        user => {
          console.log('Usuario ' + this.idUser + ' modificado');
          console.log(this.user);
          Swal.fire(
            'Usuario modificado',
            'El usuario ha sido modificado con éxito',
            'success'
          );
          this.departmentSelected.numEmpleados = this.departmentSelected.numEmpleados + 1;
          this.cargaDepartment.modifyDepartmentById(this.departmentSelected).subscribe(
            department => {
              console.log(department);
            },
            error => console.log(error)
          );
          this.router.navigate(['/usuarios']);
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
