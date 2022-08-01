import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/service/book.service';
import { ListBookComponent } from '../list-book/list-book.component';

export interface ActionType {
  type: 'Add' | 'Update';
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

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private listBooks: ListBookComponent,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm(this.book || new Book());
    if (!this.type) this.type = { type: 'Add' };
  }

  private createForm(book: Book): void {
    if (!this.book) book = new Book();

    this.formBook = this.formBuilder.group({
      name: [book.name, Validators.required],
      year: [book.year, Validators.required],
      authors: [book.authors, Validators.required],
      // authors: new FormBuilder().array([
      //   new FormGroup({
      //     authors: new FormControl(book.authors)
      //   }),
      // ]),
      summary: [book.summary, Validators.required],
      id: [book.id]
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (!this.formBook.valid) return;

    this.formBook.value.authors = this.stringToArray(
      this.formBook.value.authors as string
    ); //TODO: remover isso e usar array no FormBUilder

    if (this.isNewBook(this.book)) {
      this.bookService.addBook(this.formBook.value)?.subscribe(() => {
        formDirective.resetForm();
        this.formBook.reset();
      });
    } else {
      this.bookService.updateBook(this.formBook.value)?.subscribe(() => {});
    }
  }

  isNewBook(book: Book | undefined) {
    return !book?.id;
  }

  private stringToArray(arg: string | number): string[] {
    arg = arg.toString();
    return arg
      .split(',')
      .map((item) => {
        return item.trim();
      })
      .filter((e) => e);
  }

  getErrorMessage(): string {
    return 'You must enter a value';
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
