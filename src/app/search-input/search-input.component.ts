import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  inputData = '';
  constructor() {}

  @Output()
  onBookSearched = new EventEmitter<string>();

  ngOnInit() {}

  onInputChange(input: string): void {
    this.inputData = input;
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.onBookSearched.emit(this.inputData);
    this.inputData = '';
  }
}
