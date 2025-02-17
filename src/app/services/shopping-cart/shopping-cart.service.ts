import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  booksInCart: Book[] = [
    // { name: "לפני החושך", author: "בראד תור", price: 59.90, id: "12345678", image: "../../assets/books-images/לפני החושך.webp" },
    // { name: "לפני החושך", author: "בראד תור", price: 59.90, id: "12345678", image: "../../assets/books-images/לפני החושך.webp" }
  ];
  booksInCartSubject: BehaviorSubject<Book[]> = new BehaviorSubject(this.booksInCart);
  booksInCartObservable: Observable<Book[]> = this.booksInCartSubject.asObservable();

  constructor() { }

  addBookToCart(book: Book) {
    this.booksInCart.push(book);
    this.booksInCartSubject.next(this.booksInCart);
  }

  removeBookFromCart(bookIndex: number) {
    this.booksInCart.splice(bookIndex, 1);
    this.booksInCartSubject.next(this.booksInCart);
  }

  bookExistInCart(book: Book) {
    return this.booksInCart.includes(book);
  }
}
