import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component'
import { LoginComponent } from './views/login/login.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ToastrModule } from 'ngx-toastr'

import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSortModule } from '@angular/material/sort'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { BookDialogComponent } from './shared/dialog/book-dialog.component'

import { LibraryComponent } from './views/library/library.component'
import { AddBookComponent } from './views/library/books/add-book/add-book.component'
import { ListBookComponent } from './views/library/books/list-book/list-book.component'
import { BookFormComponent } from './views/library/books/form-book/book-form.component'
import { ErrorsInterceptor } from './interceptors/errors-interceptor/errors-interceptor'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddBookComponent,
    LibraryComponent,
    ListBookComponent,
    BookFormComponent,
    BookDialogComponent
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
    MatSortModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatProgressBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
