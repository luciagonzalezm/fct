import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Department } from 'src/app/clases/department';
import { Supervisor } from 'src/app/clases/supervisor';
import { CargaDepartmentService } from 'src/app/servicios/carga-department.service';
import { CargaSupervisorService } from 'src/app/servicios/carga-supervisor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})

export class SupervisorComponent implements OnInit {
  public supervisors: Supervisor[] = [];
  public supervisorsFind!: Supervisor[];
  public encontrado!: boolean;
  public supervisorName!: string;
  public departments: Department[] = [];
  public departmentSelected!: Department;

  constructor(private titleService: Title, private cargaSupervisor: CargaSupervisorService, private cargaDepartment: CargaDepartmentService, private cdRef: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Consultar supervisores');
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  limpiarBusqueda(): Supervisor[] {
    this.supervisorsFind = [];
    return this.supervisorsFind;
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

  buscarSupervisorPorNombre(): void {
    this.supervisorsFind = [];
    this.departments = [];
    this.cargaSupervisor.getSupervisorByName(this.supervisorName).subscribe(
      supervisors => {
        if (supervisors !== null) {
          this.encontrado = true;
          this.supervisorsFind = this.supervisors.concat(supervisors);
          this.supervisorsFind.forEach(supervisorFind => {
            this.cargaDepartment.getDepartmentById(supervisorFind.department).subscribe(
              department => {
                this.departments.push(department);
              },
              error => console.log(error)
            );
          });
        } else {
          this.encontrado = false;
          this.supervisorsFind = [];
          Swal.fire({
            title: 'Supervisor no encontrado',
            text: "¿Desea crear un nuevo supervisor con ese nombre?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/supervisores/nuevo']);
            }
          })
        }
        console.log(this.supervisorsFind);
        console.log(this.departments);
      },
      error => console.log(error)
    );
  }

  modificarSupervisor(idSupervisor: number): void {
    if (localStorage.getItem('idSupervisor') !== null && Number(localStorage.getItem('idSupervisor')) !== idSupervisor) {
      Swal.fire({
        icon: 'error',
        title: 'Operación denegada',
        text: 'No tiene permiso para realizar esta tarea',
      });
    } else {
      if ((localStorage.getItem('idSupervisor') !== null && Number(localStorage.getItem('idSupervisor')) === idSupervisor) || localStorage.getItem('idAdministrador') !== null) {
        this.router.navigate(['/supervisores/modificar', idSupervisor]);
      }
    }
  }

  eliminarSupervisorPorId(idSupervisor: number): void {
    if (localStorage.getItem('role') === 'administrator') {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'El supervisor se eliminará permanentemente',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cargaSupervisor.getSupervisorById(idSupervisor).subscribe(
            supervisor => {
              this.cargaDepartment.getDepartmentById(supervisor.department).subscribe(
                department => {
                  this.departmentSelected = department;
                  this.cargaSupervisor.deleteSupervisorById(idSupervisor).subscribe(
                    supervisors => {
                      this.departmentSelected.numEmpleados = this.departmentSelected.numEmpleados - 1;
                      this.cargaDepartment.modifyDepartmentById(this.departmentSelected).subscribe(
                        department => {
                          console.log(department);
                        },
                        error => console.log(error)
                      );
                      this.buscarSupervisorPorNombre();
                      console.log('Supervisor ' + idSupervisor + ' eliminado');
                    },
                    error => console.log(error)
                  );
                },
                error => console.log(error)
              )
            },
            error => console.log(error)
          );
          Swal.fire('Supervisor borrado', 'El supervisor ha sido borrado correctamente', 'success');
        } else {
          Swal.fire('Operación cancelada', 'El supervisor no ha sido borrado');
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
