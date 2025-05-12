import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtComponent } from './dt.component';

describe('DtComponent', () => {
  let component: DtComponent;
  let fixture: ComponentFixture<DtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
