import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class LoginAdminComponent implements OnInit, OnDestroy {
  admin: User;
  adminSub: Subscription;
  loginForm: FormGroup;
  adminNotExist: boolean = false;

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

  ngOnDestroy(): void {
      this.adminSub.unsubscribe();
  }

  onCloseAdminNotExistModal() {
    this.adminNotExist = false;
  }

  handleSubmit() {
    if (this.admin.name === this.loginForm.get("adminName").value &&
      this.admin.password === this.loginForm.get("password").value) {
      this.usersService.updateCurrentUser(this.admin.name);
      this.router.navigate(["/control-center"]);
    }

    this.adminNotExist = true;
  }
}
