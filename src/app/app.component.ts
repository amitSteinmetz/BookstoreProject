import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  userEntranceIconClicked: boolean = false;

  onUserEntranceIconClicked() {
    this.userEntranceIconClicked = !this.userEntranceIconClicked;
  }
}
