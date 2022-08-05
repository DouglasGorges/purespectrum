import { CommonModule } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { ErrorService } from './error.service'

describe('ErrorService', () => {
  let service: ErrorService
  let toastrService: jasmine.SpyObj<ToastrService>

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'success'
    ])

    await TestBed.configureTestingModule({
      imports: [CommonModule, ToastrModule.forRoot()],
      declarations: [],
      providers: [{ provide: ToastrService, useValue: toastrService }]
    }).compileComponents()

    service = TestBed.inject(ErrorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should handle a frontend error', () => {
    service.handleError(
      new HttpErrorResponse({
        error: new ErrorEvent('error')
      })
    )
    expect(toastrService.error).toHaveBeenCalled()
  })

  it('should handle a backend error', () => {
    service.handleError(
      new HttpErrorResponse({
        error: new Error('error')
      })
    )
    expect(toastrService.error).toHaveBeenCalled()
  })
})
