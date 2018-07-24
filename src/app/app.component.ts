import { Component, OnInit } from '@angular/core';
import { TestService } from '../app/_services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  email: string;
  answers = ['A', 'B', 'C', 'D', 'E'];
  questions: any;
  answerClass: string;
  currentQuestion = 1;
  toggleEmailInput = true;
  myAnswers = [];
  counter = 0;
  constructor(private _TestService: TestService) {}

  go() {
    if (!this.email) {
      return alert('Please provide email address.');
    }
    this._TestService.getEmails().subscribe(
      data => {
        this.toggleEmailInput = false;
        this._TestService.getQuestions().subscribe(
          res => {
            this.questions = res;
            console.log(this.questions);
          },
          error => alert('error in getting question')
        );
      },
      error => alert('error')
    );
  }
  next() {
    this.currentQuestion += 1;
    this.checkAnswer();
  }
  prev() {
    this.currentQuestion -= 1;
    this.checkAnswer();
  }
  selectedAnswer(answer) {
    // this.myAnswers = this.myAnswers.map(x => {
    //   if (x.id === this.questions[this.currentQuestion - 1].id) {
    //     x.answer = answer;
    //     return x;
    //   }
    //   this.myAnswers.push({
    //     id: this.questions[this.currentQuestion - 1].id,
    //     answer: answer
    //   });
    // });

    // console.log(this.myAnswers);

    // const found = this.myAnswers.some(function(el) {
    //   return el.id === this.questions[this.currentQuestion - 1].id;
    // });
    // if (!found) {
    // this.myAnswers.push({
    //   id: this.questions[this.currentQuestion - 1].id,
    //   answer: answer
    // });
    // }

    const index = this.myAnswers.findIndex(
      x => x.id === this.questions[this.currentQuestion - 1].id
    );
    if (index === -1) {
      this.myAnswers.push({
        id: this.questions[this.currentQuestion - 1].id,
        answer: answer
      });
      this.counter++;
    } else {
      this.myAnswers[index].answer = answer;
    }
    this.answerClass = answer;
    console.log(this.myAnswers);
  }

  checkAnswer() {
    const index = this.myAnswers.findIndex(
      x => x.id === this.questions[this.currentQuestion - 1].id
    );
    this.answerClass =
      index === -1 ? null : this.myAnswers[this.currentQuestion - 1].answer;
    console.log(index + 'check');
  }
  ngOnInit() {}
}
