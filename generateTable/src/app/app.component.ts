import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'generateTable';
  input!: FormGroup;
  private fb = inject(FormBuilder);
  row: number = 0;
  col: number = 0;
  table: number[][] = [];

  ngOnInit() {
    this.input = this.fb.group({
      row: ['3'],
      col: ['4'],
    });
    this.onSubmit();
  }

  onSubmit() {
    //
    console.log('row:', this.input.get('row')?.value);
    console.log('col:', this.input.get('col')?.value);
    console.log(typeof this.input.get('col')?.value);
    this.row = Number(this.input.get('row')?.value);
    this.col = Number(this.input.get('col')?.value);
    const table1: number[][] = Array.from({ length: this.row }, () =>
      Array(this.col).fill(0)
    );
    console.log('table1:', table1);
    const len: number = this.row * this.col;
    let num = 1;
    let ifEven = true;

    for (let i = 0; i < this.col; i++) {
      if (ifEven) {
        for (let j = 0; j < this.row; j++) {
          table1[j][i] = num;
          num++;
        }
        ifEven = false;
      } else {
        for (let j = this.row - 1; j >= 0; j--) {
          table1[j][i] = num;
          num++;
        }
        ifEven = true;
      }
    }

    this.table = table1;
  }
}
