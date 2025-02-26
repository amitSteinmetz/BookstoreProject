import { Book } from "./book.model";
import { User } from "./user.model";

export interface Cart {
    user: User,
    books: Book[],
    quantity: number[],
    totalPayment: number
}