import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [
    { name: "amit", email: "amitstein@gmail.com", password: "199288377" }
  ]

  usersSub: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
  usersObs: Observable<User[]> = this.usersSub.asObservable();

  loggedUser: User = null;
  loggedUserSub: BehaviorSubject<User> = new BehaviorSubject<User>(this.loggedUser);
  loggedUserObs: Observable<User> = this.loggedUserSub.asObservable();

  admin: User = {
    name: "amit", email: "amitstein@gmail.com", password: "199288377"
  } 
  adminSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.admin);
  adminObs: Observable<User> = this.adminSubject.asObservable();

  constructor() { }

  addUser(user: User) {
    this.users.push(user);
    this.usersSub.next(this.users);
  }

  updateCurrentUser(userName: string) {
    this.loggedUser = this.users.find((user) => user.name === userName);
    this.loggedUserSub.next(this.loggedUser);
  }

  changeUserField(category: string, newValue: string) {
    this.users.find((user) => user.name === this.loggedUser.name)[category] = newValue;

    this.loggedUser[category] = newValue;
    this.loggedUserSub.next(this.loggedUser);
  }

  logout() {
    this.loggedUser = null;
    this.loggedUserSub.next(this.loggedUser);
  }

  deleteUser(user: User) {
    this.users.splice(this.users.indexOf(user, 1));
    this.usersSub.next(this.users);
    this.logout();
  }

  changeAdminDetails() {

  }

  switchAdmin() {
    
  }
}
