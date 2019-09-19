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
  constructor(private bookService: BooksService) {}

  onBookSearch(query: string) {
    if (query === "") {
      this.err = "You Are Not allowed to enter a empty string";
    } else {
      this.triggerLoader();

      this.handleServiceRequest(query);
    }
  }

  @ViewChild("modal", { static: true, read: ElementRef })
  modal: ElementRef;

  ngOnInit() {
    this.triggerLoader();
    this.handleServiceRequest("harry");
  }

  ngOnDestroy() {
    this.booksObs$.unsubscribe();
  }

  ngAfterViewInit() {}

  private handleServiceRequest(query: string) {
    const prev = this.books;
    this.books = [];
    this.booksObs$ = this.bookService.getBooksParams(query).subscribe(
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
