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

  removeCurrentActive(lists: any) {
    const find = lists.find(element =>
      element.nativeElement.classList.contains("active")
    );
    if (find) {
      find.nativeElement.classList.remove("active");
    }
    return find;
  }

  previousPaginate(event) {
    event.stopPropagation();
    const lists: any = Array.from(this.paginateNumbers);
    const find = lists.find(element =>
      element.nativeElement.classList.contains("active")
    );
    const previousPaginateNumber =
      find.nativeElement.previousElementSibling.firstElementChild;
    if (Number(previousPaginateNumber.textContent)) {
      find.nativeElement.classList.remove("active");
      this.onPaginateClick.emit(previousPaginateNumber);
    }
  }

  nextPaginate(event) {
    event.stopPropagation();
    const lists: any = Array.from(this.paginateNumbers);
    const find = lists.find(element =>
      element.nativeElement.classList.contains("active")
    );
    const nextPaginateNumber =
      find.nativeElement.nextElementSibling.firstElementChild;
    if (Number(nextPaginateNumber.textContent)) {
      find.nativeElement.classList.remove("active");
      this.onPaginateClick.emit(nextPaginateNumber);
    }
  }
  handleOnClick(event) {
    const lists: any = Array.from(this.paginateNumbers);
    this.removeCurrentActive(lists);
    this.onPaginateClick.emit(event.target);
  }

  public resetPaginate() {
    const lists: any = Array.from(this.paginateNumbers);
    this.removeCurrentActive(lists);
    lists[0].nativeElement.classList.add("active");
  }
}
