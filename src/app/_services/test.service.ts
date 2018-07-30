import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { END_POINT } from '../_config/constants.config';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: HttpClient) {}

  getEmail(email) {
    return this.http.get(`${environment.API2}${END_POINT.CHECK_EMAIL}${email}`);
  }

  isTaken(data) {
    return this.http.post(`${environment.API}${END_POINT.USER}`, data);
  }

  submitAnswer(answer) {
    return this.http.post(`${environment.API}${END_POINT.SUBMIT}`, answer);
  }
}
