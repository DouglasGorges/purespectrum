import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { of } from 'rxjs'
import { AddBookComponent } from './add-book.component'

describe('AddBookComponent', () => {
  let component: AddBookComponent
  let fixture: ComponentFixture<AddBookComponent>

  let dialogSpy: jasmine.Spy
  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null
  })
  dialogRefSpyObj.componentInstance = { body: '' }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBookComponent],
      imports: [MatDialogModule]
    }).compileComponents()

    fixture = TestBed.createComponent(AddBookComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(
      dialogRefSpyObj
    )
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open modal to add book', () => {
    component.addBook()
    expect(dialogSpy).toHaveBeenCalled()
  })
})
