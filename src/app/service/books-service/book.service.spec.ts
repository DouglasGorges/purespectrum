import { Subject, Observable, defer } from 'rxjs'
import { Book } from 'src/app/models/book'

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
  // let service: BookService
  // let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    // httpClientSpy = <jasmine.SpyObj<HttpClient>>(
    //   jasmine.createSpyObj('HttpClient', ['get'])
    // )
    // service = new BookService(httpClientSpy)
  })

  it('should be created', () => {
    // expect(service).toBeTruthy()
  })
})
