import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books-service/books.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users-service/users.service';
import { PaginationComponent } from "../../components/pagination/pagination.component";

@Component({
  selector: 'app-filtered-books',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './filtered-books.component.html',
  styleUrl: '../all-books/all-books.component.scss'
})
export class FilteredBooksComponent implements OnInit {
  filteredBooks: Book[] | null;
  filteredBooksSubscription: Subscription;
  currentPageBooks: Book[] = [];
  currentPageNumber: number = 1;
  clickedBookExistInCart: boolean[] = [];
  loggedUser: User;
  loggedUserSub: Subscription;

  constructor(private _router: Router, private booksService: BooksService, private shoppingCartService: ShoppingCartService,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.filteredBooksSubscription = this.booksService.filteredBooksData.subscribe((books) => {
      this.filteredBooks = books;
      this.currentPageBooks = this.filteredBooks.slice(0, 12);
    })

    this.loggedUserSub = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })

    for (let i = 0; i < this.filteredBooks.length; i++)
      this.clickedBookExistInCart.push(false);
  }

  get router() {
    return this._router;
  }

  switchPage(pageNumber: number) {
    this.currentPageNumber = pageNumber;
    this.currentPageBooks = this.filteredBooks.slice(12 * (this.currentPageNumber - 1), 12 * this.currentPageNumber);
  }

  onAddToCartIconClicked(book) {
    if (!this.loggedUser) return;

    if (!this.shoppingCartService.booksInCart.includes(book))
      this.shoppingCartService.addBookToCart(book);

    else
      this.clickedBookExistInCart[this.filteredBooks.indexOf(book)] = true;
  }
}
