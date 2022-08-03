import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './views/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LibraryComponent } from './views/library/library.component';
import { BookDialogComponent } from './shared/dialog/dialog.component';
import { AddBookComponent } from './views/library/books/add-book/add-book.component';
import { ListBookComponent } from './views/library/books/list-book/list-book.component';
import { BookFormComponent } from './views/library/books/form-book/book-form.component';
import { ErrorsInterceptor } from './interceptors/errors-interceptor/errors-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddBookComponent,
    LibraryComponent,
    ListBookComponent,
    BookFormComponent,
    BookDialogComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot(),

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
