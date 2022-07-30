import { Component, OnDestroy, OnInit } from '@angular/core';
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
  private loggedStr = 'logged';

  constructor(private formBuilder: FormBuilder) {}

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
    if (this.formLogin.valid) sessionStorage.setItem(this.loggedStr, 'true');
  }

  onCancel(): void {
    this.formLogin.reset(new AccessControl());
  }

  onLogOut(): void {
    sessionStorage.removeItem(this.loggedStr);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.loggedStr) === 'true';
  }

  getErrorMessage(): string {
    return 'You must enter a value';
  }
}
