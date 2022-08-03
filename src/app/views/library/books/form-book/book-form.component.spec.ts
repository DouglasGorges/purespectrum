import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { ToastrModule } from 'ngx-toastr'
import { BookFormComponent } from './book-form.component'

describe('bookFormComponent', () => {
  let component: BookFormComponent
  let fixture: ComponentFixture<BookFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookFormComponent],
      providers: [FormBuilder],
      imports: [
        HttpClientModule,
        CommonModule,
        ToastrModule.forRoot(),
        MatDialogModule,
        ReactiveFormsModule
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(BookFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
