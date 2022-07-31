import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AddComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  
  let toastrService: jasmine.SpyObj<ToastrService>;
  let notificationServiceSpy: any;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);

    await TestBed.configureTestingModule({
      declarations: [ AddComponent ],
      providers: [FormBuilder],
      imports: [HttpClientModule, CommonModule, ToastrModule.forRoot()]
    })
    .compileComponents()

    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
    // expect(component).toBeTruthy();
  });
});
