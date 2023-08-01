import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaReporteComponent } from './proforma-reporte.component';

describe('ProformaReporteComponent', () => {
  let component: ProformaReporteComponent;
  let fixture: ComponentFixture<ProformaReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProformaReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
