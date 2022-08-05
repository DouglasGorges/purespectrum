import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule
} from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { ToastrModule } from 'ngx-toastr'
import { Book } from 'src/app/models/book'
import { BookService } from 'src/app/service/books-service/book.service'
import { BookServiceStub } from 'src/app/service/books-service/book.service.spec'
import { BookFormComponent } from './book-form.component'

describe('BookFormComponent', () => {
  let component: BookFormComponent
  let fixture: ComponentFixture<BookFormComponent>
  let formGroupDirective: FormGroupDirective

  const strTest = 'Test'
  const existingBookStub: Book = new Book({
    id: 1,
    name: strTest,
    year: 1988,
    authors: [strTest, strTest],
    summary: strTest
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookFormComponent],
      providers: [
        FormBuilder,
        FormGroupDirective,
        { provide: BookService, useClass: BookServiceStub }
      ],
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
    formGroupDirective = new FormGroupDirective([], [])
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should add author', () => {
    component.newAuthor = new FormControl<string>(strTest)

    component.addAuthor()

    expect((component.formBook.get('authors') as FormArray).length).toEqual(1)
  })

  it('should NOT add author with empty data', () => {
    component.addAuthor()

    expect((component.formBook.get('authors') as FormArray).length).toEqual(0)
  })

  it('should create form with data', () => {
    component.book = existingBookStub

    component.ngOnInit()

    expect((component.formBook.get('authors') as FormArray).length).toEqual(2)
  })

  it('should remove author', () => {
    component.book = { id: 0, authors: [strTest, strTest] } as Book

    component.ngOnInit()
    component.removeAuthor(0)

    expect((component.formBook.get('authors') as FormArray).length).toEqual(1)
  })

  it('should not submit', () => {
    const addBookSpy = spyOn(TestBed.inject(BookService), 'addBook')
    const updateBookSpy = spyOn(TestBed.inject(BookService), 'updateBook')

    component.formBook.setErrors({ error: true })
    component.onSubmit(formGroupDirective)

    expect(addBookSpy).not.toHaveBeenCalled()
    expect(updateBookSpy).not.toHaveBeenCalled()
  })

  it('should update a book', () => {
    const formBookStub = component.formBuilder.group({
      id: 1,
      name: strTest,
      year: 1988,
      authors: new FormArray([]),
      summary: strTest
    })

    component.formBook = formBookStub
    component.book = existingBookStub
    const updateBookSpy = spyOn(TestBed.inject(BookService), 'updateBook')

    component.onSubmit(formGroupDirective)

    expect(updateBookSpy).toHaveBeenCalled()
  })
})
