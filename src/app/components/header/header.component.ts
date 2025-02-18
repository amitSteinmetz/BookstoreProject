import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchBoxComponent } from "../search-box/search-box.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/users-service/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  imports: [SearchBoxComponent, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() user_icon_clicked: EventEmitter<void> = new EventEmitter();
  loggedUser: User;
  loggedUserSub: Subscription;
  showSettingsModal: boolean = false;

  constructor(private _router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.loggedUserSub = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })
  }

  onUserIconClicked() {
    this.user_icon_clicked.emit();
  }

  changeSettingModalDisplay() {
    this.showSettingsModal = !this.showSettingsModal;
  }

  logout() {
    this.usersService.logout();
    this.showSettingsModal = false;
    this.router.navigate(["/all-books"]);
  }

  get router() {
    return this._router;
  }
}
