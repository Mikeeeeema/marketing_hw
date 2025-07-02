import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { expectUser, ItemsEntity, rawRes } from './user.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'searchGithubuser';
  searchinput!: string;
  filterword?: string;
  users!: expectUser[];
  private http = inject(HttpClient);
  private url = 'https://api.github.com/search/users?q=';

  onSubmit() {
    if (this.searchinput) {
      console.log(this.searchinput);

      this.http
        .get<rawRes>(this.url + this.searchinput)
        .pipe(
          map((res: rawRes) => {
            return res.items?.map(
              (item: ItemsEntity) =>
                ({
                  id: item.id,
                  username: item.login,
                  url: item.url,
                } as expectUser)
            );
          })
        )
        .subscribe((res: expectUser[] | undefined) => {
          this.users = res ?? [];
          console.log(this.users);
        });
    }
  }

  filter() {
    if (this.filterword) {
      return this.users.filter((item: expectUser) =>
        item.username.includes(this.filterword ?? '')
      );
    } else {
      return this.users;
    }
  }
}
