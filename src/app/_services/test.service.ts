import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { END_POINT } from '../_config/constants.config';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: HttpClient) {}

  getEmails(email) {
    return this.http.get(`${environment.API}${END_POINT.CHECK_EMAIL}${email}`);
  }
  submitAnswer(answer) {
    return this.http.post(`${environment.API}${END_POINT.SUBMIT}`, answer);
  }
}
