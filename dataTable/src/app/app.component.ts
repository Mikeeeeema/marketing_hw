import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DtComponent } from './components/dt/dt.component';
import { AddProgressComponent } from './components/add-progress/add-progress.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DtComponent, AddProgressComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dataTable';
}
