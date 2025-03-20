import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service/users.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoggedUser } from '../../models/loggedUser.model';
import { UpdatedUser } from '../../models/updatedUser.model';

@Component({
  selector: 'app-user-acount',
  imports: [CommonModule],
  templateUrl: './user-acount.component.html',
  styleUrl: './user-acount.component.scss'
})
export class UserAcountComponent implements OnInit, OnDestroy {

  loggedUser: LoggedUser;
  loggedUserSub: Subscription;
  editIconClicked = {
    "name": false,
    "email": false,
    "password": false
  }

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.loggedUserSub = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })
  }

  ngOnDestroy(): void {
    this.loggedUserSub.unsubscribe();
  }

  isAdmin() {
    return this.loggedUser?.role == "Admin";
  }

  onEditIconClicked(field: string) {
    this.editIconClicked[field] = !this.editIconClicked[field];
  }

  onEnterNewValue(category: string, event) {
    this.usersService.setUserField(category, event.target.value as string);
    this.onEditIconClicked(category);
  }

  onDeleteAccountButtonClicked() {
    this.usersService.deleteUser().subscribe({
      next: () => {
        this.usersService.logout();
        this.router.navigate(["/all-books"]);
      },
      error: (err) => { console.log(err) }
    })
  }
}
