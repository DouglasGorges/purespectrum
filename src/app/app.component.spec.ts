import { TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { LoginComponent } from './views/login/login.component'

describe('AppComponent', () => {
  let app: AppComponent
  let loginComponent: LoginComponent

  class MockLoginComponent {
    get isLoggedIn (): boolean {
      return false
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: LoginComponent, useClass: MockLoginComponent }
      ],
      declarations: [AppComponent]
    }).compileComponents()

    const fixture = TestBed.createComponent(AppComponent)
    app = fixture.componentInstance

    loginComponent = TestBed.inject(LoginComponent)
  })

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })

  it('should create the LoginComponent', () => {
    expect(loginComponent).toBeTruthy()
  })

  it('should check if its logged in', () => {
    let loggedIn = true
    loggedIn = app.isLoggedIn()
    expect(loggedIn).not.toBeTruthy()
  })
})
