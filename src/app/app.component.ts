import { Component } from '@angular/core';
import { BooksService } from './services/books.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private bookService: BooksService) {}

  onBookSearch(query: string) {
    this.bookService.getBooks(query);
  }
}
