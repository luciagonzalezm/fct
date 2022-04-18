import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supervisor } from '../clases/supervisor';


@Injectable({
  providedIn: 'root'
})

export class CargaSupervisorService {
  private URL_SERVER = 'http://localhost:8080/v1/';

  constructor(private http: HttpClient) { }

  deleteSupervisorById(supervisorId: number): Observable<Supervisor> {
    return this.http.delete<Supervisor>(this.URL_SERVER + 'deleteSupervisorById/' + supervisorId);
  }

  getSupervisors(): Observable<Supervisor[]> {
    return this.http.get<Supervisor[]>(this.URL_SERVER + 'getSupervisors');
  }

  getSupervisorById(supervisorId: number): Observable<Supervisor> {
    return this.http.get<Supervisor>(this.URL_SERVER + 'getSupervisorById/' + supervisorId);
  }

  getSupervisorByName(supervisorName: string): Observable<Supervisor> {
    return this.http.get<Supervisor>(this.URL_SERVER + 'getSupervisorByName/' + supervisorName);
  }

  modifySupervisorById(supervisor: Supervisor): Observable<Supervisor> {
    let params = JSON.parse(JSON.stringify(supervisor));
    return this.http.put<Supervisor>(this.URL_SERVER + 'modifySupervisorById/' + supervisor.id, params);
  }

  postNewSupervisor(supervisor: Supervisor): Observable<Supervisor> {
    let params = JSON.parse(JSON.stringify(supervisor));
    return this.http.post<Supervisor>(this.URL_SERVER + 'postNewSupervisor', params);
  }
}
