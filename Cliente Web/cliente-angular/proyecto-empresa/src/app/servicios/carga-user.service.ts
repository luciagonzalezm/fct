import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../clases/user';

@Injectable({
  providedIn: 'root'
})
export class CargaUserService {
  private URL_SERVER = 'http://localhost:8080/v1/';

  constructor(private http: HttpClient) { }


  deleteUserById(userId: number): Observable<User> {
    return this.http.delete<User>(this.URL_SERVER + 'deleteUserById/' + userId);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL_SERVER + 'getUsers');
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.URL_SERVER + 'getUserById/' + userId);
  }

  getUserByName(userName: string): Observable<User> {
    return this.http.get<User>(this.URL_SERVER + 'getUserByName/' + userName);
  }

  modifyUserById(user: User): Observable<User> {
    let params = JSON.parse(JSON.stringify(user));
    return this.http.put<User>(this.URL_SERVER + 'modifyUserById/' + user.id, params);
  }

  postNewUser(user: User): Observable<User> {
    let params = JSON.parse(JSON.stringify(user));
    return this.http.post<User>(this.URL_SERVER + 'postNewUser', params);
  }
}
