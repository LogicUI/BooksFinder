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
  books: Book[];
  err: string;

  constructor(private bookService: BooksService) {}

  onBookSearch(query: string) {
    this.bookService.getBooks(query).subscribe(
      res => {
        this.books = res;
        this.err = "";
      },
      err => {
        this.books = [];
        this.err = err;
      }
    );
  }
}
