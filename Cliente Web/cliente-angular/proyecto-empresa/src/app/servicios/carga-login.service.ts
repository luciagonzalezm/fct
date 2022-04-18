import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrator } from '../clases/administrator';
import { Login } from '../clases/login';
import { Supervisor } from '../clases/supervisor';
import { User } from '../clases/user';


@Injectable({
  providedIn: 'root'
})

export class CargaLoginService {
  private URL_SERVER = 'http://localhost:8080/v1/';

  constructor(private http: HttpClient) { }

  loginAdministrator(login: Login): Observable<Administrator> {
    let params = JSON.parse(JSON.stringify(login));
    localStorage.setItem('role', 'administrator');
    return this.http.post<Administrator>(this.URL_SERVER + 'loginAdministrator', params);
  }

  loginSupervisor(login: Login): Observable<Supervisor> {
    let params = JSON.parse(JSON.stringify(login));
    localStorage.setItem('role', 'supervisor');
    return this.http.post<Supervisor>(this.URL_SERVER + 'loginSupervisor', params);
  }

  loginUser(login: Login): Observable<User> {
    let params = JSON.parse(JSON.stringify(login));
    localStorage.setItem('role', 'user');
    return this.http.post<Supervisor>(this.URL_SERVER + 'loginUser', params);
  }

  isLoginAdministrator(): boolean {
    if (localStorage.getItem('role') === 'administrator') {
      return true;
    } else {
      return false;
    }
  }

  isLoginSupervisor(): boolean {
    if (localStorage.getItem('role') === 'supervisor') {
      return true;
    } else {
      return false;
    }
  }

  isLoginUser(): boolean {
    if (localStorage.getItem('role') === 'user') {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
  }

}
