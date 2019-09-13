import {
  Injectable,
  ɵCompiler_compileModuleSync__POST_R3__
} from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Book } from "../model/book";
import { Observable, throwError } from "rxjs";
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

  getBooks(query: string): Observable<Book[]> {
    const params = this.setBooksParams(query);

    return this.http.get<Book[]>(this.baseUrl, { params }).pipe(
      map(books => {
        if (books["items"]) {
          return books["items"].map(volume => {
            const {
              volumeInfo: {
                authors,
                title,
                averageRating,
                publisher,
                previewLink,
                imageLinks: { thumbnail }
              }
            } = volume;
            const book = {
              title,
              authors,
              previewLink,
              rating: averageRating,
              publisher,
              image: thumbnail
            };
            return book;
          });
        } else {
          throw new Error("Your Search Returned No Results");
        }
      }),
      catchError(err => {
        return throwError(err.message);
      })
    );
  }
}
