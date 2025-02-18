import { Component, EventEmitter, Output } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-entrance',
  imports: [LoginComponent, SignUpComponent, CommonModule],
  templateUrl: './user-entrance.component.html',
  styleUrl: './user-entrance.component.scss'
})
export class UserEntranceComponent {
  @Output() close_user_entrance: EventEmitter<void> = new EventEmitter();
  isLoginEntrance: boolean = true;

  closeUserEntrance() {
    this.close_user_entrance.emit();
  }

  showLoginModal() {
    this.isLoginEntrance = true;
  }

  onSignupClicked() {
    this.isLoginEntrance = false;
  }
}
