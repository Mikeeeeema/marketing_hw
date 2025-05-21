import { Component } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { BooklistComponent } from '../booklist/booklist.component';
import { WishlistComponent } from '../wishlist/wishlist.component';

@Component({
  selector: 'app-home',
  imports: [SearchInputComponent, BooklistComponent, WishlistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
