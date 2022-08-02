import { Component, Injectable, OnInit } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/service/books-service/book.service';
import {
  BookDialogComponent,
  DialogDataType,
} from 'src/app/shared/dialog/dialog.component';
import { ActionType } from '../form-book/book-form.component';

interface TableColumns {
  columnDef: string;
  header: string;
  cell: (element: Book) => string;
}
@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css'],
})
export class ListBookComponent implements OnInit {
  dataSource: Book[];
  columns: TableColumns[];
  displayedColumns: string[];

  constructor(private bookService: BookService, public dialog: MatDialog) {
    this.dataSource = [];
    this.displayedColumns = [];

    this.columns = [
      {
        columnDef: 'id',
        header: 'No.',
        cell: (element: Book) => `${element.id}`,
      },
      {
        columnDef: 'name',
        header: 'Name',
        cell: (element: Book) => `${element.name}`,
      },
      {
        columnDef: 'year',
        header: 'Year',
        cell: (element: Book) => `${element.year}`,
      },
      {
        columnDef: 'authors',
        header: 'Authors',
        cell: (element: Book) => `${element.authors}`,
      },
      {
        columnDef: 'summary',
        header: 'Summary',
        cell: (element: Book) => `${element.summary}`,
      },
    ];
  }

  ngOnInit(): void {
    this.renderedColumnsDef();
    this.loadData();
  }

  private renderedColumnsDef(): void {
    this.displayedColumns = this.columns.map((c) => c.columnDef);
    this.displayedColumns.push('actions');
  }

  loadData() {
    this.bookService
      .getBooks()
      ?.subscribe((apiResponse) => (this.dataSource = apiResponse));
  }

  edit(book: Book): void {
    const actionType: ActionType = { type: 'Update' };
    const dialogData: DialogDataType = { book: book, type: actionType };

    this.dialog
      .open(BookDialogComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  remove(book: Book): void {
    this.bookService.removeBook(book).subscribe(() => {
      this.loadData();
    });
  }
}
