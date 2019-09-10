import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Book } from "../model/book";
@Injectable({
  providedIn: "root"
})
export class BooksService {
  private baseUrl: string = "https://www.googleapis.com/books/v1/volumes";
  private apiKey: string = "AIzaSyARt0DQP0y3mDq2HAtJs5WtuHq7Co3EIcY";

  constructor(private http: HttpClient) {}

  private setBooksParams(query: string) {
    return new HttpParams()
      .set("q", query)
      .set("maxResults", "10")
      .set("key", this.apiKey);
  }

  getBooks(query: string) {
    const params = this.setBooksParams(query);
    return this.http.get<Book[]>(this.baseUrl, { params }).pipe(
      map(books =>
        books["items"].map(volume => {
          const {
            volumeInfo: {
              title,
              averageRating,
              publisher,
              imageLinks: { thumbnail }
            }
          } = volume;
          const book = {
            title,
            rating: averageRating,
            publisher,
            image: thumbnail
          };
          return book;
        })
      )
    );
  }
}
