import { Component, OnInit, ViewChild } from '@angular/core';
import { TestService } from '../_services/test.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  UrlSegment,
  Router,
  PRIMARY_OUTLET
} from '@angular/router';

@Component({
  selector: 'app-onlinetest',
  templateUrl: './onlinetest.component.html',
  styleUrls: ['./onlinetest.component.scss']
})
export class OnlinetestComponent implements OnInit {
  @ViewChild('mySwal') private mySwal: SwalComponent;
  @ViewChild('submitSwal') private submitSwal: SwalComponent;
  email: string;
  answers = [];
  questions: any;
  answerClass: string;
  currentQuestion = 1;
  toggleEmailInput = true;
  myAnswers = [];
  counter = 0;
  userId: number;
  userTestId: number;
  max: number;
  isRefresh = 0;
  testTypeId: number;
  constructor(private _TestService: TestService, private _route: Router) {}

  go() {
    if (!this.email) {
      this.mySwal.title = 'ERROR!';
      this.mySwal.text = 'Please provide email address.';
      this.mySwal.type = 'error';
      return this.mySwal.show();
    }
    const email = new FormControl(this.email, [
      Validators.required,
      Validators.email
    ]);
    if (email.status === 'INVALID') {
      this.mySwal.title = 'ERROR!';
      this.mySwal.text = 'Please provide valid email address.';
      this.mySwal.type = 'error';
      return this.mySwal.show();
    }
    // this._TestService.getEmail(this.email).subscribe(
    //   data => {
    // if (!data['emailStatus']) {
    //   this.mySwal.title = 'EMAIL NOT FOUND!';
    //   this.mySwal.text =
    //     'Please make sure that your email is registered in our pooling.';
    //   this.mySwal.type = 'error';
    //   return this.mySwal.show();
    // }
    // const userData = {
    //   fullName: data['fullName'],
    //   userEmail: this.email,
    //   positionDesired: data['positionDesired']
    // };

    const tree = this._route.parseUrl(this._route.url);
    const g = tree.root.children[PRIMARY_OUTLET];
    const s = g.segments;
    const path = s[0].path;
    const testType = [
      { id: 1, type: 'frontend' },
      { id: 2, type: 'backend' },
      { id: 3, type: 'database' },
      { id: 4, type: 'corevalues' }
    ];
    const index = testType.findIndex(x => x.type === path);
    this.testTypeId = testType[index].id;
    const userData = {
      email: this.email,
      testId: this.testTypeId
    };
    this._TestService.getQuestions(userData).subscribe(
      res => {
        if (res['isTaken']) {
          this.mySwal.title = 'Score: ' + res['score'];
          this.mySwal.text = 'You already have taken the test.';
          this.mySwal.type = 'success';
          return this.mySwal.show();
        }
        this.toggleEmailInput = false;
        this.questions = res['question'];
        this.userId = res['userId'];
        // this.userTestId = data['userTestId'];
        this.max = this.questions.length;
        this.checkChoices();
      },
      error => {
        this.mySwal.title = 'ERROR!';
        this.mySwal.text = 'Please try again later.';
        this.mySwal.type = 'error';
        return this.mySwal.show();
      }
    );
    // },
    // error => {
    //   this.mySwal.title = 'ERROR!';
    //   this.mySwal.text = 'Please try again later.';
    //   this.mySwal.type = 'error';
    //   return this.mySwal.show();
    // }
    // );
  }
  next() {
    this.currentQuestion += 1;
    this.checkAnswer();
    this.checkChoices();
  }
  prev() {
    this.currentQuestion -= 1;
    this.checkAnswer();
    this.checkChoices();
  }
  selectedAnswer(answer) {
    const index = this.myAnswers.findIndex(
      x => x.questionId === this.questions[this.currentQuestion - 1].questionId
    );
    if (index === -1) {
      this.myAnswers.push({
        questionId: this.questions[this.currentQuestion - 1].questionId,
        choiceId: answer.choiceId,
        answerStr: answer.choiceStr
      });
      this.counter++;
    } else {
      this.myAnswers[index].answerStr = answer.choiceStr;
      this.myAnswers[index].choiceId = answer.choiceId;
    }
    this.answerClass = answer.choiceStr;
  }

  checkAnswer() {
    const index = this.myAnswers.findIndex(
      x => x.questionId === this.questions[this.currentQuestion - 1].questionId
    );
    this.answerClass = index === -1 ? null : this.myAnswers[index].answerStr;
  }

  checkChoices() {
    this.answers = [];
    this.questions[this.currentQuestion - 1].choices.map(x => {
      this.answers.push({
        id: x.choiceId,
        choiceStr: x.choiceStr.charAt(0)
      });
    });
  }

  confirm() {
    if (this.counter !== this.max) {
      this.mySwal.title = 'REMINDER!';
      this.mySwal.text =
        'Please answer all the questions provided in the test.';
      this.mySwal.type = 'warning';
      return this.mySwal.show();
    }
    this.submitSwal.allowOutsideClick = false;
    return this.submitSwal.show();
  }

  submit() {
    const answer = {
      // userTestId: this.userTestId,
      userId: this.userId,
      testId: this.testTypeId,
      answers: this.myAnswers
    };
    this._TestService.submitAnswer(answer).subscribe(
      res => {
        this.isRefresh = 1;
        this.mySwal.allowOutsideClick = false;
        this.mySwal.title = 'Score: ' + res['score'];
        this.mySwal.text = 'Thank you for completing the test.';
        this.mySwal.type = 'success';
        this.mySwal.show();
      },
      error => alert('Error found in submit')
    );
  }

  refresh() {
    location.reload();
  }
  ngOnInit() {}
}