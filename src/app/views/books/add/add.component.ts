import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  formAddBook!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm(new Book());
  }

  private createForm(book: Book): void {
    this.formAddBook = this.formBuilder.group({
      name: [book.name, Validators.required],
      year: [book.year, Validators.required],
      authors: [book.authors, Validators.required],
      summary: [book.summary, Validators.required],
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (!this.formAddBook.valid) return;

    console.log(this.formAddBook.value);

    formDirective.resetForm();
    this.formAddBook.reset();
  }

  getErrorMessage(): string {
    return 'You must enter a value';
  }
}
