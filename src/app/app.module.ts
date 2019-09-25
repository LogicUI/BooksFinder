import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { SearchInputComponent } from "./search-input/search-input.component";
import { BookCardsComponent } from "./book-card/book-card.component";
import { BookPaginationComponent } from "./book-pagination/book-pagination.component";
import { RouterModule, Routes } from "@angular/router";
import { BookshelfComponent } from './bookshelf/bookshelf.component';

const appRoutes: Routes = [
  {
    path: "",
    component: AppComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    BookCardsComponent,
    BookPaginationComponent,
    BookshelfComponent
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
