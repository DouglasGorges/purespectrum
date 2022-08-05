import { Component, Input, OnInit } from '@angular/core'
import {
  AbstractControl,
  DefaultValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators
} from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Book } from 'src/app/models/book'
import { BookService } from 'src/app/service/books-service/book.service'

export interface ActionType {
  type: 'Add' | 'Update'
}

// FormArray validator
function validateNotEmpty (array: AbstractControl) {
  return (array as FormArray).length
    ? null
    : {
        invalidSize: true
      }
}

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() book?: Book
  @Input() type?: ActionType

  formBook!: FormGroup
  newAuthor: FormControl<string | null> = new FormControl<string>('')

  constructor (
    public formBuilder: FormBuilder,
    private bookService: BookService,
    public dialog: MatDialog
  ) {}

  ngOnInit (): void {
    this.createForm(this.book || new Book())
    if (!this.type) this.type = { type: 'Add' }

    this.applyAutoTrimToFormInputs()
  }

  // This will trim every input values on the Form
  private applyAutoTrimToFormInputs (): void {
    const original = DefaultValueAccessor.prototype.registerOnChange
    DefaultValueAccessor.prototype.registerOnChange = function (fn) {
      return original.call(this, (value) => {
        const trimmed = typeof value === 'string' ? value.trim() : value
        return fn(trimmed)
      })
    }
  }

  private createForm (book: Book): void {
    if (!this.book) book = new Book()

    this.formBook = this.formBuilder.group({
      id: [book.id],
      name: [book.name, Validators.required],
      year: [book.year, Validators.required],
      authors: new FormArray([], validateNotEmpty),
      summary: [book.summary, Validators.required]
    })

    // If we have data coming will be set on FormArray by loop
    if (book.authors) {
      for (const author of book.authors) {
        this.authors.push(new FormControl(author, Validators.required))
      }
    }
  }

  addAuthor (): void {
    if (!this.newAuthor.value) return

    this.authors.insert(
      0,
      new FormControl(this.newAuthor.value, [Validators.required])
    )

    this.newAuthor = new FormControl<string>('')
  }

  removeAuthor (index: number): void {
    this.authors.removeAt(index)
  }

  get authors (): FormArray<any> {
    return this.formBook.get('authors') as FormArray
  }

  onSubmit (formDirective: FormGroupDirective): void {
    if (!this.formBook.valid) return

    if (this.isNewBook(this.book)) {
      this.bookService.addBook(this.formBook.value).subscribe(() => {
        this.clearForm(formDirective)
      })
    } else {
      this.bookService.updateBook(this.formBook.value)
    }
    this.notifyForChange()
  }

  private clearForm (formDirective: FormGroupDirective): void {
    formDirective.resetForm()
    this.authors.clear()
    this.formBook.reset()
  }

  private isNewBook (book: Book | undefined): boolean {
    return !book?.id
  }

  get errorMessage (): string {
    return 'You must enter a value'
  }

  protected closeDialog (): void {
    this.dialog.closeAll()
  }

  private notifyForChange () {
    this.bookService.notifyAboutChange()
  }
}
