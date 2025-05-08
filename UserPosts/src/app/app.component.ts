import {
  Component,
  effect,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from './services/users.interface';
import { UsersService } from './services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'UserPosts';
  private userService = inject(UsersService);
  users: Signal<Users[]> = this.userService.users;
  ifChoose: boolean = false;
  isloading: boolean = false;
  expandedUserId: number | null = null;
  posts = this.userService.postsSignal;

  ngOnInit(): void {
    this.userService.fetchUsers();
  }

  onExpand(id: number): void {
    this.expandedUserId = id;
    this.isloading = true;
    this.userService.fetchPost(id).subscribe(() => {
      setTimeout(() => {
        this.isloading = false;
      }, 2000);
    });
    // this.ifChoose = true;
  }
}
