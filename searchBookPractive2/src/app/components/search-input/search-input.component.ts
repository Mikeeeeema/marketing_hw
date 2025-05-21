import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, map, mergeMap, switchMap, tap } from 'rxjs';
import { BooksService } from '../../services/books.service';
import {
  ItemsEntity,
  searchRes,
  expectbook,
} from '../../services/books.interface';

@Component({
  selector: 'app-search-input',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent implements OnInit {
  // searchinput!: string;
  searchinput = new FormControl('', { nonNullable: true });
  booksService = inject(BooksService);

  ngOnInit(): void {
    this.searchinput.valueChanges
      .pipe(
        debounceTime(500),
        filter((input: string) => input.trim().length > 0),
        switchMap((input: string) => {
          return this.booksService.search(input);
        })
      )
      .subscribe
      //   (data) => {
      //   console.log(data);
      // }
      ();
  }
}
