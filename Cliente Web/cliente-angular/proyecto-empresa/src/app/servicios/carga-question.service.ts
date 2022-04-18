import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from '../clases/pregunta';

@Injectable({
  providedIn: 'root'
})
export class CargaQuestionService {
  private URL_SERVER = 'http://localhost:8080/v1/';

  constructor(private http: HttpClient) { }

  deleteQuestionById(questionId: number): Observable<Pregunta> {
    return this.http.delete<Pregunta>(this.URL_SERVER + 'deleteQuestionById/' + questionId);
  }

  getQuestions(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.URL_SERVER + 'getQuestions');
  }

  getQuestionById(questionId: number): Observable<Pregunta> {
    return this.http.get<Pregunta>(this.URL_SERVER + 'getQuestionById/' + questionId);
  }

  modifyQuestionById(question: Pregunta): Observable<Pregunta> {
    let params = JSON.parse(JSON.stringify(question));
    return this.http.put<Pregunta>(this.URL_SERVER + 'modifyQuestionById/' + question.id, params);
  }

  postNewQuestion(question: Pregunta): Observable<Pregunta> {
    let params = JSON.parse(JSON.stringify(question));
    return this.http.post<Pregunta>(this.URL_SERVER + 'postNewQuestion', params);
  }
}
