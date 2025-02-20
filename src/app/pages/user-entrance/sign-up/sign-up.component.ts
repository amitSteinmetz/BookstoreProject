import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../../services/users-service/users.service';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  users: User[];
  usersSub: Subscription;
  @Output() userSignedup: EventEmitter<void> = new EventEmitter();

  constructor(private fb: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersSub = this.usersService.usersObs.subscribe((users) => {
      this.users = users;
    })

    this.signupForm = this.fb.group({
      username: [, [Validators.required, this.takenUsernameValidator(this.users)]],
      email: [, [Validators.required, Validators.email]],
      password: [, Validators.required],
      repeatPassword: [, Validators.required]
    },
      { validators: this.notSamePasswordsValidator }
    )
  }

  takenUsernameValidator(users: User[]): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      let username = control.value as string;

      for (let user of users)
        if (user.name === username)
          return { "taken": control.value }

      return null;
    }
  }

  notSamePasswordsValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get("password")?.value as string;
    const repeatPassword = control.get("repeatPassword")?.value as string;

    return (password !== repeatPassword) ? { "notSame": true } : null;
  }

  repeatPasswordErrorMessage() {
    const formErrors = this.signupForm.errors;
    const errors = this.signupForm.get("repeatPassword").errors;

    if (errors?.['required'])
      return "יש להכניס סיסמא";

    if (formErrors["notSame"])
      return "הסיסמאות אינן זהות";

    return "";
  }

  usernameErrorMessage() {
    const errors = this.signupForm.get("username").errors;

    if (errors?.['required'])
      return "יש להכניס שם משתמש";

    if (errors?.['taken'])
      return "שם זה כבר קיים במערכת";

    return "";
  }

  emailErrorMessage() {
    const errors = this.signupForm.get("email").errors;

    if (errors?.['required'])
      return "יש להכניס אימייל";

    if (errors?.['email'])
      return "אימייל בפורמט לא חוקי";

    return "";
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
