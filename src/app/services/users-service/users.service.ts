import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = JSON.parse(localStorage.getItem("users")) || [];

  usersSub: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
  usersObs: Observable<User[]> = this.usersSub.asObservable();

  loggedUser: User = JSON.parse(localStorage.getItem("loggedUser")) || null;
  loggedUserSub: BehaviorSubject<User> = new BehaviorSubject<User>(this.loggedUser);
  loggedUserObs: Observable<User> = this.loggedUserSub.asObservable();

  admin: User = JSON.parse(localStorage.getItem("admin")) || {
    name: "amit", email: "amitstein@gmail.com", password: "199288377"
  }
  adminSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.admin);
  adminObs: Observable<User> = this.adminSubject.asObservable();

  constructor(private shoppingCartService: ShoppingCartService) { }

  addUser(user: User) {
    this.users.push(user);
    this.usersSub.next(this.users);
    localStorage.setItem("users", JSON.stringify(this.users));
    this.shoppingCartService.addUserCart(user);
  }

  updateCurrentUser(userName: string) {
    this.loggedUser = (this.admin.name === userName) ?
      this.admin : this.users.find((user) => user.name === userName);

    this.updateLoggedUser();
  }

  changeUserField(category: string, newValue: string) {
    if (this.loggedUser.name === this.admin.name) {
      this.admin[category] = newValue;
      this.adminSubject.next(this.admin);
      localStorage.setItem("admin", JSON.stringify(this.admin));
    }
    else {
      this.users.find((user) => user.name === this.loggedUser.name)[category] = newValue;

    }

    this.updateLoggedUser();
    this.shoppingCartService.editUserCart(this.loggedUser, category, newValue);
  }

  logout() {
    this.loggedUser = null;
    this.updateLoggedUser();
  }

  deleteUser(user: User) {
    this.users.splice(this.users.indexOf(user, 1));
    this.usersSub.next(this.users);
    localStorage.setItem("users", JSON.stringify(this.users));
    this.logout();
  }

  updateLoggedUser() {
    this.loggedUserSub.next(this.loggedUser);
    localStorage.setItem("loggedUser", JSON.stringify(this.loggedUser));
  }
}
