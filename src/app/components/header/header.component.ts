import { Component, EventEmitter, Output } from '@angular/core';
import { SearchBoxComponent } from "../search-box/search-box.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [SearchBoxComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() user_icon_clicked: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) { }

  onUserIconClicked() {
    this.user_icon_clicked.emit();
  }
}
