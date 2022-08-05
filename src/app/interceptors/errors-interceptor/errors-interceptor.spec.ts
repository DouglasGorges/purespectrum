import { getTestBed, TestBed } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { BookService } from 'src/app/service/books-service/book.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ErrorsInterceptor } from './errors-interceptor'

describe('ErrorsInterceptorComponent', () => {
  let injector: TestBed
  let httpMock: HttpTestingController

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BookService,
        { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true }
      ]
    })
    injector = getTestBed()
    httpMock = injector.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should avoid Jasmine Error', () => {
    // Just to avoid class unit test error
  })
})
