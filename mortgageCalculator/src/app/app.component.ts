import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mortgageCalculator';
  mortgageinput!: FormGroup;
  private fb = inject(FormBuilder);
  mpa!: number;
  tpa!: number;
  tip!: number;

  ngOnInit() {
    this.mortgageinput = this.fb.group({
      loanamount: 100000,
      loanterm: 33,
      apr: 3,
    });
  }
  onSubmit() {
    console.log(this.mortgageinput.get('loanamount')?.value);
    const p = this.mortgageinput.get('loanamount')?.value;
    const i = this.mortgageinput.get('apr')?.value / 100 / 12;
    const n = this.mortgageinput.get('loanterm')?.value * 12;

    this.mpa = (p * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);
    this.tpa = this.mpa * n;
    this.tip = this.tpa - p;
  }
}
