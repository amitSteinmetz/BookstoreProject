import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Book } from '../../../../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../../../../services/books-service/books.service';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnInit, OnDestroy {
  addBookForm: FormGroup;
  allBooks: Book[];
  allBooksSub: Subscription;
  showAddBookModal: boolean = false;

  constructor(private booksService: BooksService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.allBooksSub = this.booksService.booksData.subscribe((books) => {
      this.allBooks = books;

      this.addBookForm = this.fb.group({
        name: [, Validators.required],
        author: [, Validators.required],
        price: [, Validators.required],
        id: [, [Validators.required, this.bookIdValidator(this.allBooks)]],
        image: [, Validators.required],
      })
    })
  }

  ngOnDestroy(): void {
      this.allBooksSub.unsubscribe();
  }

  onAddBookButtonClicked() {
    this.showAddBookModal = !this.showAddBookModal;
  }

  onCloseAddBookButtonClicked() {
    this.showAddBookModal = false;
  }

  bookIdValidator(allBooks): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      let bookId = control.value as string;

      for (let book of allBooks)
        if (book.id === bookId)
          return { "taken": control.value }

      return null;
    }
  }

  bookIdErrorMessage() {
    const errors = this.addBookForm.get("id")?.errors;

    if (errors['required'])
      return 'יש להכניס מק"ט';

    if (errors['taken'])
      return "הספר כבר קיים במערכת";

    return "";
  }

  onSubmitAddBook() {
    this.booksService.addBook(
      {
        name: this.addBookForm.get("name").value,
        author: this.addBookForm.get("author").value,
        price: this.addBookForm.get("price").value,
        id: this.addBookForm.get("id").value,
        image: this.addBookForm.get("image").value,
      }
    );
  }
}
