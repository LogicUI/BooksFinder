import { Component } from "@angular/core";
import { BooksService } from "./services/books.service";
import { Observable } from "rxjs";
import { Book } from "./model/book";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  books$: Observable<Book[]>;

  constructor(private bookService: BooksService) {}

  onBookSearch(query: string) {
    this.books$ = this.bookService.getBooks(query);
  }
}
