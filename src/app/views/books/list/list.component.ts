import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().then((response) =>{
      // console.log(response)
    })
  }

}
