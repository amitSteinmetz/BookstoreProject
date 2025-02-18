import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book.model';
import { BooksService } from '../../../services/books-service/books.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-filtered-books',
  imports: [CommonModule],
  templateUrl: './filtered-books.component.html',
  // styleUrl: './filtered-books.component.scss'
  styleUrl: '../all-books.component.scss'

})
export class FilteredBooksComponent implements OnInit {
  filteredBooks: Book[] | null;
  filteredBooksSubscription: Subscription;
  currentPageBooks: Book[] = [];
  pagesAmount: number;
  relevantPagesNumbers: number[] = [1];
  currentPageNumber: number = 1;
  clickedBookExistInCart: boolean[] = [];
  showBookIcons: boolean[] = [];

  constructor(private _router: Router, private booksService: BooksService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.filteredBooksSubscription = this.booksService.filteredBooksData.subscribe((books) => {
      this.filteredBooks = books;
      this.pagesAmount = Math.ceil(books.length / 12);
    })

    this.currentPageBooks = this.filteredBooks.slice(12 * (this.currentPageNumber - 1), 12 * this.currentPageNumber);
  
      if (this.pagesAmount >= 3) {
        this.relevantPagesNumbers.push(2);
      }
  
      for (let i = 0; i < this.filteredBooks.length; i++)
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

  showPageNumber(pageNumber) {
    if (pageNumber === this.pagesAmount)
      return;

    if ((this.currentPageNumber === 1 && (pageNumber >= 1 && pageNumber <= 3)) ||
      (pageNumber > this.currentPageNumber - 2 && pageNumber < this.currentPageNumber + 2))
      return pageNumber;
  }

  onPageNumberClicked(pageNumber) {
    this.currentPageNumber = pageNumber;
    this.currentPageBooks = this.filteredBooks.slice(12 * (pageNumber - 1), 12 * pageNumber);

    this.relevantPagesNumbers = [];
    for (let i = this.currentPageNumber - 1; i <= this.currentPageNumber + 1; i++) {
      if (i >= 1 && i < this.pagesAmount)
        this.relevantPagesNumbers.push(i)
    }
  }

  onAddToCartIconClicked(book) {
    if (!this.shoppingCartService.booksInCart.includes(book))
      this.shoppingCartService.addBookToCart(book);

    else
      this.clickedBookExistInCart[this.filteredBooks.indexOf(book)] = true;
  }
}
