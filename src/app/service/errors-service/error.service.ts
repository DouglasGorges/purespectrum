import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private toastr: ToastrService) {}

  public handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      this.toastr.error(
        'An error occurred'.concat(
          err.error.message ? `: ${err.error.message}` : ''
        )
      );
    } else {
      this.toastr.error(
        this.detailExtractor(err),
        `API returned code ${err.status}`
      );
    }
    console.error(err.error);
  }

  private detailExtractor(err: HttpErrorResponse): string {
    return Array.isArray(err.error.detail) ? err.statusText : err.error.detail;
  }
}
