import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users-service/users.service';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  loggedUser: User;
  loggedUserSub: Subscription;
  userCart: Cart;
  userCartSub: Subscription;
  paymentApproved: boolean = false;
  showPaymentBox: boolean = false;
  isSmallScreen: boolean = window.innerWidth <= 1100;

  @HostListener('window:resize')
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 1100;
  }

  constructor(private shoppingCartService: ShoppingCartService, private _router: Router,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.loggedUserSub = this.usersService.loggedUserObs.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    })

    this.userCartSub = this.shoppingCartService.usersCartObservable.subscribe((usersCart) => {
      this.userCart = usersCart.find((cart) => cart.user.name === this.loggedUser.name);
    })
  }

  onQuantityButtonClicked(bookIndex: number, amount) {
    if (this.userCart.quantity[bookIndex] === 1 && amount === -1)
      return;

    this.shoppingCartService.updateBookQuantity(
      this.userCart, bookIndex ,this.userCart.quantity[bookIndex] + amount
    );
  }

  removeBookFromCart(bookIndex: number) {
    this.shoppingCartService.removeBookFromCart(this.userCart.user, bookIndex);
  }

  onApprovePayment() {
    this.paymentApproved = true;
  }

  onCloseApprovePaymentModal() {
    for (let i = this.userCart.books.length - 1; i >= 0; i--)
      this.removeBookFromCart(i)

    this._router.navigate(["/all-books"]);
  }

  onPaymentMobileLinkClicked() {
    this.showPaymentBox = !this.showPaymentBox;
  }
}
