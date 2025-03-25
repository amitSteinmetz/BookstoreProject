import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users-service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.scss'
})
export class LoginAdminComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin = {
    adminNotExist: false,
    isUser: false
  }

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

  onCloseAdminNotExistModal() {
    this.invalidLogin.adminNotExist = false;
    this.invalidLogin.isUser = false;
  }

  handleSubmit() {
    this.usersService.login({
      email: this.loginForm.get("email").value as string,
      password: this.loginForm.get("password").value as string
    }).subscribe({
      next: () => { this.router.navigate(["/control-center"]); },
      error: (err) => {
        if (err.message == "כניסה למנהלים בלבד") this.invalidLogin.isUser = true;
        else this.invalidLogin.adminNotExist = true;
      }
    })
  }
}
