import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encuesta } from '../clases/encuesta';

@Injectable({
  providedIn: 'root'
})
export class CargaPollService {
  private URL_SERVER = 'http://localhost:8080/v1/';

  constructor(private http: HttpClient) { }

  deletePollById(pollId: number): Observable<Encuesta> {
    return this.http.delete<Encuesta>(this.URL_SERVER + 'deletePollById/' + pollId);
  }

  getPolls(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.URL_SERVER + 'getPolls');
  }

  getPollById(pollId: number): Observable<Encuesta> {
    return this.http.get<Encuesta>(this.URL_SERVER + 'getPollById/' + pollId);
  }

  modifyPollById(poll: Encuesta): Observable<Encuesta> {
    let params = JSON.parse(JSON.stringify(poll));
    return this.http.put<Encuesta>(this.URL_SERVER + 'modifyPollById/' + poll.id, params);
  }

  postNewPoll(poll: Encuesta): Observable<Encuesta> {
    let params = JSON.parse(JSON.stringify(poll));
    return this.http.post<Encuesta>(this.URL_SERVER + 'postNewPoll', params);
  }
}
