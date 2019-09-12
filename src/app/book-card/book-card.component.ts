import { Component, OnInit, Input } from "@angular/core";
import { Book } from "../model/book";
@Component({
  selector: "app-book-card",
  templateUrl: "./book-card.component.html",
  styleUrls: ["./book-card.component.css"]
})
export class BookCardsComponent implements OnInit {
  @Input()
  book: Book;

  author: Array<String>;

  constructor() {}

  ngOnInit() {
    this.author = this.book.authors;
    console.log(this.book);
  }
}
