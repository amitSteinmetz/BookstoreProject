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

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
      this.shoppingCartService.booksInCartObservable.subscribe((booksInCart) => {
        this.booksInCart = booksInCart;
      })
  }
}
