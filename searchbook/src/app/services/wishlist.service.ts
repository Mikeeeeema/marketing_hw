import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { expectedBook } from './book.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  // private wishlistSubject = new BehaviorSubject<expectedBook[]>([]);
  // wishlist$ = this.wishlistSubject.asObservable();

  // addToWishlist(book: expectedBook) {
  //   const currentWishlist = this.wishlistSubject.value;
  //   if (!currentWishlist.find((b) => b.bookName === book.bookName)) {
  //     this.wishlistSubject.next([...currentWishlist, book]);
  //   }
  // }
  wishlist = signal<expectedBook[]>([]);

  addToWishlist(book: expectedBook) {
    const currentWishlist = this.wishlist();
    if (!currentWishlist.find((b) => b.bookName === book.bookName)) {
      this.wishlist.set([...currentWishlist, book]);
    }
  }

  removeFromWishlist(book: expectedBook) {
    this.wishlist.update((current) =>
      current.filter((item) => book.bookName != item.bookName)
    );
  }
}
