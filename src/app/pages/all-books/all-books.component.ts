import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../../services/books-service/books.service';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users-service/users.service';
import { User } from '../../models/user.model';
import { PaginationComponent } from "../../components/pagination/pagination.component";

@Component({
  selector: 'app-all-books',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.scss'
})
export class AllBooksComponent implements OnInit {
  allBooks: Book[] = [];
  currentPageBooks: Book[] = [];
  booksSub: Subscription;
  showBookIcons: boolean[] = [];
  clickedBookExistInCart: boolean[] = [];
  loggedUser: User;
  loggedUserSub: Subscription;
  currentPageNumber: number = 1;

  constructor(private _router: Router, private booksService: BooksService, private shoppingCartService: ShoppingCartService,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.booksSub = this.booksService.booksData.subscribe((books) => {
      this.allBooks = books;
    })

    this.loggedUserSub = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })

    this.currentPageBooks = this.allBooks.slice(0, 12);
    
    for (let i = 0; i < this.allBooks.length; i++)
      this.clickedBookExistInCart.push(false);
  }

  get router() {
    return this._router;
  }

  onMouseEnterBook(index) {
    this.showBookIcons[index] = true;
  }

  onMouseLeaveBook(index) {
    this.showBookIcons[index] = false;
    this.clickedBookExistInCart[index] = false;
  }

  switchPage(pageNumber: number) {
    this.currentPageNumber = pageNumber;
    this.currentPageBooks = this.allBooks.slice(12 * (this.currentPageNumber - 1), 12 * this.currentPageNumber);
  }

  onAddToCartIconClicked(book) {
    if (!this.loggedUser) return;

    if (!this.shoppingCartService.booksInCart.includes(book))
      this.shoppingCartService.addBookToCart(book);

    else this.clickedBookExistInCart[this.allBooks.indexOf(book)] = true;
  }

  filterBooks(filter: string) {
    return this.allBooks.filter((book) => book.name.includes(filter) || book.author.includes(filter));
  }
}