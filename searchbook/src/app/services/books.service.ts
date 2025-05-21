import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { expectedBook, rawBooksData } from './book.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  books: expectedBook[] = [];
  baseurl = `https://www.googleapis.com/books/v1/volumes?q=`;
  constructor(private http: HttpClient) {}

  fetchBooks(query: string) {
    const url = `${this.baseurl}${query || 'bookname'}`;
    return this.http.get<rawBooksData>(url).pipe(
      map((data) => {
        //？？？？
        const books = data.items.map((item) => ({
          bookPicture: item.volumeInfo.imageLinks.thumbnail,
          bookName: item.volumeInfo.title,
          publisher: item.volumeInfo.publisher,
          publishDate: item.volumeInfo.publishedDate,
          description: item.volumeInfo.description,
        })) as expectedBook[];
        // console.log('books in service:', books);
        return books;
      })
    );
  }
}
