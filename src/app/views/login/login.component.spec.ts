import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { LoginComponent } from './login.component'
import { AccessControl } from 'src/app/shared/accessControl/access-control'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  const credentialsStub: AccessControl = { username: 'test', password: 'test' }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [FormBuilder]
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should log in', fakeAsync(() => {
    component.formLogin.setValue(credentialsStub)

    component.onSubmit()

    tick(component.timeBeforeLogIn)

    expect(component.isLoggedIn).toBeTruthy()
  }))

  it('should cancel a log in', fakeAsync(() => {
    component.onLogOut()

    component.formLogin.setValue(credentialsStub)

    component.onSubmit()
    tick(component.timeBeforeLogIn * 0.5)
    component.onReset()

    expect(component.isLoggedIn).not.toBeTruthy()
  }))

  it('should log out', fakeAsync(() => {
    component.formLogin.setValue(credentialsStub)
    component.onSubmit()
    tick(component.timeBeforeLogIn)

    expect(component.isLoggedIn).toBeTruthy()

    component.onLogOut()
    expect(component.isLoggedIn).not.toBeTruthy()
  }))
})
