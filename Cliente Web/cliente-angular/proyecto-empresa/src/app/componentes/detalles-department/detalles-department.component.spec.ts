import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesDepartmentComponent } from './detalles-department.component';

describe('DetallesDepartmentComponent', () => {
  let component: DetallesDepartmentComponent;
  let fixture: ComponentFixture<DetallesDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
