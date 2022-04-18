import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoSupervisorComponent } from './nuevo-supervisor.component';

describe('NuevoSupervisorComponent', () => {
  let component: NuevoSupervisorComponent;
  let fixture: ComponentFixture<NuevoSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
