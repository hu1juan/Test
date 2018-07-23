import { Component, OnInit } from '@angular/core';
import { TestService } from '../app/_services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  email: string;
  choices = ['A', 'B', 'C', 'D'];
  answerClass: string;
  toggleEmailInput = true;
  constructor(private _TestService: TestService) {}

  go() {
    if (!this.email) {
      return alert('Please provide email address.');
    }
    this._TestService.getEmails().subscribe(
      data => {
        this.toggleEmailInput = false;
        this._TestService
          .getQuestions()
          .subscribe(
            res => console.log(res),
            error => alert('error in getting question')
          );
      },
      error => alert('error')
    );
  }

  selectedAnswer(answer) {
    this.answerClass = answer;
  }
  ngOnInit() {}
}
