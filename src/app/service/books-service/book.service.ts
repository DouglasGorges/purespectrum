import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private apiUrl = `${environment.apiUrl}`;
  subjectNotifier: Subject<null> = new Subject<null>();

  constructor(private http: HttpClient, private toastr: ToastrService) {}
 
  notifyAboutChange() {
    this.subjectNotifier.next(null);
  }

  getBooks(): Observable<Book[]> | undefined {
    return this.http.get<Book[]>(`${this.apiUrl}`, this.httpOptions);
  }

  addBook(book: Book): Observable<Book> | undefined {
    var subject = new Subject<Book>();

    this.http
      .post<Book>(`${this.apiUrl}`, book, this.httpOptions)
      .subscribe((addedBook) => {
        subject.next(addedBook);
        this.toastr.success('New Book Added!');
      });

    return subject.asObservable();
  }

  updateBook(book: Book): Observable<Book> | undefined {
    var subject = new Subject<Book>();

    this.http
      .put<Book>(`${this.apiUrl}${book.id}`, book, this.httpOptions)
      .subscribe((updatedBook) => {
        subject.next(updatedBook);
        this.toastr.success('Book Updated!');
      });

    return subject.asObservable();
  }

  removeBook(book: Book): Observable<boolean> {
    var subject = new Subject<boolean>();

    this.http
      .delete<Book>(`${this.apiUrl}${book.id}`, this.httpOptions)
      .subscribe((success) => {
        subject.next(!!success);
        this.toastr.success('Book Deleted!');
      });

    return subject.asObservable();
  }
}
