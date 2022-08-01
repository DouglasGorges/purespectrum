import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { AccessControl } from 'src/app/shared/accessControl/access-control';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loggedStr = 'logged';
  loading = false;

  readonly time = 1500;

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
    if (this.formLogin.valid) {
      this.initLoad();
      timer(this.time).subscribe(() => {
        sessionStorage.setItem(this.loggedStr, 'true');
        this.stopLoad();
      });
    }
  }

  private stopLoad(): void {
    this.loading = false;
  }

  private initLoad(): void {
    this.loading = true;
  }

  isLoading(): boolean {
    return this.loading;
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
