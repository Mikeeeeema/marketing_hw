import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('nameInput') nameInput!: ElementRef;
  title = 'inputControl';

  username: FormControl = new FormControl('');

  nameDataList: { name: string; age: number }[] = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 22 },
    { name: 'David', age: 28 },
  ];

  displayUserInfolist: { name: string; age: number }[] = [];

  constructor() {
    this.username.valueChanges.subscribe((value) => {
      this.filterNames(value);
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.nameInput.nativeElement, 'keyup')
      .pipe(map((event: any) => event.target.value))
      .subscribe((value) => {
        this.filterNames(value);
      });
  }

  filterNames(value: string) {
    this.displayUserInfolist = this.nameDataList.filter((user) => {
      return user.name.toLowerCase().includes(value.toLowerCase());
    });
  }
}
