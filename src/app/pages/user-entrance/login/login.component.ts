import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../../services/users-service/users.service';
import { LoggedUser } from '../../../models/loggedUser.model';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userExist: boolean = true;
  userRole: string;
  @Output() userLoggedIn: EventEmitter<void> = new EventEmitter();

  constructor(private fb: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, Validators.required]
    })
  }

  onCloseNotExistUserModal() {
    this.userExist = true;
  }

  handleSubmit() {
    this.usersService.login({
      email: this.loginForm.get("email").value as string,
      password: this.loginForm.get("password").value as string
    }).subscribe({
      next: () => {
        this.userLoggedIn.emit();
      },
      error: () => {
        this.userExist = false;
      }
    })
  }
}
