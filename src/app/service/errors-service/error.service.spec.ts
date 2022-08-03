import { CommonModule } from '@angular/common'
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

    TestBed.configureTestingModule({})
    service = TestBed.inject(ErrorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
