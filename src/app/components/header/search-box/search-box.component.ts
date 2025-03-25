import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {

  constructor(private router: Router) { }

  onSearchIconClicked(input) {
    let query = input.value as string;
    input.value = "";
    this.router.navigate(['/books', query]);
  }
}
