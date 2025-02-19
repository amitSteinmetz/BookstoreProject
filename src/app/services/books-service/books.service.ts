import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  _books: Book[] = [
    { name: "לפני החושך", author: "בראד תור", price: 59.90, id: "1111", image: "../../assets/books-images/לפני החושך.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1112", image: "../../assets/books-images/הלביאות מטהראן.png" },
    { name: "סולם גנבים", author: "ליאור אנגלמן", price: 49.90, id: "1113", image: "../../assets/books-images/סולם גנבים.webp" },
    { name: "סוכן בצללים", author: "אלכס גרליס", price: 49.90, id: "1114", image: "../../assets/books-images/סוכן בצללים.webp" },
    { name: "אולי כדאי לך לדבר עם מישהו", author: "לורי גוטליב", price: 49.90, id: "1115", image: "../../assets/books-images/אולי כדאי לך לדבר עם מישהו.webp" },
    { name: "נקסוס", author: "יובל נח הררי", price: 49.90, id: "1116", image: "../../assets/books-images/נקסוס.webp" },
    { name: "מבוא לניצחון", author: "דובי פרנסס", price: 49.90, id: "1117", image: "../../assets/books-images/מבוא לניצחון.webp" },
    { name: "הארי פוטר ואבן החכמים", author: "ג'יי קיי רולינג", price: 49.90, id: "1118", image: "../../assets/books-images/הארי פוטר ואבן החכמים.png" },
    { name: "אנושות 2.0", author: "יוסי חיימוב", price: 49.90, id: "1119", image: "../../assets/books-images/אנושות 2.0.webp" },


    { name: "איך לתפוס כוכב", author: "קריסטין הרמל", price: 49.90, id: "1120", image: "../../assets/books-images/איך לתפוס כוכב.webp" },
    { name: "אני אמצא אותך", author: "הרלן קובן", price: 59.90, id: "1121", image: "../../assets/books-images/אני אמצא אותך.webp" },
    { name: "ארבע ההסכמות", author: "דון מיגל רואיס", price: 49.90, id: "1122", image: "../../assets/books-images/ארבע ההסכמות.webp" },
    { name: "האחות האבודה", author: "דיינה ג'פריס", price: 49.90, id: "1123", image: "../../assets/books-images/האחות האבודה.webp" },
    { name: "החברה הנאמנה", author: "קרי קלייר", price: 49.90, id: "1124", image: "../../assets/books-images/החברה הנאמנה.webp" },
    { name: "המדריך לשמחת חיים", author: "יאנה דרום", price: 49.90, id: "1125", image: "../../assets/books-images/המדריך לשמחת חיים.webp" },

    { name: "המטופלת השקטה", author: "אלכס מיכאלידס", price: 49.90, id: "1126", image: "../../assets/books-images/המטופלת השקטה.webp" },
    { name: "השקעות לעצלנים", author: "תמיר מנדובסקי", price: 59.90, id: "1127", image: "../../assets/books-images/השקעות לעצלנים.webp" },
    { name: "מוקף באידיוטים", author: "תומס אריקסון", price: 49.90, id: "1128", image: "../../assets/books-images/מוקף באידיוטים.webp" },
    { name: "מעשה בחמישה בלונים", author: "מרים רות", price: 49.90, id: "1129", image: "../../assets/books-images/מעשה בחמישה בלונים.webp" },
    { name: "צללי ברלין", author: "דיוויד גילהם", price: 49.90, id: "1130", image: "../../assets/books-images/צללי ברלין.webp" },

  ];
  booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject(this._books);
  booksData: Observable<Book[]> = this.booksSubject.asObservable();

  filteredBooks: Book[] | null = [];
  filteredBooksSubject: BehaviorSubject<Book[]> = new BehaviorSubject(this.filteredBooks);
  filteredBooksData: Observable<Book[]> = this.filteredBooksSubject.asObservable();

  constructor() { }

  filterBooks(filter: string) {
    this.filteredBooks = this._books.filter((book) => book.name.includes(filter as string) ||
      book.author.includes(filter as string));

    this.filteredBooksSubject.next(this.filteredBooks);
  }

  addBook(book: Book) {

  }

  deleteBook(bookIndex: number) {
    this._books.splice(bookIndex, 1);
    this.booksSubject.next(this._books);
  }

  editBook(bookIndex: number, category: string, value: any) {
    this._books.at(bookIndex)[category] = value;
    this.booksSubject.next(this._books);
  }
}
