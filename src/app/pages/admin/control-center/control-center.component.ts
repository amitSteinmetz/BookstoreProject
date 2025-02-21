import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../../../services/books-service/books.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-control-center',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './control-center.component.html',
  styleUrl: './control-center.component.scss'
})
export class ControlCenterComponent implements OnInit {
  addBookForm: FormGroup;
  allBooks: Book[];
  allBooksSub: Subscription;
  showSettingsModal: boolean[] = [];
  showEditBookModal: boolean[] = [];
  showAddBookModal: boolean = false;
  editFieldHasChosen: boolean = false;
  editInputIsOnlyDigits: boolean = false;

  isActiveField = {
    "price": false,
    "id": false
  }

  constructor(private booksService: BooksService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.allBooksSub = this.booksService.booksData.subscribe((books) => {
      this.allBooks = books;

      for (let i = 0; i < this.allBooks.length; i++) {
        this.showSettingsModal.push(false);
        this.showEditBookModal.push(false);
      }

      this.addBookForm = this.fb.group({
        name: [, Validators.required],
        author: [, Validators.required],
        price: [, Validators.required],
        id: [, [Validators.required, this.bookIdValidator(this.allBooks)]],
        image: [, Validators.required],
      })
    })
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
    console.log(this.addBookForm.get("name").value)
    console.log(this.addBookForm.get("author").value)
    console.log(this.addBookForm.get("price").value)
    console.log(this.addBookForm.get("id").value)
    console.log(this.addBookForm.get("image").value)


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
