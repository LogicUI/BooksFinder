import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl: string = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey: string = 'AIzaSyARt0DQP0y3mDq2HAtJs5WtuHq7Co3EIcY';

  constructor(private http: HttpClient) {}

  getBooks(query: string) {
    const params = new HttpParams()
      .set('q', query)
      .set('maxResults', '10')
      .set('key', this.apiKey);
    return this.http
      .get(this.baseUrl, { params })
      .subscribe((books) => console.log(books));
  }
}
