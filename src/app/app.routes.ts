import { Routes } from '@angular/router';
import { UserEntranceComponent } from './pages/user-entrance/user-entrance.component';
import { AllBooksComponent } from './pages/all-books/all-books.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { FilteredBooksComponent } from './pages/filtered-books/filtered-books.component';
import { UserAcountComponent } from './pages/user-account/user-acount.component';
import { userGuard } from './guards/user-guard/user.guard';
import { LoginAdminComponent } from './pages/admin/login-admin/login-admin.component';
import { ControlCenterComponent } from './pages/admin/control-center/control-center.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { controlCenterGuard } from './guards/control-center-guard/control-center.guard';
import { adminGuard } from './guards/admin-guard/admin.guard';

export const routes: Routes = [
    { path: "", redirectTo: "books", pathMatch: "full" },
    { path: "books", component: AllBooksComponent, canActivate: [adminGuard] },
    { path: "shopping-cart", component: ShoppingCartComponent, canActivate: [userGuard, adminGuard] },
    { path: "book-details/:id", component: BookDetailsComponent, canActivate: [adminGuard] },
    { path: "books/:query", component: FilteredBooksComponent, canActivate: [adminGuard] },
    { path: "user-account", component: UserAcountComponent, canActivate: [userGuard] },
    { path: "user-entrance", component: UserEntranceComponent },
    { path: "admin", component: LoginAdminComponent },
    { path: "control-center", component: ControlCenterComponent, canActivate: [controlCenterGuard] },
    { path: "**", component: PageNotFoundComponent }
];
