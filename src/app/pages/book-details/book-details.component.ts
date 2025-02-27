import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksService } from '../../services/books-service/books.service';
import { Book } from '../../models/book.model';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-book-details',
  imports: [RouterModule, CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  allBooks: Book[] = [];
  allBooksSub: Subscription;
  bookToDisplay: Book;
  bookAddedToCart: boolean = false;
  loggedUser: User;
  loggedUserSub: Subscription;

  constructor(private router: ActivatedRoute, private booksService: BooksService,
    private shoppingCartService: ShoppingCartService, private usersService: UsersService) { }

  ngOnInit(): void {
    const bookId = this.router.snapshot.paramMap.get('id');

    this.allBooksSub = this.booksService.booksData.subscribe((allBooks) => {
      this.allBooks = allBooks;
    })

    this.loggedUserSub = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })

    this.bookToDisplay = this.allBooks.find((book) => book.id === bookId);
  }

  ngOnDestroy(): void {
      this.allBooksSub.unsubscribe();
      this.loggedUserSub.unsubscribe();
  }

  addBookToCart() {
    if (this.loggedUser) {
      this.shoppingCartService.addBookToCart(this.loggedUser ,this.bookToDisplay);
      this.bookAddedToCart = true;
    }
  }

  onCloseAddBookToCartModal() {
    this.bookAddedToCart = false;
  }
}
