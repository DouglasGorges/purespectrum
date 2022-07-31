import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private apiUrl =
    'https://publishing-house-service.herokuapp.com/api/v1/books/';

  constructor(private http: HttpClient) {}

  async getBooks(): Promise<Book[] | undefined> {
    try {
      return lastValueFrom(this.http.get<Book[]>(`${this.apiUrl}`));
    } catch (error) {
      throw new Error('Cannot get Books List');
    }
  }

  addBook(book: Book): Observable<Book> {
    try {
      return this.http.post<Book>(`${this.apiUrl}`, book, this.httpOptions);
    } catch (error) {
      throw new Error('Cannot get Books List');
    }
  }
}
