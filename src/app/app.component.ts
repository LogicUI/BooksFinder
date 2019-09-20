import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { BooksService } from "./services/books.service";
import { Observable, of, throwError } from "rxjs";
import { Book } from "./model/book";
import { BookPaginationComponent } from "./book-pagination/book-pagination.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  booksObs$;
  books: Book[];
  err: string;

  isLoading: boolean = false;
  savedQuery: string = "javascript";
  startIndex: Number = 0;

  constructor(private bookService: BooksService) {}

  @ViewChild(BookPaginationComponent, { static: false })
  bookPaginate;

  onPaginateClick(event) {
    const number = event.target.textContent;
    event.target.parentNode.classList.add("active");
    this.startIndex = number * 12 - 12;
    this.triggerLoader();
    this.handleServiceRequest(this.savedQuery, this.startIndex.toString());
  }

  onBookSearch(query: string) {
    if (query === "") {
      this.modal.nativeElement.click();
      this.err = "Your Search query is blank";
    } else {
      this.triggerLoader();
      this.savedQuery = query;
      this.startIndex = 0;
      this.bookPaginate.resetPaginate();
      this.handleServiceRequest(query, this.startIndex.toString());
    }
  }

  @ViewChild("modal", { static: false })
  modal: ElementRef;

  ngOnInit() {
    this.triggerLoader();
    this.handleServiceRequest(this.savedQuery, this.startIndex.toString());
  }

  ngOnDestroy() {
    this.booksObs$.unsubscribe();
  }

  ngAfterViewInit() {}

  private handleServiceRequest(query: string, startIndex: string) {
    const prev = this.books;

    this.books = [];
    this.booksObs$ = this.bookService
      .getBooksParams(query, startIndex)
      .subscribe(
        booksArray => {
          this.books = booksArray;
          this.err = "";
          this.triggerLoader();
        },
        error => {
          this.books = prev;
          this.modal.nativeElement.click();
          this.err = error;
          this.triggerLoader();
        }
      );
  }

  triggerLoader() {
    this.isLoading = !this.isLoading;
  }
}
