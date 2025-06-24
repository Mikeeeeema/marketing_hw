import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'flightBooker';
  flightType = 'one-way';
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0');
  yy = this.today.getFullYear();
  mindate = this.yy + '-' + this.mm + '-' + this.dd;
  mindate1 = new Date().toISOString().split('T')[0];
  departureDate?: string;
  returnDate?: string;
  ngOnInit() {
    console.log(this.today);
    console.log(this.dd);
    console.log(this.mm);
    console.log(this.yy);
  }

  book() {
    if (!this.departureDate) {
      alert('Please choose departure date!');
    } else if (this.flightType === 'one-way') {
      alert(`You have booked a one-way flight on ${this.departureDate}`);
    } else if (this.flightType === 'round-trip' && !this.returnDate) {
      alert('Please choose return date!');
    } else {
      alert(
        `You have booked a return flight, departing on ${this.departureDate} and returning on ${this.returnDate}`
      );
    }
  }
}
