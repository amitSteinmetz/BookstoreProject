import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../../../services/books-service/books.service';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from "./add-book/add-book.component";
import { ControlCenterService } from '../../../services/control-center/control-center.service';

@Component({
  selector: 'app-control-center',
  imports: [CommonModule, AddBookComponent],
  templateUrl: './control-center.component.html',
  styleUrl: './control-center.component.scss'
})
export class ControlCenterComponent implements OnInit, OnDestroy {
  allBooks: Book[];
  allBooksSub: Subscription;
  showSettingsModal: boolean[];
  showEditBookModal: boolean[];
  readMoreButtonClicked: boolean[];
  editInputIsOnlyDigits: boolean = false;
  
  constructor(private booksService: BooksService, private controlCenterService: ControlCenterService) { }

  ngOnInit(): void {
    this.allBooksSub = this.booksService.getAllBooks().subscribe({
      next: (books) => {
        this.allBooks = books;
        this.resetClassArrays();
      },
      error: (err) => { console.log(err) }
    })
  }

  ngOnDestroy(): void {
    this.allBooksSub.unsubscribe();
  }

  resetClassArrays() {
    this.showSettingsModal = [];
    this.showEditBookModal = [];
    this.readMoreButtonClicked = [];

    for (let i = 0; i < this.allBooks.length; i++) {
      this.showSettingsModal.push(false);
      this.showEditBookModal.push(false);
      this.readMoreButtonClicked.push(false);
    }
  }

  onDeleteOptionClicked(bookIndex: number, bookId: number) {
    this.controlCenterService.deleteBook(bookId).subscribe({
      next: (books) => {
        this.showSettingsModal[bookIndex] = false;
        this.allBooks = books;
        this.resetClassArrays();
      },
      error: (err) => { console.log(err) }
    })
  }

  onAddedNewBook() {
    this.allBooksSub = this.booksService.getAllBooks().subscribe({
      next: (books) => {
        this.allBooks = books;
        this.resetClassArrays();
      },
      error: (err) => { console.log(err) }
    })
  }

  onReadMoreButtonClicked(index: number) {
    this.readMoreButtonClicked[index] = !this.readMoreButtonClicked[index];
  }

  updateBookPrice(bookIndex: number, priceInput: HTMLInputElement, book: Book) {
    let updatedPrice = priceInput.value;
    book.price = Number(updatedPrice);

    this.controlCenterService.updateBookPrice(book).subscribe({
      next: (books) => {
        this.allBooks = books;
        this.resetClassArrays();
        this.showEditBookModal[bookIndex] = false;
      },
      error: (err) => { console.log(err) }
    })
  }

  onSettingsIconClicked(bookIndex: number) {
    this.showSettingsModal[bookIndex] = !this.showSettingsModal[bookIndex];
  }

  onEditOptionClicked(bookIndex: number) {
    this.showEditBookModal[bookIndex] = true;
    this.showSettingsModal[bookIndex] = false;
  }

  onCloseEditBookIconClicked(bookIndex: number) {
    this.showEditBookModal[bookIndex] = false;
  }

  inputIsOnlyDigits(editInput) {
    this.editInputIsOnlyDigits = /^\d+$/.test(editInput.value) ? true : false;
  }
}
