import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccessControl } from 'src/app/shared/accessControl/access-control';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  private loggedIn: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.loggedIn = false;
  }

  ngOnInit(): void {
    this.createForm(new AccessControl());
  }

  private createForm(login: AccessControl): void {
    this.formLogin = this.formBuilder.group({
      username: [login.username, Validators.required],
      password: [login.password, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.formLogin.valid) {
      console.log(this.formLogin.value);
      this.loggedIn = true;
    }
  }

  onCancel(): void {
    this.formLogin.reset(new AccessControl());
  }

  onLogOut(): void {
    this.loggedIn = false;
    this.formLogin.reset(new AccessControl());
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getErrorMessage(): string {
    return 'You must enter a value';
  }
}
