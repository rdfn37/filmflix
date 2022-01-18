import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('signUp') signUp!: NgForm;

  onSubmit() {
    console.log(this.signUp.value);
  }

  constructor() {}

  ngOnInit(): void {}
}
