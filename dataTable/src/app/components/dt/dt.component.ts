import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dt',
  imports: [CommonModule, FormsModule],
  templateUrl: './dt.component.html',
  styleUrl: './dt.component.scss',
})
export class DtComponent {
  users = signal<
    { id: number; name: string; age: number; occupation: string }[]
  >([]);
  pageSizeOptions: number[] = [5, 10, 20];
  currentPage: number = 1;
  pageSize: number = 5;
  sortColumn: string = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private http: HttpClient) {
    this.http
      .get<{ id: number; name: string; age: number; occupation: string }[]>(
        'assets/data.json'
      )
      .subscribe((data) => {
        console.log('data:', data);
        this.users.set(data);
      });
  }

  onPageSizeChange() {
    this.currentPage = 1;
  }

  get totalPages() {
    return Math.ceil(this.users().length / this.pageSize);
  }

  get getUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + Number(this.pageSize);
    console.log(typeof this.pageSize);
    console.log('start:', start, 'end:', end); // 调试信息
    let sortedUsers = this.users().slice(start, end);
    if (this.sortColumn) {
      sortedUsers.sort((a, b) => {
        const valueA = a[this.sortColumn as keyof typeof a];
        const valueB = b[this.sortColumn as keyof typeof b];
        if (valueA < valueB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        } else {
          return this.sortDirection === 'asc' ? 1 : -1;
        }
      });
    }
    return sortedUsers;
  }

  goPrevious() {
    if (this.currentPage - 1 > 0) {
      this.currentPage = this.currentPage - 1;
    }
  }

  goNext() {
    // const totalPages = Math.ceil(this.users.length / this.pageSize);
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.sortColumn = 'id';
      this.sortDirection = 'asc';
      console.log('curretnPage:', this.currentPage);
      console.log('pagesize:', this.pageSize);
      console.log('users:', this.getUsers.length);
    }
  }

  onSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    this.sortColumn = column;
  }
}
