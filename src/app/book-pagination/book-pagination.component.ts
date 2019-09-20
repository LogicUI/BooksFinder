import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-book-pagination",
  templateUrl: "./book-pagination.component.html",
  styleUrls: ["./book-pagination.component.css"]
})
export class BookPaginationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @ViewChild("paginateNumbers", { static: false })
  paginateNumbers: any;

  @Output()
  onPaginateClick = new EventEmitter();

  handleOnClick(event) {
    const lists: any = Array.from(this.paginateNumbers.nativeElement.children);

    const find = lists.find(value => value.classList.contains("active"));
    find.classList.remove("active");

    this.onPaginateClick.emit(event);
  }

  public resetPaginate() {
    const lists: any = Array.from(this.paginateNumbers.nativeElement.children);
    const find = lists.find(value => value.classList.contains("active"));
    find.classList.remove("active");
    lists[0].classList.add("active");
  }
}
