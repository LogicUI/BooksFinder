import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Book } from "../model/book";
import { Observable, throwError } from "rxjs";
import { map, catchError, delay } from "rxjs/operators";

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
      .set("maxResults", "40")
      .set("key", this.apiKey);
  }

  getBooksParams(query: string): Observable<Book[]> {
    const params = this.setBooksParams(query);
    return this.http.get<any>(this.baseUrl, { params }).pipe(
      delay(50),
      map(books => {
        if (!books["items"]) {
          throw new Error("Your Search Returned No Results");
        }
        return books["items"];
      }),
      map(bookItems => {
        return bookItems.map(book => {
          const {
            volumeInfo: {
              authors,
              title,
              publisher,
              previewLink,
              description,
              imageLinks: { thumbnail = "../assets/image/noImage.jpg" } = ""
            }
          } = book;
          const newBook = {
            authors,
            title,
            publisher,
            previewLink,
            description,
            image: thumbnail
          };
          return newBook;
        });
      }),
      catchError(err => {
        return throwError(err.message);
      })
    );
  }
}
