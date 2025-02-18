import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../../services/users-service/users.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() userLoggedIn: EventEmitter<void> = new EventEmitter();

  constructor(private fb: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [, Validators.required],
      password: [, Validators.required]
    })
  }

  handleSubmit() {
    for (let i = 0; i < this.usersService.users.length; i++)
      if (this.usersService.users[i].name === this.loginForm.get("username").value
        && this.usersService.users[i].password === this.loginForm.get("password").value) {
          this.usersService.updateCurrentUser(this.loginForm.get("username").value);
          this.userLoggedIn.emit();
        }
  }
}
