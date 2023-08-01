import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPdfComponent } from './ver-pdf.component';

describe('VerPdfComponent', () => {
  let component: VerPdfComponent;
  let fixture: ComponentFixture<VerPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
