import { Component, EventEmitter, Output, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../services/books-service/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit, OnDestroy {
  allBooksSub: Subscription;
  filteredBooksSub: Subscription;
  allBookspagesAmount: number;
  filteredBookspagesAmount: number;
  relevantPagesNumbers: number[];
  currentPageNumber: number;
  currentPagesAmount: number;
  @Output() pageNumberChanged: EventEmitter<number> = new EventEmitter();

  constructor(private booksService: BooksService, private _router: Router) { }

  ngOnInit(): void {
    this.allBooksSub = this.booksService.booksData.subscribe((books) => {
      this.allBookspagesAmount = Math.ceil(books.length / 12);
    })

    this.filteredBooksSub = this.booksService.filteredBooksData.subscribe((books) => {
      this.filteredBookspagesAmount = Math.ceil(books.length / 12);
      this.currentPageNumber = 1;
      this.currentPagesAmount = (this._router.url === '/all-books') ? this.allBookspagesAmount : this.filteredBookspagesAmount;
      this.relevantPagesNumbers = [1];
      
      if (this.currentPagesAmount >= 3)
        this.relevantPagesNumbers.push(2);
    })
  }

  ngOnDestroy(): void {
      this.allBooksSub.unsubscribe();
      this.filteredBooksSub.unsubscribe();
  }

  onPageNumberClicked(pageNumber) {
    this.currentPageNumber = pageNumber;
    this.pageNumberChanged.emit(pageNumber);

    this.relevantPagesNumbers = [];

    for (let i = this.currentPageNumber - 1; i <= this.currentPageNumber + 1; i++) {
      if (i >= 1 && i < this.currentPagesAmount)
        this.relevantPagesNumbers.push(i)
    }
  }

  get router() {
    return this._router;
  }
}
