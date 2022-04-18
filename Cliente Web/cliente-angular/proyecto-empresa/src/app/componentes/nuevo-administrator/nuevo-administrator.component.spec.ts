import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAdministratorComponent } from './nuevo-administrator.component';

describe('NuevoAdministratorComponent', () => {
  let component: NuevoAdministratorComponent;
  let fixture: ComponentFixture<NuevoAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAdministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
