import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'selectAllTemplateDrivenForm';
  itemlist = [
    'Changjinhu (2021)',
    'Dune (2021)',
    'Shang-Chi and the Legend of the Ten Rings (2021)',
    'Free Guy (2021)',
    'The Many Saints of Newark (2021)',
    'Finch (2021)',
    'Candyman (2021)',
    'No Time to Die (2021)',
    'Halloween Kills (2021)',
  ];
  allSelected: boolean = false;
  selectedMovies: boolean[] = new Array(this.itemlist.length).fill(false);

  updateSelectAll() {
    this.selectedMovies.fill(this.allSelected);
  }

  updateSelectedMoiveList() {
    this.allSelected = this.selectedMovies.every((item) => item);
  }

  clearAll() {
    this.selectedMovies = this.selectedMovies.map((item) => false);
    this.allSelected = false;
  }

  ifSelectedMoive(): boolean {
    return this.selectedMovies.some((item) => item);
  }

  getSelectedMoives(): string[] {
    return this.itemlist.filter((item, i) => this.selectedMovies[i]);
  }
}
