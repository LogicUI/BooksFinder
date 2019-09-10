import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { BookCardsComponent } from './book-card/book-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    BookCardsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
