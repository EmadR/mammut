import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeremoniesComponent } from './ceremonies.component';

describe('CeremoniesComponent', () => {
  let component: CeremoniesComponent;
  let fixture: ComponentFixture<CeremoniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeremoniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeremoniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
