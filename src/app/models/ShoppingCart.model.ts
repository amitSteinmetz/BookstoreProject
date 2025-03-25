import { cartBook } from "./cartBook.model";

export interface ShoppingCart {
    books: cartBook[],
    totalPayment: number
}