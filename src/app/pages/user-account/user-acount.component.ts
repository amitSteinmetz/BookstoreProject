import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service/users.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-acount',
  imports: [CommonModule],
  templateUrl: './user-acount.component.html',
  styleUrl: './user-acount.component.scss'
})
export class UserAcountComponent implements OnInit, OnDestroy {
  admin: User;
  adminSub: Subscription;
  loggedUser: User;
  loggedUserSub: Subscription;
  editIconClicked = {
    "username": false,
    "email": false,
    "password": false
  }

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
      this.loggedUserSub = this.usersService.loggedUserObs.subscribe((loggedUser) => {
        this.loggedUser = loggedUser;
      })

      this.adminSub = this.usersService.adminObs.subscribe((admin) => {
        this.admin = admin;
      })
  }

  ngOnDestroy(): void {
      this.loggedUserSub.unsubscribe();
      this.adminSub.unsubscribe();
  }

  onEditIconClicked(field) {
    this.editIconClicked[field] = !this.editIconClicked[field];
  }

  onEnterNewValue(category: string, event) {
    this.usersService.changeUserField(category, event.target.value);
  }

  onDeleteAccountButtonClicked() {
    let userToDelete: User = this.usersService.users.find((user) => user.name === this.loggedUser.name);
    this.usersService.deleteUser(userToDelete);
    this.router.navigate(["/all-books"]);
  }
}
