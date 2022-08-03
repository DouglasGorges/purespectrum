import { timer } from 'rxjs'
import { Component, Injectable, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
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

  onSubmit (): void {
    if (this.formLogin.valid) {
      this.startLoad()
      timer(this.timeBeforeLogIn).subscribe(() => {
        sessionStorage.setItem(this.loggedStr, 'true')
        this.stopLoad()
      })
    }
  }

  private stopLoad (): void {
    this.loading = false
  }

  private startLoad (): void {
    this.loading = true
  }

  protected get isLoading (): boolean {
    return this.loading
  }

  // logOut (): void {
  //   sessionStorage.removeItem(this.loggedStr)
  // }

  get isLoggedIn (): boolean {
    return sessionStorage.getItem(this.loggedStr) === 'true'
  }

  protected get errorMessage (): string {
    return 'You must enter a value'
  }
}
