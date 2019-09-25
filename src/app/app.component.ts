import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { BooksService } from "./services/books.service";
import { Book } from "./model/book";
import { BookPaginationComponent } from "./book-pagination/book-pagination.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  booksObs$;

  books: Book[];
  paginateBook: Book[];
  paginatePageNumber: number[];
  queryHistory: String[];

  err: string;
  isLoading: boolean = false;

  constructor(private bookService: BooksService) {}

  @ViewChild(BookPaginationComponent, { static: false })
  bookPaginate;

  @ViewChild("modal", { static: false })
  modal: ElementRef;

  ngOnInit() {
    this.triggerLoader();
    this.handleServiceRequest("javascript");
  }

  ngOnDestroy() {
    this.booksObs$.unsubscribe();
  }

  onPaginateClick(element) {
    const pageNumber = element.textContent;
    element.parentNode.classList.add("active");
    this.paginateBookPages(pageNumber, 12);
  }

  paginateBookPages(pageNumber, maxResult) {
    const lastIndex = pageNumber * maxResult;
    const firstIndex = lastIndex - maxResult;
    const pages = Math.ceil(this.books.length / maxResult);
    this.paginatePageNumber = Array.from(Array(pages).keys());
    this.paginateBook = this.books.slice(firstIndex, lastIndex);
  }

  onBookSearch(query: string) {
    if (query === "") {
      this.modal.nativeElement.click();
      this.err = "Your Search query is blank";
    } else {
      this.triggerLoader();
      this.bookPaginate.resetPaginate();
      this.handleServiceRequest(query);
      this.setQueryHistory(query);
    }
  }

  private setQueryHistory(query: string) {
    const queryHistory = JSON.parse(localStorage.getItem("queries")) || [];
    if (!queryHistory.find(history => history === query)) {
      if (queryHistory.length < 10) {
        queryHistory.push(query);
      } else {
        queryHistory.pop();
        queryHistory.unshift(query);
      }
      localStorage.setItem("queries", JSON.stringify(queryHistory));
      this.queryHistory = queryHistory;
    }
  }

  private handleServiceRequest(query: string) {
    const prev = this.books;

    this.books = [];
    this.booksObs$ = this.bookService.getBooksParams(query).subscribe(
      booksArray => {
        this.books = booksArray;
        this.err = "";
        this.triggerLoader();
        this.paginateBookPages(1, 12);
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
