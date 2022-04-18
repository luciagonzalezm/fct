import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Department } from 'src/app/clases/department';
import { User } from 'src/app/clases/user';
import { CargaDepartmentService } from 'src/app/servicios/carga-department.service';
import { CargaUserService } from 'src/app/servicios/carga-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  public users: User[] = [];
  public usersFind!: User[];
  public encontrado!: boolean;
  public userName!: string;
  public departments: Department[] = [];
  public departmentSelected!: Department;

  constructor(private titleService: Title, private cargaUser: CargaUserService, private cargaDepartment: CargaDepartmentService, private cdRef: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Consultar usuarios');
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  limpiarBusqueda(): User[] {
    this.usersFind = [];
    return this.usersFind;
  }

  ocultarTabla(): boolean {
    let busqueda = (<HTMLInputElement>document.getElementById('buscador')).value.length;
    if (busqueda === 0) {
      this.encontrado = false;
      return true;
    } else {
      return false;
    }
  }

  buscarUsuarioPorNombre(): void {
    this.usersFind = [];
    this.departments = [];
    this.cargaUser.getUserByName(this.userName).subscribe(
      users => {
        if (users !== null) {
          this.encontrado = true;
          this.usersFind = this.users.concat(users);
          this.usersFind.forEach(userFind => {
            this.cargaDepartment.getDepartmentById(userFind.department).subscribe(
              department => {
                this.departments.push(department);
              },
              error => console.log(error)
            );
          });
        } else {
          this.encontrado = false;
          this.usersFind = [];
          Swal.fire({
            title: 'Usuario no encontrado',
            text: "¿Desea crear un nuevo usuario con ese nombre?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/usuarios/nuevo']);
            }
          })
        }
        console.log(this.usersFind);
        console.log(this.departments);
      },
      error => console.log(error)
    );
  }

  modificarUsuario(idUsuario: number): void {
    if (localStorage.getItem('idUsuario') !== null && Number(localStorage.getItem('idUsuario')) !== idUsuario || localStorage.getItem('idAdministrador') !== null) {
      Swal.fire({
        icon: 'error',
        title: 'Operación denegada',
        text: 'No tiene permiso para realizar esta tarea',
      });
    } else {
      if ((localStorage.getItem('idUsuario') !== null && Number(localStorage.getItem('idUsuario')) === idUsuario) || localStorage.getItem('idSupervisor') !== null) {
        this.router.navigate(['/usuarios/modificar', idUsuario]);
      }
    }
  }

  eliminarUsuarioPorId(idUsuario: number): void {
    if (localStorage.getItem('role') === 'supervisor') {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'El usuario se eliminará permanentemente',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cargaUser.getUserById(idUsuario).subscribe(
            user => {
              this.cargaDepartment.getDepartmentById(user.department).subscribe(
                department => {
                  this.departmentSelected = department;
                  this.cargaUser.deleteUserById(idUsuario).subscribe(
                    users => {
                      this.departmentSelected.numEmpleados = this.departmentSelected.numEmpleados - 1;
                      this.cargaDepartment.modifyDepartmentById(this.departmentSelected).subscribe(
                        department => {
                          console.log(department);
                        },
                        error => console.log(error)
                      );
                      this.buscarUsuarioPorNombre();
                      console.log('Usuario ' + idUsuario + ' eliminado');
                    },
                    error => console.log(error)
                  );
                },
                error => console.log(error)
              )
            },
            error => console.log(error)
          );
          Swal.fire('Usuario borrado', 'El usuario ha sido borrado correctamente', 'success');
        } else {
          Swal.fire('Operación cancelada', 'El usuario no ha sido borrado');
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Operación denegada',
        text: 'No tiene permiso para realizar esta tarea',
      });
    }
  }
}