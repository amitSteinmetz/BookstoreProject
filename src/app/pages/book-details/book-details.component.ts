import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksService } from '../../services/books-service/books.service';
import { Book } from '../../models/book.model';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users-service/users.service';
import { ShoppingCart } from '../../models/ShoppingCart.model';

@Component({
  selector: 'app-book-details',
  imports: [RouterModule, CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  bookToDisplay: Book;
  showAddedBookModal: boolean = false;
  bookExistInCart: boolean;
  loggedUser: User;
  loggedUserSub: Subscription;
  userCartSub: Subscription;
  userCart: ShoppingCart;

  constructor(private router: ActivatedRoute, private booksService: BooksService,
    private shoppingCartService: ShoppingCartService, private usersService: UsersService) {
    this.userCart = { books: [], totalPayment: 0 }
    this.bookToDisplay = { id: 0, name: "", price: 0, imgPath: "", authorName: "", description: "" }
  }

  ngOnInit(): void {
    this.loggedUserSub = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })

    this.userCartSub = this.shoppingCartService.getCart().subscribe({
      next: (cart) => {
        this.userCart = cart;
        this.bookExistInCart = this.isBookExistInCart();
      },
      error: (err) => { console.log(err) }
    })

    const bookId = this.router.snapshot.paramMap.get('id');
    this.booksService.getBookById(bookId).subscribe({
      next: (book) => {
        this.bookToDisplay = book;
      },
      error: (err) => { console.log(err) }
    });
  }

  ngOnDestroy(): void {
    this.loggedUserSub.unsubscribe();
  }

  isBookExistInCart() {
    return !!this.userCart?.books.find(cb => cb.book.id === this.bookToDisplay.id);
  }

  addBookToCart() {
    if (this.loggedUser) {
      const bookId = this.router.snapshot.paramMap.get('id');

      this.shoppingCartService.addBookToCart(bookId).subscribe({
        next: () => {
          this.showAddedBookModal = true;
        },
        error: (err) => { console.log(err) }
      })
    }
  }

  onCloseAddBookToCartModal() {
    this.showAddedBookModal = false;
    this.bookExistInCart = true;
  }
}
