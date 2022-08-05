import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { fakeAsync, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { Subject, Observable, defer, of } from 'rxjs'
import { Book } from 'src/app/models/book'
import { BookService } from './book.service'

export const arraySize = 1
export class BookServiceStub {
  subjectNotifier: Subject<null> = new Subject<null>()

  getBooks (): Observable<Book[]> {
    return fakeAsyncResponse(new Array<Book>(arraySize))
  }

  addBook (book: Book): Observable<Book> {
    return fakeAsyncResponse(book)
  }

  updateBook (book: Book): Observable<Book> {
    return fakeAsyncResponse(book)
  }

  removeBook (book: Book): Observable<boolean> {
    return fakeAsyncResponse(!!book.id)
  }

  notifyAboutChange () {
    this.subjectNotifier.next(null)
  }
}

export function fakeAsyncResponse<T> (data: T): Observable<T> {
  return defer(() => Promise.resolve(data))
}

describe('BookService', () => {
  let service: BookService
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let toastrService: jasmine.SpyObj<ToastrService>

  const booksListStub: Book[] = [
    new Book({ id: 1 }),
    new Book({ id: 3 }),
    new Book({ id: 2 })
  ]

  beforeEach(async () => {
    httpClientSpy = <jasmine.SpyObj<HttpClient>>(
      jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete'])
    )
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'success'
    ])

    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [],
      providers: [
        BookService,
        { provide: ToastrService, useValue: toastrService }
      ]
    }).compileComponents()

    service = new BookService(httpClientSpy, toastrService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return a Books list', () => {
    httpClientSpy.get.and.returnValue(of(booksListStub))

    service.getBooks().subscribe((booksList) => {
      expect(booksList.length).toEqual(booksListStub.length)
    })
  })

  it('should add a book', fakeAsync(() => {
    const bookStub = new Book({ id: 1 })
    httpClientSpy.post.and.returnValue(of(bookStub))

    service.addBook(bookStub)

    expect(toastrService.success).toHaveBeenCalled()
  }))

  it('should update a book', () => {
    const bookStub = new Book({ id: 1 })
    httpClientSpy.put.and.returnValue(of(bookStub))

    service.updateBook(bookStub)

    expect(toastrService.success).toHaveBeenCalled()
  })

  it('should remove a book', () => {
    const bookStub = new Book({ id: 1 })
    httpClientSpy.delete.and.returnValue(of(true))

    service.removeBook(bookStub)
    expect(toastrService.success).toHaveBeenCalled()
  })
})
