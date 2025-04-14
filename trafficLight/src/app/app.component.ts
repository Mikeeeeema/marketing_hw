import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'trafficLight';

  lights!: NodeListOf<Element>;
  lightSequence = [4000, 2000, 4000];

  currentIndex = 0;

  ngOnInit(): void {
    this.lights = document.querySelectorAll('.light');
    this.changeLight();
  }

  changeLight() {
    this.lights.forEach((light) => light.classList.remove('active'));

    let currentLight = this.lights[this.currentIndex];
    currentLight.classList.add('active');

    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.lights.length;
      this.changeLight();
    }, this.lightSequence[this.currentIndex]);
  }
}
