import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'transferList';
  llist: string[] = ['HTML', 'JavaScript', 'CSS', 'TypeScript'];
  rlist: string[] = ['React', 'Angular', 'Vue', 'Svelte'];
  llistselected: string[] = [];
  rlistselected: string[] = [];

  onLeftCheck(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      this.llistselected.push(value);
      console.log(this.llistselected);
    } else {
      this.llistselected = this.llistselected.filter((v) => v !== value);
      console.log(this.llistselected);
    }
  }
  onRightCheck(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      this.rlistselected.push(value);
    } else {
      this.rlistselected = this.rlistselected.filter((v) => v !== value);
    }
  }

  moveAllLeft() {
    this.llist = [...this.llist, ...this.rlist];
    this.llistselected.push(...this.rlistselected);
    this.rlist = [];
    this.rlistselected = [];
  }

  moveSelectedLeft() {
    this.llist = [...this.llist, ...this.rlistselected];
    this.llistselected = [...this.llistselected, ...this.rlistselected];
    this.rlist = this.rlist.filter((v) => !this.rlistselected.includes(v));
    this.rlistselected = [];
  }

  moveSelectedRight() {
    this.rlist = [...this.rlist, ...this.llistselected];
    this.rlistselected = [...this.rlistselected, ...this.llistselected];
    this.llist = this.llist.filter((v) => !this.llistselected.includes(v));
    this.llistselected = [];
  }

  moveAllRight() {
    this.rlist = [...this.llist, ...this.rlist];
    this.rlistselected.push(...this.llistselected);
    this.llist = [];
    this.llistselected = [];
  }
}
