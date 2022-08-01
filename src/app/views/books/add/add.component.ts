import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/service/book.service';
import { ListComponent } from '../list/list.component';

export interface ActionType {
  type: 'Add' | 'Update';
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  //TODO: Rename to BookComponent
  @Input() type: ActionType | undefined;
  formAddBook!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm(new Book());
  }

  private createForm(book: Book): void {
    this.formAddBook = this.formBuilder.group({
      name: [book.name, Validators.required],
      year: [book.year, Validators.required],
      authors: [book.authors, Validators.required],
      // authors: new FormBuilder().array([
      //   new FormGroup({
      //     authors: new FormControl(book.authors)
      //   }),
      // ]),
      summary: [book.summary, Validators.required],
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (!this.formAddBook.valid) return;

    this.formAddBook.value.authors = this.stringToArray(
      this.formAddBook.value.authors as String
    ); //TODO: remover isso e usar array no FormBUilder

    this.bookService.addBook(this.formAddBook.value)?.subscribe(() => {
      formDirective.resetForm();
      this.formAddBook.reset();
    });
  }

  private stringToArray(arg: String): string[] {
    return arg.split(',').map((item) => {
      return item.trim();
    });
  }

  getErrorMessage(): string {
    return 'You must enter a value';
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
