import { Component, Injectable, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Subject, takeUntil, timer } from 'rxjs'
import { AccessControl } from 'src/app/shared/accessControl/access-control'

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup

  private loading = false
  readonly loggedStr = 'logged'
  readonly timeBeforeLogIn = 1500
  protected ngUnsubscribe: Subject<void> = new Subject<void>()

  constructor (private formBuilder: FormBuilder) {}

  ngOnInit (): void {
    this.createForm(new AccessControl())
  }

  private createForm (login: AccessControl): void {
    this.formLogin = this.formBuilder.group({
      username: [login.username, Validators.required],
      password: [login.password, Validators.required]
    })
  }

  // Here we have a timer to emulate a backend call.
  // Once clicked on Log In button, if We click on Cancel button the request will be canceled bay the .pipe() func
  // If successful, will set data on session storage and AppComponent will allow you to go in the app.
  onSubmit (): void {
    if (this.formLogin.valid) {
      this.startLoadBar()
      timer(this.timeBeforeLogIn)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          sessionStorage.setItem(this.loggedStr, 'true')
          this.stopLoadBar()
        })
    }
  }

  onReset (): void {
    this.ngUnsubscribe.next()
    this.stopLoadBar()
    this.ngUnsubscribe.complete()
  }

  onLogOut (): void {
    sessionStorage.removeItem(this.loggedStr)
  }

  private stopLoadBar (): void {
    this.loading = false
  }

  private startLoadBar (): void {
    this.loading = true
  }

  protected get isLoading (): boolean {
    return this.loading
  }

  get isLoggedIn (): boolean {
    return sessionStorage.getItem(this.loggedStr) === 'true'
  }

  protected get errorMessage (): string {
    return 'You must enter a value'
  }
}
