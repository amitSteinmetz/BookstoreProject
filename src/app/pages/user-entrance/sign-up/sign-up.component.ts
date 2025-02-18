import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../../services/users-service/users.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  @Output() userSignedup: EventEmitter<void> = new EventEmitter();

  constructor(private fb: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: [, Validators.required],
      email: [, [Validators.required, Validators.email]],
      password: [, Validators.required],
      repeatPassword: [, Validators.required]
    })
  }

  handleSubmit() {
    this.usersService.addUser({
      name: this.signupForm.get("username").value,
      email: this.signupForm.get("email").value,
      password: this.signupForm.get("password").value
    })
    
    this.userSignedup.emit();
  }
}
