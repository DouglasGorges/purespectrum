import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/service/book.service';

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

  constructor(private bookService: BookService) {
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

  edit(book: Book): void {}

  remove(book: Book): void {
    this.bookService.removeBook(book);
  }
}
