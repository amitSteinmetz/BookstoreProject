import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) { }

  getAllBooks() {
    return this.http.get<Book[]>(`${environment.apiUrl}/Books`);
  }

  getBookById(bookId) {
    return this.http.get<Book>(`${environment.apiUrl}/Books/${bookId}`);
  }

  getBooksByQuery(query: string) {
    return this.http.get<Book[]>(`${environment.apiUrl}/Books/${query}`);
  }
}


