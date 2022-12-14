import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { ToastrModule } from 'ngx-toastr'
import { of } from 'rxjs'
import { Book } from 'src/app/models/book'
import { ListBookComponent } from './list-book.component'
import { BookService } from 'src/app/service/books-service/book.service'
import {
  arraySize,
  BookServiceStub,
  fakeAsyncResponse
} from 'src/app/service/books-service/book.service.spec'

describe('ListBookComponent', () => {
  let component: ListBookComponent
  let fixture: ComponentFixture<ListBookComponent>

  const strTest = 'Test'
  const fakeBook: Book = { id: 1, name: strTest }
  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null
  })
  dialogRefSpyObj.componentInstance = { body: '' }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBookComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), MatDialogModule],
      providers: [{ provide: BookService, useClass: BookServiceStub }]
    }).compileComponents()

    fixture = TestBed.createComponent(ListBookComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should get a books list on init', () => {
    expect(component.tableDataSource.data.length).toEqual(arraySize)
  })

  // We could not resolve this test in time
  it('should trigger a notification by BookService', () => {
    const httpService: BookService = TestBed.inject(BookService)
    httpService.notifyAboutChange()

    // Missing expectations
  })

  it('should open modal to update book', () => {
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(
      dialogRefSpyObj
    )

    component.edit(fakeBook)
    expect(dialogSpy).toHaveBeenCalled()
  })

  it('should remove a book from API', () => {
    // const windowSpy = spyOn(window, 'confirm')
    const serviceSpy = spyOn(
      TestBed.inject(BookService),
      'removeBook'
    ).and.returnValue(fakeAsyncResponse(true))

    // windowSpy.and.returnValue(true)
    component.remove(fakeBook)

    expect(serviceSpy).toHaveBeenCalled()
  })

  it('should apply filter', () => {
    const inputElement: HTMLInputElement = document.createElement('input')
    inputElement.value = strTest
    const keyupEvent = new Event('keyup')

    inputElement.addEventListener('keyup', (event) =>
      component.applyFilter(event)
    )

    const eventWasCalled = inputElement.dispatchEvent(keyupEvent)

    expect(eventWasCalled).toBeTruthy()
    expect(component.tableDataSource.data.length).toEqual(1)
  })
})
