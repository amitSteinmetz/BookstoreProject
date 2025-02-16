import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  _books: Book[] = [
    { name: "לפני החושך", author: "בראד תור", price: 59.90, image: "../../assets/books-images/לפני החושך.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/הלביאות מטהראן.png" },
    { name: "סולם גנבים", author: "ליאור אנגלמן", price: 49.90, image: "../../assets/books-images/סולם גנבים.webp" },
    { name: "סוכן בצללים", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/סוכן בצללים.webp" },
    { name: "נקסוס", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/אולי כדאי לך לדבר עם מישהו.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/נקסוס.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/מבוא לניצחון.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/הארי פוטר ואבן החכמים.png" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/אנושות 2.0.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/האדם מחפש משמעות.webp" },
    { name: "לפני החושך", author: "בראד תור", price: 59.90, image: "../../assets/books-images/לפני החושך.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/הלביאות מטהראן.png" },
    { name: "סולם גנבים", author: "ליאור אנגלמן", price: 49.90, image: "../../assets/books-images/סולם גנבים.webp" },
    { name: "סוכן בצללים", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/סוכן בצללים.webp" },
    { name: "נקסוס", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/אולי כדאי לך לדבר עם מישהו.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/נקסוס.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/מבוא לניצחון.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/הארי פוטר ואבן החכמים.png" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/אנושות 2.0.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/האדם מחפש משמעות.webp" },
    { name: "לפני החושך", author: "בראד תור", price: 59.90, image: "../../assets/books-images/לפני החושך.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/הלביאות מטהראן.png" },
    { name: "סולם גנבים", author: "ליאור אנגלמן", price: 49.90, image: "../../assets/books-images/סולם גנבים.webp" },
    { name: "סוכן בצללים", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/סוכן בצללים.webp" },
    { name: "נקסוס", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/אולי כדאי לך לדבר עם מישהו.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/נקסוס.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/מבוא לניצחון.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/הארי פוטר ואבן החכמים.png" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/אנושות 2.0.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/האדם מחפש משמעות.webp" },
    { name: "לפני החושך", author: "בראד תור", price: 59.90, image: "../../assets/books-images/לפני החושך.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/הלביאות מטהראן.png" },
    { name: "סולם גנבים", author: "ליאור אנגלמן", price: 49.90, image: "../../assets/books-images/סולם גנבים.webp" },
    { name: "סוכן בצללים", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/סוכן בצללים.webp" },
    { name: "נקסוס", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/אולי כדאי לך לדבר עם מישהו.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/נקסוס.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/מבוא לניצחון.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/הארי פוטר ואבן החכמים.png" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/אנושות 2.0.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/האדם מחפש משמעות.webp" },
    { name: "לפני החושך", author: "בראד תור", price: 59.90, image: "../../assets/books-images/לפני החושך.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/הלביאות מטהראן.png" },
    { name: "סולם גנבים", author: "ליאור אנגלמן", price: 49.90, image: "../../assets/books-images/סולם גנבים.webp" },
    { name: "סוכן בצללים", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/סוכן בצללים.webp" },
    { name: "נקסוס", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/אולי כדאי לך לדבר עם מישהו.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/נקסוס.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/מבוא לניצחון.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/הארי פוטר ואבן החכמים.png" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/אנושות 2.0.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/האדם מחפש משמעות.webp" },
    { name: "לפני החושך", author: "בראד תור", price: 59.90, image: "../../assets/books-images/לפני החושך.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/הלביאות מטהראן.png" },
    { name: "סולם גנבים", author: "ליאור אנגלמן", price: 49.90, image: "../../assets/books-images/סולם גנבים.webp" },
    { name: "סוכן בצללים", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/סוכן בצללים.webp" },
    { name: "נקסוס", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/אולי כדאי לך לדבר עם מישהו.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/נקסוס.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/מבוא לניצחון.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/הארי פוטר ואבן החכמים.png" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/אנושות 2.0.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, image: "../../assets/books-images/האדם מחפש משמעות.webp" },
  ];

  booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject(this._books);
  booksData: Observable<Book[]> = this.booksSubject.asObservable();

  constructor() { }
}
