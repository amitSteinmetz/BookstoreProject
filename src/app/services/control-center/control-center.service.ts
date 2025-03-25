import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewBook } from '../../models/newBook.model';
import { environment } from '../../../environments/environment';
import { LoggedUser } from '../../models/loggedUser.model';
import { Book } from '../../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class ControlCenterService {

  constructor(private http: HttpClient) { }

  createBook(newBook: NewBook) {
    return this.http.post<void>(`${environment.apiUrl}/ControlCenter/create-book`,
      newBook, { headers: this.getHeaders() });
  }

  deleteBook(bookId: number) {
    return this.http.delete<Book[]>(`${environment.apiUrl}/ControlCenter/delete-book/${bookId}`,
      { headers: this.getHeaders() });
  }

  updateBookPrice(book: Book) {
    return this.http.patch<Book[]>(`${environment.apiUrl}/ControlCenter/update-book-price/${book.id}`,
      book, { headers: this.getHeaders() });
  }

  getHeaders() {
    let loggedUser: LoggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    return { 'Authorization': "Bearer " + loggedUser.token }
  }
}
