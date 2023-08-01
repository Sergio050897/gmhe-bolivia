import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVentasComponent } from './detalle-ventas.component';

describe('DetalleVentasComponent', () => {
  let component: DetalleVentasComponent;
  let fixture: ComponentFixture<DetalleVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
