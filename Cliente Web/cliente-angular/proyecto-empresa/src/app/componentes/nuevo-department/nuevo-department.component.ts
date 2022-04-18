import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Department } from 'src/app/clases/department';
import { CargaDepartmentService } from 'src/app/servicios/carga-department.service';

@Component({
  selector: 'app-nuevo-department',
  templateUrl: './nuevo-department.component.html',
  styleUrls: ['./nuevo-department.component.css']
})

export class NuevoDepartmentComponent implements OnInit {
  public department: Department;

  constructor(private titleService: Title, private cargaDepartment: CargaDepartmentService, private router: Router) { 
    this.department = new Department(0, '', 0, 0);
  }

  ngOnInit(): void {
    this.titleService.setTitle('Nuevo departamento');
  }

  crearDepartamento(): void {
    this.department.createBy = Number(localStorage.getItem('idAdministrador'));
    this.department.numEmpleados = 0;
    this.cargaDepartment.postNewDepartment(this.department).subscribe(
      departments => {
        console.log('Nuevo departamento creado');
        console.log(this.department);
        this.router.navigate(['/departamentos']);
      },
      error => console.log(error)
    );
  }
}
