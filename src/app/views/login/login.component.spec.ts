import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in', () => {
    component.formLogin.setValue({ username: 'test', password: 'test' });

    component.onSubmit();

    expect(sessionStorage.getItem(component.loggedStr)).toBeTruthy();
  });

  it('should logOut', () => {
    component.formLogin.setValue({ username: 'test', password: 'test' });
    component.onSubmit();

    component.onLogOut();

    expect(sessionStorage.getItem(component.loggedStr)).not.toBeTruthy();
  });

  it('should cancel', () => {
    component.formLogin.setValue({ username: 'test', password: 'test' });
    component.onCancel();

    expect(component.formLogin.value.username).not.toBeTruthy();
    expect(component.formLogin.value.password).not.toBeTruthy();
  });
});
