import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../../../services/books-service/books.service';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from "./add-book/add-book.component";

@Component({
  selector: 'app-control-center',
  imports: [CommonModule, AddBookComponent],
  templateUrl: './control-center.component.html',
  styleUrl: './control-center.component.scss'
})
export class ControlCenterComponent implements OnInit, OnDestroy {
  allBooks: Book[];
  allBooksSub: Subscription;
  showSettingsModal: boolean[] = [];
  showEditBookModal: boolean[] = [];
  editFieldHasChosen: boolean = false;
  editInputIsOnlyDigits: boolean = false;
  isActiveField = {
    "price": false,
    "id": false
  }

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.allBooksSub = this.booksService.booksData.subscribe((books) => {
      this.allBooks = books;

      for (let i = 0; i < this.allBooks.length; i++) {
        this.showSettingsModal.push(false);
        this.showEditBookModal.push(false);
      }
    })
  }

  ngOnDestroy(): void {
      this.allBooksSub.unsubscribe();
  }

  onSettingsIconClicked(bookIndex: number) {
    this.showSettingsModal[bookIndex] = !this.showSettingsModal[bookIndex];
  }

  onDeleteOptionClicked(bookIndex: number) {
    this.booksService.deleteBook(bookIndex);
    this.showSettingsModal[bookIndex] = false;
  }

  onEditOptionClicked(bookIndex: number) {
    this.showEditBookModal[bookIndex] = true;
    this.showSettingsModal[bookIndex] = false;
  }

  onCloseEditBookIconClicked(bookIndex: number) {
    this.showEditBookModal[bookIndex] = false;
    this.editFieldHasChosen = false;

    for (let field in this.isActiveField)
      this.isActiveField[field] = false;
  }

  onChoosingFieldToEdit(category: string) {
    this.editFieldHasChosen = true;

    for (let field in this.isActiveField)
      this.isActiveField[field] = false;

    this.isActiveField[category] = true;
  }

  onConfirmFieldEdit(bookIndex: number, input) {
    let category;

    for (let field in this.isActiveField)
      if (this.isActiveField[field])
        category = field;

    this.booksService.editBook(bookIndex, category, input.value);
    this.showEditBookModal[bookIndex] = false;
  }

  inputIsOnlyDigits(editInput) {
    this.editInputIsOnlyDigits = /^\d+$/.test(editInput.value) ? true : false;
  }
}
