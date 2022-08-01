import { Component, Injectable, OnInit } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/service/book.service';
import { EditComponent } from '../edit/edit.component';

interface tableColumns {
  columnDef: string;
  header: string;
  cell: (element: Book) => string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  dataSource: Book[];
  columns: tableColumns[];
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

  private loadData() {
    this.bookService
      .getBooks()
      ?.subscribe((apiResponse) => (this.dataSource = apiResponse));
  }

  edit(book: Book): void {
    this.dialog.open(EditComponent, {
      data: {
        book: book,
      },
    });
  }

  remove(book: Book): void {
    this.bookService.removeBook(book);
  }
}
