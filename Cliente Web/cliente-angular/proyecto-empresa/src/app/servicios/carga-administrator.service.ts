import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrator } from '../clases/administrator';

@Injectable({
  providedIn: 'root'
})

export class CargaAdministratorService {
  private URL_SERVER = 'http://localhost:8080/v1/';

  constructor(private http: HttpClient) { }

  deleteAdministratorById(administratorId: number): Observable<Administrator> {
    return this.http.delete<Administrator>(this.URL_SERVER + 'deleteAdministratorById/' + administratorId);
  }

  getAdministrators(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(this.URL_SERVER + 'getAdministrators');
  }

  getAdministratorById(administratorId: number): Observable<Administrator> {
    return this.http.get<Administrator>(this.URL_SERVER + 'getAdministratorById/' + administratorId);
  }

  getAdministratorByName(administratorName: string): Observable<Administrator> {
    return this.http.get<Administrator>(this.URL_SERVER + 'getAdministratorByName/' + administratorName);
  }

  modifyAdministratorById(administrator: Administrator): Observable<Administrator> {
    let params = JSON.parse(JSON.stringify(administrator));
    return this.http.put<Administrator>(this.URL_SERVER + 'modifyAdministratorById/' + administrator.id, params);
  }

  postNewAdministrator(administrator: Administrator): Observable<Administrator> {
    let params = JSON.parse(JSON.stringify(administrator));
    console.log(params);
    return this.http.post<Administrator>(this.URL_SERVER + 'postNewAdministrator', params);
  }
}
