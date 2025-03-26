import { Component, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../services/books-service/books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit, OnDestroy {
  booksSub: Subscription;
  booksObs: Observable<Book[]>;
  pagesAmount: number;
  relevantPagesNumbers: number[];
  currentPageNumber: number;
  @Output() pageNumberChanged: EventEmitter<number> = new EventEmitter();

  constructor(private booksService: BooksService, private _router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    let query = this.activatedRouter.snapshot.paramMap.get('query');

    this.booksObs = (this._router.url === "/books") ? this.booksService.getAllBooks() : this.booksService.getBooksByQuery(query);
    this.booksSub = this.booksObs.subscribe({
      next: (books) => {
        this.pagesAmount = Math.ceil(books.length / 12);
        this.currentPageNumber = 1;
        this.relevantPagesNumbers = [1];

        if (this.pagesAmount >= 3)
          this.relevantPagesNumbers.push(2);
      },
      error: (err) => { console.log(err) }
    })
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }

  onPageNumberClicked(pageNumber) {
    this.currentPageNumber = pageNumber;
    this.pageNumberChanged.emit(pageNumber);

    this.relevantPagesNumbers = [];

    for (let i = this.currentPageNumber - 1; i <= this.currentPageNumber + 1; i++) {
      if (i >= 1 && i < this.pagesAmount) 
        this.relevantPagesNumbers.push(i)
    }
  }

  get router() {
    return this._router;
  }
}
