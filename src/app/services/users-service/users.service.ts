import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Signup } from '../../models/signup.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Login } from '../../models/login.model';
import { LoggedUser } from '../../models/loggedUser.model';
import { Router } from '@angular/router';
import { UpdatedUser } from '../../models/updatedUser.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  loggedUserSub: BehaviorSubject<LoggedUser> = new BehaviorSubject(
    JSON.parse(localStorage.getItem('loggedUser') || null)
  );
  loggedUserObs: Observable<LoggedUser> = this.loggedUserSub.asObservable();

  constructor(private http: HttpClient, private route: Router) { }

  signup(signupModel: Signup) {
    return this.http.post<string>(`${environment.apiUrl}/Account/signup`, signupModel)
  }

  login(loginModel: Login) {
    return this.http.post<LoggedUser>(`${environment.apiUrl}/Account/login`, loginModel).pipe(
      tap((loggedUser) => {
        if (this.route.url !== "/admin" && loggedUser.role === "Admin") {
          throw new Error("כניסה למשתמשים רגילים בלבד")
        }
        else if (this.route.url === "/admin" && loggedUser.role !== "Admin") {
          throw new Error("כניסה למנהלים בלבד")
        }

        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        this.loggedUserSub.next(loggedUser);
      })
    )
  }

  logout() {
    localStorage.setItem('loggedUser', null);
    this.loggedUserSub.next(null);
  }

  setUserField(category: string, newValue: string) {
    const methodName: string = `set-${category}`;
    const headers = { 'Authorization': `Bearer ${this.loggedUserSub.value.token}` };

    let updatedUser: UpdatedUser = {
      name: this.loggedUserSub.value.name,
      email: this.loggedUserSub.value.email,
      password: ""
    }
    updatedUser[category] = newValue;

    return this.http.patch<UpdatedUser>(`${environment.apiUrl}/Account/${methodName}`, updatedUser, { headers }).subscribe({
      next: (updatedUser) => {
        console.log("request successeded")
        if (category !== "password") {
          const loggedUser: LoggedUser = JSON.parse(localStorage.getItem('loggedUser'));
          loggedUser[category] = updatedUser[category];
          localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
          this.loggedUserSub.next(loggedUser);
        }
      },
      error: (err) => { console.log(err) }
    })
  }

  deleteUser() {
    const headers = { 'Authorization': `Bearer ${this.loggedUserSub.value.token}` };
    return this.http.delete<void>(`${environment.apiUrl}/Account`, { headers })
  }
}
