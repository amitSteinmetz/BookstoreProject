import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users-service/users.service';
import { ShoppingCart } from '../../models/ShoppingCart.model';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  loggedUser: User;
  loggedUserSub: Subscription;
  userCart: ShoppingCart;
  userCartSub: Subscription;
  paymentApproved: boolean = false;
  showPaymentBox: boolean = false;
  isSmallScreen: boolean = window.innerWidth <= 1100;

  @HostListener('window:resize')
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 1100;
  }

  constructor(private shoppingCartService: ShoppingCartService, private _router: Router,
    private usersService: UsersService) {
    this.userCart = {
      books: [],
      totalPayment: 0
    };
  }

  ngOnInit(): void {
    this.loggedUserSub = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })

    this.userCartSub = this.shoppingCartService.getCart().subscribe({
      next: (cart) => {
        this.userCart = cart;
      },
      error: (err) => { console.log(err) }
    })
  }

  ngOnDestroy(): void {
    this.userCartSub.unsubscribe();
    this.loggedUserSub.unsubscribe();
  }

  onQuantityButtonClicked(book: Book, newQuantity: number | HTMLInputElement) {
    let quantity: number = (typeof newQuantity === "number") ? newQuantity : parseInt(newQuantity.value)
    this.shoppingCartService.updateBookQuantity(book, quantity).subscribe({
      next: (cart) => {
        this.userCart = cart;
      },
      error: () => {
        if (!(typeof newQuantity === "number")) newQuantity.value = "";
      }
    })
  }

  removeBookFromCart(book: Book) {
    this.shoppingCartService.removeBookFromCart(book.id).subscribe({
      next: (cart) => {
        this.userCart = cart;
      }
    })
  }

  onApprovePayment() {
    this.paymentApproved = true;
  }

  onCloseApprovePaymentModal() {
    this.shoppingCartService.removeAllBooksFromCart().subscribe({
      next: () => { this._router.navigate(["/books"]); },
      error: (err) => { console.log(err) }
    })
  }

  onPaymentMobileLinkClicked() {
    this.showPaymentBox = !this.showPaymentBox;
  }
}
