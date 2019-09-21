import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  AfterViewInit,
  ViewChildren,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-book-pagination",
  templateUrl: "./book-pagination.component.html",
  styleUrls: ["./book-pagination.component.css"]
})
export class BookPaginationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @ViewChildren("paginateNumbers")
  paginateNumbers;

  @Input()
  paginatePage: number[];

  @Output()
  onPaginateClick = new EventEmitter();

  removeCurrentActive() {
    const lists: any = Array.from(this.paginateNumbers);

    const find = lists.find(element =>
      element.nativeElement.classList.contains("active")
    );
    if (find) {
      find.nativeElement.classList.remove("active");
    }
    return lists;
  }

  handleOnClick(event) {
    this.removeCurrentActive();
    this.onPaginateClick.emit(event);
  }

  public resetPaginate() {
    const lists = this.removeCurrentActive();
    lists[0].nativeElement.classList.add("active");
  }
}
