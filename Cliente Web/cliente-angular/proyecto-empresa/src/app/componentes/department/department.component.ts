import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/clases/administrator';
import { Department } from 'src/app/clases/department';
import { CargaAdministratorService } from 'src/app/servicios/carga-administrator.service';
import { CargaDepartmentService } from 'src/app/servicios/carga-department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {
  public departments: Department[] = [];
  public department!: Department;
  public departmentsFind!: Department[];
  public encontrado!: boolean;
  public departmentName!: string;
  public administrators: Administrator[] = [];

  constructor(private titleService: Title, private cargaDepartment: CargaDepartmentService, private cargaAdministrator: CargaAdministratorService, private cdRef: ChangeDetectorRef, public router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Consultar departamentos');
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  limpiarBusqueda(): Department[] {
    this.departmentsFind = [];
    return this.departmentsFind;
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

  buscarDepartamentoPorNombre(): void {
    this.departmentsFind = [];
    this.administrators = [];
    this.cargaDepartment.getDepartmentByName(this.departmentName).subscribe(
      departments => {
        if (departments !== null) {
          this.encontrado = true;
          this.departmentsFind = this.departments.concat(departments);
          this.departmentsFind.forEach(departmentFind => {
            this.cargaAdministrator.getAdministratorById(departmentFind.createBy).subscribe(
              administrator => {
                this.administrators.push(administrator);
              },
              error => console.log(error)
            );
          });
        } else {
          this.encontrado = false;
          this.departmentsFind = [];
          Swal.fire({
            title: 'Departamento no encontrado',
            text: "¿Desea crear un nuevo departamento con ese nombre?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/departamentos/nuevo']);
            }
          })
        }
        console.log(this.departmentsFind);
        console.log(this.administrators);
      },
      error => console.log(error)
    );
  }

  eliminarDepartamentoPorId(departmentId: number): void {
    this.cargaDepartment.getDepartmentById(departmentId).subscribe(
      department => {
        this.department = department;
      },
      error => console.log(error)
    );
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El departamento se eliminará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.department.numEmpleados === 0) {
          this.cargaDepartment.deleteDepartmentById(departmentId).subscribe(
            departments => {
              this.buscarDepartamentoPorNombre();
              console.log('Departamento ' + departmentId + ' eliminado');
            },
            error => console.log(error)
          );
          Swal.fire('Departamento borrado', 'El departamento ha sido borrado correctamente', 'success');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Operación denegada',
            text: 'No se pueden eliminar departamentos en los cuales hay empleados asignados',
          });
        }
      } else {
        Swal.fire('Operación cancelada', 'El departamento no ha sido borrado');
      }
    });
  }
}
