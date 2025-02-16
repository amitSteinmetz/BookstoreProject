import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  booksInCart: Book[] = [];
  booksInCartSubject: BehaviorSubject<Book[]> = new BehaviorSubject(this.booksInCart);
  booksInCartObservable: Observable<Book[]> = this.booksInCartSubject.asObservable();

  constructor() { }

  addBookToCart(book: Book) {
    this.booksInCart.push(book);
    this.booksInCartSubject.next(this.booksInCart);
  }
}
