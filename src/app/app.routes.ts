import { Routes } from '@angular/router';
import { UserEntranceComponent } from './pages/user-entrance/user-entrance.component';
import { AllBooksComponent } from './pages/all-books/all-books.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { FilteredBooksComponent } from './pages/all-books/filtered-books/filtered-books.component';
import { UserAcountComponent } from './pages/user-account/user-acount.component';
import { userGuard } from './guards/user-guard/user.guard';
import { LoginAdminComponent } from './pages/admin/login-admin/login-admin.component';
import { ControlCenterComponent } from './pages/admin/control-center/control-center.component';
import { AdminAccountComponent } from './pages/admin/admin-account/admin-account.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: "", redirectTo: "all-books", pathMatch: "full" },
    { path: "all-books", component: AllBooksComponent },
    { path: "user-entrance", component: UserEntranceComponent },
    { path: "shopping-cart", component: ShoppingCartComponent },
    { path: "book-details/:id", component: BookDetailsComponent },
    { path: "filtered-books", component: FilteredBooksComponent },
    { path: "user-account", component: UserAcountComponent, canActivate: [userGuard]},
    { path: "admin", component: LoginAdminComponent},
    { path: "control-center", component: ControlCenterComponent},
    { path: "admin-account", component: AdminAccountComponent},
    { path: "**", component: PageNotFoundComponent}
];
