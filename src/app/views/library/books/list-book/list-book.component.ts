import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription, timer } from 'rxjs'
import {
  BookDialogComponent,
  DialogDataType
} from 'src/app/shared/dialog/book-dialog.component'
import { Book } from 'src/app/models/book'
import { ActionType } from '../form-book/book-form.component'
import { BookService } from 'src/app/service/books-service/book.service'

// Data structure who we'll sendo to Table List
interface TableColumns {
  columnDef: string
  header: string
  cell: (element: Book) => string
  style: { width: string }
}

// Data sended to Table List
const DATA_TABLE_CONF = [
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

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit, OnDestroy {
  tableDataSource: MatTableDataSource<Book>

  protected columns: TableColumns[]
  protected displayedColumns: string[]
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  // This is a subscription to listen data changes and refresh the Table List
  private notifierSubscription: Subscription

  constructor (private bookService: BookService, public dialog: MatDialog) {
    this.displayedColumns = []
    this.columns = DATA_TABLE_CONF
    this.tableDataSource = new MatTableDataSource()

    this.notifierSubscription = this.bookService.subjectNotifier.subscribe(() =>
      // We do not know why but, without the timer, sometimes the list wasn't reloaded
      timer(500).subscribe(() => {
        this.loadData()
      })
    )
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
      this.tableDataSource = new MatTableDataSource<Book>(apiResponse)
      this.applyPaginatorAndSort()
    })
  }

  private applyPaginatorAndSort () {
    this.tableDataSource.paginator = this.paginator
    this.tableDataSource.sort = this.sort
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
      data: dialogData,
      maxHeight: '90vh'
    })
  }

  remove (book: Book): boolean {
    let itWasRemoved = false

    // if (confirm(`Are you sure to delete ${book.name}, ${book.year}?`)) {
    this.bookService.removeBook(book).subscribe((success) => {
      this.loadData()
      itWasRemoved = success
    })
    // }

    return itWasRemoved
  }
}
