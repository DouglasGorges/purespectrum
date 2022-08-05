import { TestBed } from '@angular/core/testing'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ToastrService } from 'ngx-toastr'
import { ErrorsInterceptor } from './errors-interceptor'
import { BookService } from 'src/app/service/books-service/book.service'

describe('ErrorsInterceptorComponent', () => {
  let httpService: BookService
  let toastrService: jasmine.SpyObj<ToastrService>

  beforeEach(() => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error'
    ])

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BookService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorsInterceptor,
          multi: true
        },
        { provide: ToastrService, useValue: toastrService }
      ]
    })
    httpService = TestBed.inject(BookService)
  })

  it('should triggered the interceptor', () => {
    const interceptorSpy = jasmine.createSpyObj<ErrorsInterceptor>({
      intercept: undefined,
      handleError: undefined
    })

    httpService.getBooks().subscribe((booksList) => {
      expect(booksList).toBeTruthy()
      expect(interceptorSpy).toHaveBeenCalled()
    })
  })
})
