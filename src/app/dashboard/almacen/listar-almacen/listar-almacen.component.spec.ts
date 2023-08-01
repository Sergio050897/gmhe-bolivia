import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAlmacenComponent } from './listar-almacen.component';

describe('ListarAlmacenComponent', () => {
  let component: ListarAlmacenComponent;
  let fixture: ComponentFixture<ListarAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAlmacenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
