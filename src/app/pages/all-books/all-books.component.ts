import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../../services/books-service/books.service';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-all-books',
  imports: [CommonModule],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.scss'
})
export class AllBooksComponent implements OnInit {
  allBooks: Book[] = [];
  currentPageBooks: Book[] = [];
  booksSub: Subscription;
  showBookIcons: boolean[] = [];
  pagesAmount: number;
  relevantPagesNumbers: number[] = [1];
  currentPageNumber: number = 1;

  constructor(private booksService: BooksService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.booksSub = this.booksService.booksData.subscribe((books) => {
      this.allBooks = books;
      this.pagesAmount = Math.ceil(books.length / 12);
    })

    this.currentPageBooks = this.allBooks.slice(12 * (this.currentPageNumber - 1), 12 * this.currentPageNumber);
    
    if (this.pagesAmount >= 3) {
      this.relevantPagesNumbers.push(2);
    }
  }

  onMouseEnterBook(index) {
    this.showBookIcons[index] = true;
  }

  onMouseLeaveBook(index) {
    this.showBookIcons[index] = false;
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
    this.currentPageBooks = this.allBooks.slice(12 * (pageNumber - 1), 12 * pageNumber);

    this.relevantPagesNumbers = [];
    for (let i = this.currentPageNumber - 1; i <= this.currentPageNumber + 1; i++) {
      if (i >= 1 && i < this.pagesAmount)
        this.relevantPagesNumbers.push(i)
    }
  }

  onAddToCartIconClicked(book) {
    this.shoppingCartService.addBookToCart(book);
  }
}