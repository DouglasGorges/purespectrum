import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsInterceptor } from './errors-interceptor';

describe('ErrorsInterceptorComponent', () => {
  let component: ErrorsInterceptor;
  let fixture: ComponentFixture<ErrorsInterceptor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsInterceptor ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorsInterceptor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
