import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service/users.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoggedUser } from '../../models/loggedUser.model';

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
  invalidFields = {
    emailFormat: false,
    emailTaken: false,
    passwordFormat: false,
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

  isValidEmailFormat(email: string) {
    return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
  }

  isValidPasswordFormat(password: string) {
    return (/^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/.test(password))
  }

  onEditIconClicked(field: string) {
    this.editIconClicked[field] = !this.editIconClicked[field];
  }

  onEnterNewValue(category: string, event) {
    const newValue = event.target.value as string;

    if (category === "email" && !this.isValidEmailFormat(newValue)) {
      this.invalidFields.emailFormat = true;
    }
    else if (category === "password" && !this.isValidPasswordFormat(newValue)) {
      this.invalidFields.passwordFormat = true;
    }

    this.usersService.setUserField(category, newValue).subscribe({
      next: (loggedUser) => {
        this.usersService.updateLoggedUser(loggedUser);
      },
      error: () => {
        if (category === "email") {
          if (!this.isValidEmailFormat(newValue)) this.invalidFields.emailFormat = true;
          else this.invalidFields.emailTaken = true;
        }
      }
    });
  }

  onDeleteAccountButtonClicked() {
    this.usersService.deleteUser().subscribe({
      next: () => {
        this.usersService.logout();
        this.router.navigate(["/books"]);
      },
      error: (err) => { console.log(err) }
    })
  }

  onCloseInvalidFormatModal() {
    this.invalidFields.emailFormat = false;
    this.invalidFields.emailTaken = false;
    this.invalidFields.passwordFormat = false;
  }
}
