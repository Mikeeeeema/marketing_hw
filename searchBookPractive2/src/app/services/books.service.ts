import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, map, tap } from 'rxjs';
import { expectbook, ItemsEntity, searchRes } from './books.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  url = 'https://www.googleapis.com/books/v1/volumes?q=';
  private booksSubject = new BehaviorSubject<expectbook[]>([]);
  private wishSubject = new BehaviorSubject<expectbook[]>([]);
  books$ = this.booksSubject.asObservable();
  wishes$ = this.wishSubject.asObservable();

  constructor(private http: HttpClient) {}

  search(input: string) {
    return this.http.get<searchRes>(this.url + input).pipe(
      map((data: searchRes) => {
        return data.items.map((item: ItemsEntity) => ({
          picture: item.volumeInfo.imageLinks.thumbnail,
          name: item.volumeInfo.title,
          publisher: item.volumeInfo.publisher,
          publishdate: item.volumeInfo.publishedDate,
          description: item.volumeInfo.description,
        })) as expectbook[];
      }),
      tap((books: expectbook[]) => {
        this.booksSubject.next(books);
        // console.log(books);
      })
    );
  }
  addToWishlist(book: expectbook) {
    const currentWishlist = this.wishSubject.getValue();

    const isAlreadyInwishlist = currentWishlist.some(
      (b: expectbook) => b.name === book.name
    );

    if (!isAlreadyInwishlist) {
      const updatedWishlist = [...currentWishlist, book];
      this.wishSubject.next(updatedWishlist);
    }
  }
}
