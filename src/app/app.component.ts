import { Component } from '@angular/core'
import { LoginComponent } from './views/login/login.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor (public loginComponent: LoginComponent) {}

  // We insert our log in control here because ever modification (like log out or close the nav) will drop the app back
  isLoggedIn (): boolean {
    return this.loginComponent.isLoggedIn
  }
}
