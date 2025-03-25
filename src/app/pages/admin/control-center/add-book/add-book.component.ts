import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlCenterService } from '../../../../services/control-center/control-center.service';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnInit {
  addBookForm: FormGroup;
  showAddBookModal: boolean = false;
  isInvalidAuthorId: boolean = false;
  @Output() new_book_added: EventEmitter<void> = new EventEmitter();

  constructor(private controlCenterService: ControlCenterService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addBookForm = this.fb.group({
      name: [, Validators.required],
      authorId: [, Validators.required],
      description: [, Validators.required],
      price: [, [Validators.required, Validators.pattern('^[0-9]+$')]],
      imgPath: [, Validators.required],
    })
  }

  priceErrorMessage() {
    const errors = this.addBookForm.get("price").errors;

    if (errors?.['required'])
      return "יש להכניס מחיר";

    if (errors?.['pattern'])
      return "יש להכניס מספרים בלבד";

    return "";
  }

  onAddBookButtonClicked() {
    this.showAddBookModal = !this.showAddBookModal;
  }

  onCloseAddBookButtonClicked() {
    this.showAddBookModal = false;
  }

  onCloseAuthorErrorModalButtonClicked() {
    this.isInvalidAuthorId = false;
  }

  onSubmitAddBook() {
    this.controlCenterService.createBook({
      name: this.addBookForm.get("name").value,
      authorId: this.addBookForm.get("authorId").value,
      description: this.addBookForm.get("description").value,
      price: this.addBookForm.get("price").value,
      imgPath: this.addBookForm.get("imgPath").value,
    }).subscribe({
      next: () => {
        this.showAddBookModal = false;
        this.new_book_added.emit();
      },
      error: () => { this.isInvalidAuthorId = true; }
    })
  }
}
