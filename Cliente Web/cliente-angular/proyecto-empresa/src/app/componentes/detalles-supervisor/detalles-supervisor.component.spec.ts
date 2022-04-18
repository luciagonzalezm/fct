import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesSupervisorComponent } from './detalles-supervisor.component';

describe('DetallesSupervisorComponent', () => {
  let component: DetallesSupervisorComponent;
  let fixture: ComponentFixture<DetallesSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
