import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { ErrorService } from '../../service/errors-service/error.service'

// Interceptor for every Http call.
// This check if the Response send a Error and will call the ErrorService to handle with
@Injectable()
export class ErrorsInterceptor extends ErrorService implements HttpInterceptor {
  public intercept (
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return new Observable((observer) => {
      next.handle(req).subscribe({
        next: (res) => observer.next(res),
        error: (err) => super.handleError(err)
      })
    })
  }
}
