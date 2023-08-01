import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEnviosComponent } from './crear-envios.component';

describe('CrearEnviosComponent', () => {
  let component: CrearEnviosComponent;
  let fixture: ComponentFixture<CrearEnviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEnviosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
