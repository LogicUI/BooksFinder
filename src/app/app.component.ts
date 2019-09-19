import { Component, OnInit, OnDestroy } from "@angular/core";
import { BooksService } from "./services/books.service";
import { Observable, of, throwError } from "rxjs";
import { Book } from "./model/book";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  booksObs$;
  books: Book[];
  err: string;
  isLoading: boolean = false;
  constructor(private bookService: BooksService) {}

  onBookSearch(query: string) {
    if (query === "") {
      this.err = "You Are Not allowed to enter a empty string";
    } else {
      this.handleServiceRequest(query);
    }
  }

  ngOnInit() {
    this.handleServiceRequest("harry");
  }

  ngOnDestroy() {
    this.booksObs$.unsubscribe();
  }

  private handleServiceRequest(query: string) {
    this.booksObs$ = this.bookService.getBooksParams(query).subscribe(
      booksArray => {
        this.books = booksArray;
        this.err = "";
      },
      error => {
        this.books = [];
        this.err = error;
      }
    );
  }

  triggerLoader() {
    this.isLoading = !this.isLoading;
  }
}
