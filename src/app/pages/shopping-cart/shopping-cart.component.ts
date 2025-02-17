import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  booksInCart: Book[] = [];
  booksInCartSub: Subscription;
  bookQuantity: number[] = [];
  totalPayment: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.booksInCartObservable.subscribe((booksInCart) => {
      this.booksInCart = booksInCart;
    })

    for (let i = 0; i < this.booksInCart.length; i++) {
      this.bookQuantity.push(1);
      this.totalPayment += this.booksInCart[i].price;
    }
  }

  onIncreaseQuantityButtonClicked(index: number) {    
    this.bookQuantity[index]++;
    this.totalPayment += this.booksInCart[index].price;
  }

  onDecreaseQuantityButtonClicked(index: number) {
    if (this.bookQuantity[index] === 1) return;

    this.bookQuantity[index]--;
    this.totalPayment -= this.booksInCart[index].price;
  }

  onRemoveBookFromCartIconClicked(bookIndex: number) {
    this.totalPayment -= (this.booksInCart[bookIndex].price * this.bookQuantity[bookIndex]);
    this.bookQuantity.splice(bookIndex, 1);
    this.shoppingCartService.removeBookFromCart(bookIndex);
  }
}
