import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { UserEntranceComponent } from "./pages/user-entrance/user-entrance.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, UserEntranceComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bookstore-project';
  closeEntranceModal: boolean = false;

  constructor(private _router: Router) {}
  
  onUserEntranceIconClicked() {
    this.closeEntranceModal = true;
  }

  closeUserEntrance() {
    this.closeEntranceModal = false;
  }

  get router() {
    return this._router;
  }
}
