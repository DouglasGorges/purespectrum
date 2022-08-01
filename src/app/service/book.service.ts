import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom, Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl =
    'https://publishing-house-service.herokuapp.com/api/v1/books/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getBooks(): Observable<Book[]> | undefined {
    try {
      return this.http.get<Book[]>(`${this.apiUrl}`, this.httpOptions);
    } catch (error) {
      this.toastr.error((error as Error).message);
      return undefined;
    }
  }

  addBook(book: Book): Observable<Book> | undefined {
    try {
      const apiResponse = this.http.post<Book>(
        `${this.apiUrl}`,
        book,
        this.httpOptions
      );

      apiResponse.subscribe(() => {
        this.toastr.success('New Book Added!');
      });

      return apiResponse;
    } catch (error) {
      this.toastr.error((error as Error).message);
      return undefined;
    }
  }

  removeBook(book: Book): void {
    try {
      const apiResponse = this.http.delete<Book>(
        `${this.apiUrl}${book.id}`,
        this.httpOptions
      );

      apiResponse.subscribe(() => {
        this.toastr.success('Book deleted!');
      });
    } catch (error) {
      this.toastr.error((error as Error).message);
    }
  }
}
