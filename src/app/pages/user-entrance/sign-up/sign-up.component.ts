import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
  showSuccessfullSignupModal: boolean = false;
  users: User[];
  usersSub: Subscription;
  @Output() userSignedup: EventEmitter<void> = new EventEmitter();

  constructor(private fb: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [, Validators.required],
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmPassword: [, Validators.required]
    },
      { validators: this.notSamePasswordsValidator }
    )
  }

  notSamePasswordsValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get("password")?.value as string;
    const confirmPassword = control.get("confirmPassword")?.value as string;

    return (password !== confirmPassword) ? { "notSame": true } : null;
  }

  invalidPasswordMessage() {
    const password = this.signupForm.get("password").value;
    const errors = this.signupForm.get("password").errors;

    if (errors?.['required'])
      return "יש להכניס סיסמא";

    if (errors["pattern"]) {
      if (!/[A-Z]/.test(password)) return "הסיסמה חייבת להכיל לפחות אות גדולה אחת";
      if (!/\d/.test(password)) return "הסיסמה חייבת להכיל לפחות ספרה אחת";
      if (!/[@$!%*?&]/.test(password)) return "הסיסמה חייבת להכיל לפחות תו מיוחד אחד (@$!%*?&)";
    }

    return "";
  }

  confirmPasswordErrorMessage() {
    const formErrors = this.signupForm.errors;
    const errors = this.signupForm.get("confirmPassword").errors;

    if (errors?.['required'])
      return "יש להכניס סיסמא";

    if (formErrors["notSame"])
      return "הסיסמאות אינן זהות";

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
    this.usersService.signup({
      name: this.signupForm.get("name").value as string,
      email: this.signupForm.get("email").value as string,
      password: this.signupForm.get("password").value as string,
      confirmPassword: this.signupForm.get("confirmPassword").value as string
    }).subscribe({
      next: () => { this.showSuccessfullSignupModal = true; },
      error: (error) => console.log(error)
    })
  }

  onCloseSuccessfulSignupModal() {
    this.showSuccessfullSignupModal = false;
    this.userSignedup.emit();
  }
}
