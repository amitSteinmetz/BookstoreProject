import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users-service/users.service';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.scss'
})
export class LoginAdminComponent implements OnInit {
  admin: User;
  adminSub: Subscription;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      adminName: [, Validators.required],
      password: [, Validators.required]
    })

    this.adminSub = this.usersService.adminObs.subscribe((admin) => {
      this.admin = admin;
    })
  }

  handleSubmit() {
    if (this.admin.name === this.loginForm.get("adminName").value &&
      this.admin.password === this.loginForm.get("password").value)
      this.router.navigate(["/control-center"]);
  }
}
