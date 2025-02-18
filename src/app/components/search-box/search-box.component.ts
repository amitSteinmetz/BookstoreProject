import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books-service/books.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {

  constructor(private booksService: BooksService, private router: Router) {}

  onSearchIconClicked(input) {
    this.booksService.filterBooks(input.value);
    input.value = "";
    this.router.navigate(["/filtered-books"]);
  }
}
