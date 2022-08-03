import { Component } from '@angular/core'
import { LoginComponent } from './views/login/login.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (public loginComponent: LoginComponent) {}

  isLoggedIn (): boolean {
    return this.loginComponent.isLoggedIn
  }
}
