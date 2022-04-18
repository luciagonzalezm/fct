import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/clases/administrator';
import { Department } from 'src/app/clases/department';
import { CargaAdministratorService } from 'src/app/servicios/carga-administrator.service';
import { CargaDepartmentService } from 'src/app/servicios/carga-department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})

export class AdministratorComponent implements OnInit {
  public administrators: Administrator[] = [];
  public administratorsFind!: Administrator[];
  public encontrado!: boolean;
  public administratorName!: string;
  public departments: Department[] = [];
  public departmentSelected!: Department;

  constructor(private titleService: Title, private cargaAdministrator: CargaAdministratorService, private cargaDepartment: CargaDepartmentService, private cdRef: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Consultar administradores');
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  limpiarBusqueda(): Administrator[] {
    this.administratorsFind = [];
    return this.administratorsFind;
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

  buscarAdministradorPorNombre(): void {
    this.administratorsFind = [];
    this.departments = [];
    this.cargaAdministrator.getAdministratorByName(this.administratorName).subscribe(
      administrators => {
        if (administrators !== null) {
          this.encontrado = true;
          this.administratorsFind = this.administrators.concat(administrators);
          this.administratorsFind.forEach(administratorFind => {
            this.cargaDepartment.getDepartmentById(administratorFind.department).subscribe(
              department => {
                this.departments.push(department);
              },
              error => console.log(error)
            );
          });
        } else {
          this.encontrado = false;
          this.administratorsFind = [];
          Swal.fire({
            title: 'Administrador no encontrado',
            text: "¿Desea crear un nuevo administrador con ese nombre?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/administradores/nuevo']);
            }
          })
        }
        console.log(this.administratorsFind);
        console.log(this.departments);
      },
      error => console.log(error)
    );
  }

  modificarAdministrador(idAdministrator: number): void {
    if (Number(localStorage.getItem('idAdministrador')) !== idAdministrator) {
      Swal.fire({
        icon: 'error',
        title: 'Operación denegada',
        text: 'No tiene permiso para realizar esta tarea',
      });
    } else {
      this.router.navigate(['/administradores/modificar', idAdministrator]);
    }
  }

  eliminarAdministradorPorId(idAdministrator: number): void {
    if (Number(localStorage.getItem('idAdministrador')) === idAdministrator) {
      Swal.fire({
        icon: 'error',
        title: 'Operación denegada',
        text: 'No puede eliminarse a si mismo del sistema',
      });
    } else {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'El administrador se eliminará permanentemente',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cargaAdministrator.getAdministratorById(idAdministrator).subscribe(
            administrator => {
              this.cargaDepartment.getDepartmentById(administrator.department).subscribe(
                department => {
                  this.departmentSelected = department;
                  this.cargaAdministrator.deleteAdministratorById(idAdministrator).subscribe(
                    administrators => {
                      this.departmentSelected.numEmpleados = this.departmentSelected.numEmpleados - 1;
                      this.cargaDepartment.modifyDepartmentById(this.departmentSelected).subscribe(
                        department => {
                          console.log(department);
                        },
                        error => console.log(error)
                      );
                      this.buscarAdministradorPorNombre();
                      console.log('Administrador ' + idAdministrator + ' eliminado');
                    },
                    error => console.log(error)
                  );
                },
                error => console.log(error)
              )
            },
            error => console.log(error)
          );
          Swal.fire('Administrador borrado', 'El administrador ha sido borrado correctamente', 'success');
        } else {
          Swal.fire('Operación cancelada', 'El administrador no ha sido borrado');
        }
      });
    }
  }
}
