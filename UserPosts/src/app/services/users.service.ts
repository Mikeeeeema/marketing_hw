import { inject, Injectable, Signal, signal } from '@angular/core';
import { Posts, Users } from './users.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/';
  private usersUrl = this.baseUrl + 'users';
  private postsUrl = this.baseUrl + 'posts?userId=';
  usersSignal = signal<Users[]>([]);
  postsSignal = signal<Posts[]>([]);

  private http = inject(HttpClient);

  get users() {
    return this.usersSignal;
  }

  get posts() {
    return this.postsSignal;
  }

  fetchUsers() {
    this.http
      .get<Users[]>(this.usersUrl)
      .subscribe((data) => this.usersSignal.set(data));
  }

  fetchPost(id: number) {
    return this.http
      .get<Posts[]>(this.postsUrl + id)
      .pipe(tap((data) => this.postsSignal.set(data)));
  }
}
