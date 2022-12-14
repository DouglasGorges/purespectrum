import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Book } from 'src/app/models/book'
import { ActionType } from 'src/app/views/library/books/form-book/book-form.component'

export interface DialogDataType {
  book: Book | undefined
  type: ActionType
}

@Component({
  selector: 'app-dialog',
  templateUrl: './book-dialog.component.html'
})
export class BookDialogComponent implements OnInit {
  book: Book | undefined
  componentType?: ActionType

  constructor (@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit (): void {
    this.book = this.data.book as Book
    this.componentType = this.data.type as ActionType
  }
}
