import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { ShoppingCart } from '../../models/ShoppingCart.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UsersService } from '../users-service/users.service';
import { cartBook } from '../../models/cartBook.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  loggedUserSubscription: Subscription;
  headers = { 'Authorization': "" };

  constructor(private usersService: UsersService, private http: HttpClient) {
    this.loggedUserSubscription = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      if (loggedUser) this.headers.Authorization = `Bearer ${loggedUser.token}`;
    })
  }

  getCart() {
    return this.http.get<ShoppingCart>(`${environment.apiUrl}/ShoppingCart`, { headers: this.headers });
  }

  addBookToCart(bookId: number | string) {
    return this.http.post<void>(`${environment.apiUrl}/ShoppingCart/add-book/${bookId}`, {}, { headers: this.headers })
  }

  removeBookFromCart(bookId: number | string) {
    return this.http.delete<ShoppingCart>(`${environment.apiUrl}/ShoppingCart/remove-book/${bookId}`, { headers: this.headers })
  }

  removeAllBooksFromCart() {
    return this.http.delete<void>(`${environment.apiUrl}/ShoppingCart/remove-all-books`, { headers: this.headers });
  }

  updateBookQuantity(book: Book, newQuantity: number) {
    let bookInCart: cartBook = { book, quantity: newQuantity }
    console.log("sending...");
    console.log(bookInCart);
    return this.http.patch<ShoppingCart>(`${environment.apiUrl}/ShoppingCart/change-quantity`, bookInCart, { headers: this.headers })
  }

  addUserCart(user: User) {
    // this.usersCart.push({
    //   user, books: [], quantity: [], totalPayment: 0
    // })
    // this.updateUsersCart();
  }

  deleteUserCart(user: User) {
    // this.usersCart.splice(
    //   this.usersCart.indexOf(this.usersCart.find((cart) => cart.user.name === user.name)), 1
    // )
    // this.updateUsersCart();
  }

  editUserCart(user: User, category: string, newValue: string) {
    // let userCart = this.usersCart.find((cart) => cart.user.name === user.name);
    // userCart.user[category] = newValue;
    // this.updateUsersCart();
  }

  updateUsersCart() {
    // this.usersCartSubject.next(this.usersCart);
    // localStorage.setItem("usersCart", JSON.stringify(this.usersCart));
  }
}
