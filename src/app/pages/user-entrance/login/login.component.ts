import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../../services/users-service/users.service';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  userExist: boolean = true;
  users: User[];
  usersSub: Subscription;
  admin: User;
  adminSub: Subscription;
  @Output() userLoggedIn: EventEmitter<void> = new EventEmitter();

  constructor(private fb: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [, Validators.required],
      password: [, Validators.required]
    })

    this.usersSub = this.usersService.usersObs.subscribe((users) => {
      this.users = users;
    })

    this.adminSub = this.usersService.adminObs.subscribe((admin) => {
      this.admin = admin;
    })
  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
    this.adminSub.unsubscribe();
}

  onCloseNotExistUserModal() {
    this.userExist = true;
  }

  isAdmin() {
    return this.loginForm.get("username").value === this.admin.name;
  }

  handleSubmit() {
    this.userExist = false;

    for (let i = 0; i < this.users.length; i++)
      if (this.users[i].name === this.loginForm.get("username").value
        && this.users[i].password === this.loginForm.get("password").value && !this.isAdmin()) {
        this.usersService.updateCurrentUser(this.loginForm.get("username").value);
        this.userLoggedIn.emit();
        this.userExist = true;
      }
  }
}
