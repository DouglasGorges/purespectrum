import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorService } from '../errors-service/error.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return new Observable((observer) => {
      next.handle(req).subscribe({
        next: (res) => observer.next(res),
        error: (err) => this.errorService.handleError(err),
      });
    });
  }
}
