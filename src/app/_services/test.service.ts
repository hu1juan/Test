import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { END_POINT } from '../_config/constants.config';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: HttpClient) {}

  submitAnswer(answer) {
    return this.http.post(`${environment.API}${END_POINT.SUBMIT}`, answer);
  }

  getQuestions(data) {
    return this.http.post(`${environment.API}${END_POINT.TEST}`, data);
  }
}
