import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import {
  BookDialogComponent,
  DialogDataType
} from 'src/app/shared/dialog/book-dialog.component'
import { ActionType } from '../form-book/book-form.component'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  constructor (public dialog: MatDialog) {}

  addBook (): void {
    const dialogData: DialogDataType = {
      book: undefined,
      type: { type: 'Add' } as ActionType
    }

    this.dialog.open(BookDialogComponent, {
      data: dialogData
    })
  }
}
