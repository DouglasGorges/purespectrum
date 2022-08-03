import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  DefaultValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/service/books-service/book.service';

export interface ActionType {
  type: 'Add' | 'Update';
}

function validateNotEmpty(array: AbstractControl) {
  return (array as FormArray).length
    ? null
    : {
        invalidSize: true,
      };
}

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  @Input() book?: Book;
  @Input() type?: ActionType;

  protected formBook!: FormGroup;
  protected newAuthor: FormControl<string | null> = new FormControl<string>('');

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm(this.book || new Book());
    if (!this.type) this.type = { type: 'Add' };

    this.defineAutoTrimToFormInputs();
  }

  private defineAutoTrimToFormInputs(): void {
    const original = DefaultValueAccessor.prototype.registerOnChange;
    DefaultValueAccessor.prototype.registerOnChange = function (fn) {
      return original.call(this, (value) => {
        const trimmed = typeof value === 'string' ? value.trim() : value;
        return fn(trimmed);
      });
    };
  }

  private createForm(book: Book): void {
    if (!this.book) book = new Book();

    this.formBook = this.formBuilder.group({
      id: [book.id],
      name: [book.name, Validators.required],
      year: [book.year, Validators.required],
      authors: new FormArray([], validateNotEmpty),
      summary: [book.summary, Validators.required],
    });

    if (book.authors) {
      for (const author of book.authors) {
        (this.formBook.get('authors') as FormArray).push(
          new FormControl(author, Validators.required)
        );
      }
    }
  }

  protected addAuthor(): void {
    (this.formBook.get('authors') as FormArray).insert(
      0,
      new FormControl(this.newAuthor.value, [Validators.required])
    );
    this.newAuthor = new FormControl<string>('');
  }

  protected removeAuthor(index: number): void {
    (this.formBook.get('authors') as FormArray).removeAt(index);
  }

  get authors(): FormArray<any> {
    return this.formBook.get('authors') as FormArray;
  }

  protected onSubmit(formDirective: FormGroupDirective): void {
    if (!this.formBook.valid) return;

    if (this.isNewBook(this.book)) {
      this.bookService.addBook(this.formBook.value)?.subscribe(() => {
        this.clearForm(formDirective);
      });
    } else {
      this.bookService.updateBook(this.formBook.value);
    }
    this.notifyForChange();
  }

  private clearForm(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.authors.clear();
    this.formBook.reset();
  }

  private isNewBook(book: Book | undefined): boolean {
    return !book?.id;
  }

  get errorMessage(): string {
    return 'You must enter a value';
  }

  protected closeDialog(): void {
    this.dialog.closeAll();
  }

  private notifyForChange() {
    this.bookService.notifyAboutChange();
  }
}
