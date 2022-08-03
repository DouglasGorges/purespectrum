import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'

import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

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
    component.formLogin.setValue({ username: 'test', password: 'test' })

    component.onSubmit()

    tick(component.timeBeforeLogIn)

    expect(sessionStorage.getItem(component.loggedStr)).toBeTruthy()
  }))
})
