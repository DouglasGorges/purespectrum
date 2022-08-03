import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { BookDialogComponent } from './book-dialog.component'

describe('BookDialogComponent', () => {
  let component: BookDialogComponent
  let fixture: ComponentFixture<BookDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(BookDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
