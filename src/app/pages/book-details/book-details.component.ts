import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books-service/books.service';
import { Book } from '../../models/book.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {
  allBooks: Book[] = [];
  allBooksSub: Subscription;
  bookToDisplay: Book;

  constructor(private router: ActivatedRoute, private booksService: BooksService) {}

  ngOnInit(): void {
    const bookId = this.router.snapshot.paramMap.get('id'); 

    this.allBooksSub = this.booksService.booksData.subscribe((allBooks) => {
      this.allBooks = allBooks;
    })
    
    this.bookToDisplay = this.allBooks.find((book) => book.id === bookId);
  }
}
