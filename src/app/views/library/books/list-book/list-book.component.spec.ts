import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogModule } from '@angular/material/dialog'
import { ToastrModule } from 'ngx-toastr'

import { ListBookComponent } from './list-book.component'

describe('ListBookComponent', () => {
  let component: ListBookComponent
  let fixture: ComponentFixture<ListBookComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBookComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), MatDialogModule]
    }).compileComponents()

    fixture = TestBed.createComponent(ListBookComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
