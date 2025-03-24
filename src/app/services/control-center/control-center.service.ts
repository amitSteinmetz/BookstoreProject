import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewBook } from '../../models/newBook.model';
import { environment } from '../../../environments/environment';
import { UsersService } from '../users-service/users.service';
import { Subscription } from 'rxjs';
import { LoggedUser } from '../../models/loggedUser.model';

@Injectable({
  providedIn: 'root'
})
export class ControlCenterService {
  // loggedUserSubscription: Subscription;

  constructor(private usersService: UsersService, private http: HttpClient) {
    // this.loggedUserSubscription = this.usersService.loggedUserObs.subscribe((loggedUser) => {
    //   if (loggedUser) this.headers.Authorization = `Bearer ${loggedUser.token}`;
    // })
  }

  createBook(newBook: NewBook) {
    return this.http.post<void>(`${environment.apiUrl}/ControlCenter/create-book`,
      newBook, { headers: this.getHeaders() });
  }

  getHeaders() {
    let loggedUser: LoggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    return { 'Authorization': loggedUser.token }
  }
}
