import { Routes } from '@angular/router';
import { UserEntranceComponent } from './pages/user-entrance/user-entrance.component';
import { LoginComponent } from './pages/user-entrance/login/login.component';
import { AllBooksComponent } from './pages/all-books/all-books.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';

export const routes: Routes = [
    { path: "", redirectTo: "all-books", pathMatch: "full" },
    { path: "all-books", component: AllBooksComponent },
    { path: "user-entrance", component: UserEntranceComponent },
    { path: "shopping-cart", component: ShoppingCartComponent },
    { path: "book-details/:id", component: BookDetailsComponent }
];
