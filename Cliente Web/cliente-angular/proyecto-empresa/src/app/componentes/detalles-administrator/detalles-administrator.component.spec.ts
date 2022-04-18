import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAdministratorComponent } from './detalles-administrator.component';

describe('DetallesAdministratorComponent', () => {
  let component: DetallesAdministratorComponent;
  let fixture: ComponentFixture<DetallesAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesAdministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
