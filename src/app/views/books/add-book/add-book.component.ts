import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BookDialogComponent,
  DialogDataType,
} from 'src/app/shared/dialog/dialog.component';
import { ActionType } from '../form-book/book-form.component';
import { ListBookComponent } from '../list-book/list-book.component';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  constructor(public dialog: MatDialog) {}

  addBook() {
    const actionType: ActionType = { type: 'Add' };
    const dialogData: DialogDataType = { book: undefined, type: actionType };

    this.dialog
      .open(BookDialogComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe(() => window.location.reload()); //TODO: Melhorar essa att do componente
  }
}
