import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../../services/users-service/users.service';

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

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, Validators.required]
    })
  }

  emailErrorMessage() {
    const errors = this.loginForm.get("email").errors;

    if (errors?.['required'])
      return "יש להכניס אימייל";

    if (errors?.['email'])
      return "אימייל בפורמט לא חוקי";

    return "";
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
        if (this.router.url === "/user-entrance") {
          this.router.navigate(["/books"]);
        }
        this.userLoggedIn.emit();
      },
      error: () => { this.userExist = false; }
    })
  }
}
