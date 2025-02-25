import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  booksInCart: Book[] = [];
  booksInCartSubject: BehaviorSubject<Book[]> = new BehaviorSubject(
    JSON.parse(localStorage.getItem("booksInCart")) || []
  );
  booksInCartObservable: Observable<Book[]> = this.booksInCartSubject.asObservable();

  addBookToCart(book: Book) {
    this.booksInCart.push(book);
    this.updateBooksIncart();
  }

  removeBookFromCart(bookIndex: number) {
    this.booksInCart.splice(bookIndex, 1);
    this.updateBooksIncart();
  }

  bookExistInCart(book: Book) {
    return this.booksInCart.includes(book);
  }

  updateBooksIncart() {
    this.booksInCartSubject.next(this.booksInCart);
    localStorage.setItem("booksInCart", JSON.stringify(this.booksInCart));
  }
}
