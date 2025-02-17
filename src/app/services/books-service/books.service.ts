import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  _books: Book[] = [
    { name: "לפני החושך", author: "בראד תור", price: 59.90, id: "1111" ,image: "../../assets/books-images/לפני החושך.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1112" ,image: "../../assets/books-images/הלביאות מטהראן.png" },
    { name: "סולם גנבים", author: "ליאור אנגלמן", price: 49.90, id: "1113" ,image: "../../assets/books-images/סולם גנבים.webp" },
    { name: "סוכן בצללים", author: "מרג'אן כמאלי", price: 49.90, id: "1114" ,image: "../../assets/books-images/סוכן בצללים.webp" },
    { name: "נקסוס", author: "מרג'אן כמאלי", price: 49.90, id: "1115" ,image: "../../assets/books-images/אולי כדאי לך לדבר עם מישהו.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1116" ,image: "../../assets/books-images/נקסוס.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1117" ,image: "../../assets/books-images/מבוא לניצחון.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1118" ,image: "../../assets/books-images/הארי פוטר ואבן החכמים.png" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1119" ,image: "../../assets/books-images/אנושות 2.0.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1120" ,image: "../../assets/books-images/האדם מחפש משמעות.webp" },
    { name: "לפני החושך", author: "בראד תור", price: 59.90, id: "1121" ,image: "../../assets/books-images/לפני החושך.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1122" ,image: "../../assets/books-images/הלביאות מטהראן.png" },
    { name: "סולם גנבים", author: "ליאור אנגלמן", price: 49.90, id: "1123" ,image: "../../assets/books-images/סולם גנבים.webp" },
    { name: "סוכן בצללים", author: "מרג'אן כמאלי", price: 49.90, id: "1124" ,image: "../../assets/books-images/סוכן בצללים.webp" },
    { name: "נקסוס", author: "מרג'אן כמאלי", price: 49.90, id: "1125" ,image: "../../assets/books-images/אולי כדאי לך לדבר עם מישהו.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1126" ,image: "../../assets/books-images/נקסוס.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1127" ,image: "../../assets/books-images/מבוא לניצחון.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1128" ,image: "../../assets/books-images/הארי פוטר ואבן החכמים.png" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1129" ,image: "../../assets/books-images/אנושות 2.0.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1130" ,image: "../../assets/books-images/האדם מחפש משמעות.webp" },
    { name: "לפני החושך", author: "בראד תור", price: 59.90, id: "1131" ,image: "../../assets/books-images/לפני החושך.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1132" ,image: "../../assets/books-images/הלביאות מטהראן.png" },
    { name: "סולם גנבים", author: "ליאור אנגלמן", price: 49.90, id: "1133" ,image: "../../assets/books-images/סולם גנבים.webp" },
    { name: "סוכן בצללים", author: "מרג'אן כמאלי", price: 49.90, id: "1134" ,image: "../../assets/books-images/סוכן בצללים.webp" },
    { name: "נקסוס", author: "מרג'אן כמאלי", price: 49.90, id: "1135" ,image: "../../assets/books-images/אולי כדאי לך לדבר עם מישהו.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1136" ,image: "../../assets/books-images/נקסוס.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1137" ,image: "../../assets/books-images/מבוא לניצחון.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1138" ,image: "../../assets/books-images/הארי פוטר ואבן החכמים.png" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1139" ,image: "../../assets/books-images/אנושות 2.0.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1140" ,image: "../../assets/books-images/האדם מחפש משמעות.webp" },
    { name: "לפני החושך", author: "בראד תור", price: 59.90, id: "1141" ,image: "../../assets/books-images/לפני החושך.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1142" ,image: "../../assets/books-images/הלביאות מטהראן.png" },
    { name: "סולם גנבים", author: "ליאור אנגלמן", price: 49.90, id: "1143" ,image: "../../assets/books-images/סולם גנבים.webp" },
    { name: "סוכן בצללים", author: "מרג'אן כמאלי", price: 49.90, id: "1144" ,image: "../../assets/books-images/סוכן בצללים.webp" },
    { name: "נקסוס", author: "מרג'אן כמאלי", price: 49.90, id: "1145" ,image: "../../assets/books-images/אולי כדאי לך לדבר עם מישהו.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1146" ,image: "../../assets/books-images/נקסוס.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1147" ,image: "../../assets/books-images/מבוא לניצחון.webp" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1148" ,image: "../../assets/books-images/הארי פוטר ואבן החכמים.png" },
    { name: "הלביאות מטהראן", author: "מרג'אן כמאלי", price: 49.90, id: "1149" ,image: "../../assets/books-images/אנושות 2.0.webp" }
   ];

  booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject(this._books);
  booksData: Observable<Book[]> = this.booksSubject.asObservable();

  constructor() { }
}
