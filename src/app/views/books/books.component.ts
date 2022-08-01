import { Component, OnInit } from '@angular/core';
import { ActionType } from './add/add.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  componentType: ActionType = {type: 'Add'}
  
  constructor() { }

  ngOnInit(): void {
  }

}
