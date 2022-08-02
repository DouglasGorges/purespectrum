import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/service/books-service/book.service';

export interface ActionType {
  type: 'Add' | 'Update';
}

function validateNotEmpty(arr: AbstractControl) {
  return (arr as FormArray).length
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

  formBook!: FormGroup;
  newAuthor: FormControl<string | null> = new FormControl<string>('');

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm(this.book || new Book());
    if (!this.type) this.type = { type: 'Add' };
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

  addAuthor() {
    (this.formBook.get('authors') as FormArray).insert(
      0,
      new FormControl(this.newAuthor.value, [Validators.required])
    );
  }

  removeAuthor(index: number): void {
    (this.formBook.get('authors') as FormArray).removeAt(index);
  }

  get authors() {
    return this.formBook.get('authors') as FormArray;
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (!this.formBook.valid) return;

    if (this.isNewBook(this.book)) {
      this.bookService.addBook(this.formBook.value)?.subscribe(() => {
        this.clearForm(formDirective);
      });
    } else {
      this.bookService.updateBook(this.formBook.value)?.subscribe(() => {});
    }
  }

  private clearForm(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.authors.clear();
    this.formBook.reset();
  }

  isNewBook(book: Book | undefined) {
    return !book?.id;
  }

  get errorMessage(): string {
    return 'You must enter a value';
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
