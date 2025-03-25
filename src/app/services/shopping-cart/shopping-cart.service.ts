import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';
import { ShoppingCart } from '../../models/ShoppingCart.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { cartBook } from '../../models/cartBook.model';
import { LoggedUser } from '../../models/loggedUser.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    let loggedUser: LoggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    return { 'Authorization': "Bearer " + loggedUser.token }
  }

  getCart() {
    return this.http.get<ShoppingCart>(`${environment.apiUrl}/ShoppingCart`, { headers: this.getHeaders() });
  }

  addBookToCart(bookId: number | string) {
    return this.http.post<void>(`${environment.apiUrl}/ShoppingCart/add-book/${bookId}`, {}, { headers: this.getHeaders() })
  }

  removeBookFromCart(bookId: number | string) {
    return this.http.delete<ShoppingCart>(`${environment.apiUrl}/ShoppingCart/remove-book/${bookId}`, { headers: this.getHeaders() })
  }

  removeAllBooksFromCart() {
    return this.http.delete<void>(`${environment.apiUrl}/ShoppingCart/remove-all-books`, { headers: this.getHeaders() });
  }

  updateBookQuantity(book: Book, newQuantity: number) {
    let bookInCart: cartBook = { book, quantity: newQuantity }

    return this.http.patch<ShoppingCart>(`${environment.apiUrl}/ShoppingCart/change-quantity`,
      bookInCart, { headers: this.getHeaders() })
  }
}
