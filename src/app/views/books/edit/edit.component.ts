import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { ActionType } from '../add/add.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  book: Book | undefined;
  componentType: ActionType = {type: 'Update'}

  constructor(@Inject(MAT_DIALOG_DATA) public _data: any) {}

  ngOnInit(): void {
    this.book = this._data.book as Book;
  }
}
