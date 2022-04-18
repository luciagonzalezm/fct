import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/clases/department';
import { CargaDepartmentService } from 'src/app/servicios/carga-department.service';

@Component({
  selector: 'app-detalles-department',
  templateUrl: './detalles-department.component.html',
  styleUrls: ['./detalles-department.component.css']
})
export class DetallesDepartmentComponent implements OnInit {
  public department: Department;
  public idDepartment!: number;

  constructor(private route: ActivatedRoute, private titleService: Title, private cargaDepartment: CargaDepartmentService, private router: Router) { 
    this.department = new Department(0, '', 0, 0);
  }

  ngOnInit(): void {
    this.idDepartment = this.route.snapshot.params['id'];
    if (Number.isNaN(Number(this.idDepartment))) {
      this.router.navigate(['/departamentos']);
    } else {
      this.cargaDepartment.getDepartmentById(this.idDepartment).subscribe(
        department => {
          if (department !== null) {
            this.department = department;
          } else {
            this.router.navigate(['/departamentos']);
          }
          console.log(this.department);
        },
        error => console.log(error)
      );
    }
    this.titleService.setTitle('Modificar departamento ' + this.idDepartment);
  }

  modificarDepartamento(): void {
    this.cargaDepartment.modifyDepartmentById(this.department).subscribe(
      department => {
        console.log('Departamento ' + this.idDepartment + ' modificado');
        console.log(this.department);
        this.router.navigate(['/departamentos']);
      },
      error => console.log(error)
    );
  }
}
