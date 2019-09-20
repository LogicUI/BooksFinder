import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Book } from "../model/book";
@Component({
  selector: "app-book-card",
  templateUrl: "./book-card.component.html",
  styleUrls: ["./book-card.component.css"]
})
export class BookCardsComponent implements OnChanges {
  @Input()
  book: Book;

  @Input()
  index;

  constructor() {}

  ngOnChanges() {}
}
