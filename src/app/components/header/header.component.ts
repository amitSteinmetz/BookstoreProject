import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { SearchBoxComponent } from "./search-box/search-box.component";
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
export class HeaderComponent implements OnInit, OnDestroy {
  loggedUser: User;
  loggedUserSub: Subscription;
  showSettingsModal: boolean = false;
  showMobileLinks: boolean = false;
  isSmallScreen: boolean = window.innerWidth <= 800;

  @Output() user_icon_clicked: EventEmitter<void> = new EventEmitter();
  @HostListener('window:resize')
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 800;
  }

  constructor(private _router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.loggedUserSub = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })
  }

  ngOnDestroy(): void {
      this.loggedUserSub.unsubscribe();
  }

  onUserIconClicked() {
    this.user_icon_clicked.emit();
    this.showMobileLinks = false;
  }

  onMobileIconClicked() {
    this.showMobileLinks = !this.showMobileLinks;
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
