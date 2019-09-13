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
  isLoading: boolean = false;

  constructor(private bookService: BooksService) {}

  onBookSearch(query: string) {
    if (query === "") {
      this.err = "You Are Not allowed to enter a empty string";
    } else {
      this.triggerLoader();
      this.handleServiceRequest(query);
    }
  }

  private handleServiceRequest(query: string) {
    this.bookService.getBooks(query).subscribe(
      res => {
        this.books = res;
        this.err = "";
        this.triggerLoader();
      },
      err => {
        this.books = [];
        this.err = err;
        this.triggerLoader();
      }
    );
  }

  triggerLoader() {
    this.isLoading = !this.isLoading;
  }
}
