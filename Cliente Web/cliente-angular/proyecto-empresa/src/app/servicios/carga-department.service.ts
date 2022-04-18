import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../clases/department';

@Injectable({
  providedIn: 'root'
})

export class CargaDepartmentService {
  private URL_SERVER = 'http://localhost:8080/v1/';

  constructor(private http: HttpClient) { }

  deleteDepartmentById(departmentId: number): Observable<Department> {
    return this.http.delete<Department>(this.URL_SERVER + 'deleteDepartmentById/' + departmentId);
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.URL_SERVER + 'getDepartments');
  }

  getDepartmentById(departmentId: number): Observable<Department> {
    return this.http.get<Department>(this.URL_SERVER + 'getDepartmentById/' + departmentId);
  }

  getDepartmentByName(departmentName: string): Observable<Department> {
    return this.http.get<Department>(this.URL_SERVER + 'getDepartmentByName/' + departmentName);
  }

  modifyDepartmentById(department: Department): Observable<Department> {
    let params = JSON.parse(JSON.stringify(department));
    return this.http.put<Department>(this.URL_SERVER + 'modifyDepartmentById/' + department.id, params);
  }

  postNewDepartment(department: Department): Observable<Department> {
    let params = JSON.parse(JSON.stringify(department));
    return this.http.post<Department>(this.URL_SERVER + 'postNewDepartment', params);
  }
}
