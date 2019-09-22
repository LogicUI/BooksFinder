import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges
} from "@angular/core";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.css"]
})
export class SearchInputComponent implements OnInit, OnChanges {
  inputData = "";
  constructor() {}

  @Output()
  onBookSearched = new EventEmitter<string>();

  @Input()
  queryHistoryArray: String[];

  ngOnInit() {
    this.queryHistoryArray = JSON.parse(localStorage.getItem("queries"));
  }

  ngOnChanges() {}

  onInputChange(input: string): void {
    this.inputData = input;
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.onBookSearched.emit(this.inputData);
    this.inputData = "";
  }
}
