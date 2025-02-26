import { Injectable, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Cart } from '../../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  usersCart: Cart[] = JSON.parse(localStorage.getItem("usersCart")) || [];
  usersCartSubject: BehaviorSubject<Cart[]> = new BehaviorSubject(this.usersCart);
  usersCartObservable: Observable<Cart[]> = this.usersCartSubject.asObservable();

  addBookToCart(user: User, book: Book) {
    let userCart = this.usersCart.find((cart) => cart.user.name === user.name);

    userCart.books.push(book);
    userCart.quantity.push(1);
    userCart.totalPayment = Number(userCart.totalPayment) + book.price;

    this.updateUsersCart();
  }

  removeBookFromCart(user: User, bookIndex: number) {
    let userCart = this.usersCart.find((cart) => cart.user.name === user.name);

    console.log(Number(userCart.totalPayment))
    console.log( (Number(userCart.quantity[bookIndex]) * Number(userCart.books.at(bookIndex).price)))

    userCart.totalPayment = Number(userCart.totalPayment) -
    (Number(userCart.quantity[bookIndex]) * Number(userCart.books.at(bookIndex).price));
    userCart.books.splice(bookIndex, 1);
    userCart.quantity.splice(bookIndex, 1);

    this.updateUsersCart();
  }

  bookExistInCart(user: User, book: Book) {
    return this.usersCart.find((cart) => cart.user.name === user.name)?.books.includes(book);
  }

  updateBookQuantity(userCart: Cart, bookIndex: number, newQuantity: number) {
    let cart = this.usersCart.find((cart) => cart.user.name === userCart.user.name);

    cart.totalPayment = Number(cart.totalPayment) + ((cart.books.at(bookIndex).price * newQuantity) -
      cart.books.at(bookIndex).price * Number(cart.quantity[bookIndex]));

    cart.quantity[bookIndex] = newQuantity;

    this.updateUsersCart();
  }

  addUserCart(user: User) {
    this.usersCart.push({
      user, books: [], quantity: [], totalPayment: 0
    })
    this.updateUsersCart();
  }

  deleteUserCart(user: User) {
    this.usersCart.splice(
      this.usersCart.indexOf(this.usersCart.find((cart) => cart.user.name === user.name)), 1
    )
    this.updateUsersCart();
  }

  editUserCart(user: User, category: string, newValue: string) {
    let userCart = this.usersCart.find((cart) => cart.user.name === user.name);
    userCart.user[category] = newValue;
    this.updateUsersCart();
  }

  updateUsersCart() {
    this.usersCartSubject.next(this.usersCart);
    localStorage.setItem("usersCart", JSON.stringify(this.usersCart));
  }
}
