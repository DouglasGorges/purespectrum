import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import {
  BookDialogComponent,
  DialogDataType
} from 'src/app/shared/dialog/book-dialog.component'
import { Book } from 'src/app/models/book'
import { ActionType } from '../form-book/book-form.component'
import { BookService } from 'src/app/service/books-service/book.service'
import { Subscription } from 'rxjs'

interface TableColumns {
  columnDef: string
  header: string
  cell: (element: Book) => string
  style: { width: string }
}

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit, OnDestroy {
  dataSource: Book[]
  tableDataSource: MatTableDataSource<Book>

  protected columns: TableColumns[]
  protected displayedColumns: string[]

  private notifierSubscription: Subscription =
    this.bookService.subjectNotifier.subscribe(() => this.loadData())

  constructor (private bookService: BookService, public dialog: MatDialog) {
    this.dataSource = []
    this.displayedColumns = []
    this.tableDataSource = new MatTableDataSource()

    this.columns = [
      {
        columnDef: 'id',
        header: 'No.',
        cell: (element: Book) => `${element.id}`,
        style: { width: '10%' }
      },
      {
        columnDef: 'name',
        header: 'Name',
        cell: (element: Book) => `${element.name}`,
        style: { width: '20%' }
      },
      {
        columnDef: 'year',
        header: 'Year',
        cell: (element: Book) => `${element.year}`,
        style: { width: '10%' }
      },
      {
        columnDef: 'authors',
        header: 'Authors',
        cell: (element: Book) => `${element.authors}`,
        style: { width: '20%' }
      },
      {
        columnDef: 'summary',
        header: 'Summary',
        cell: (element: Book) => `${element.summary}`,
        style: { width: '30%' }
      },
      {
        columnDef: 'actions',
        header: 'Actions',
        cell: () => '',
        style: { width: '10%' }
      }
    ]
  }

  ngOnInit (): void {
    this.renderedColumnsDef()
    this.loadData()
  }

  ngOnDestroy () {
    this.notifierSubscription.unsubscribe()
  }

  private renderedColumnsDef (): void {
    this.displayedColumns = this.columns.map((c) => c.columnDef)
  }

  private loadData (): void {
    this.bookService.getBooks().subscribe((apiResponse) => {
      this.dataSource = apiResponse
      this.tableDataSource = new MatTableDataSource(this.dataSource)
    })
  }

  applyFilter (event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.tableDataSource.filter = filterValue.trim().toLowerCase()
  }

  edit (book: Book): void {
    const dialogData: DialogDataType = {
      book,
      type: { type: 'Update' } as ActionType
    }

    this.dialog.open(BookDialogComponent, {
      data: dialogData
    })
  }

  remove (book: Book): boolean {
    let itWasRemoved = false

    this.bookService.removeBook(book).subscribe((success) => {
      this.loadData()
      itWasRemoved = success
    })

    return itWasRemoved
  }
}
