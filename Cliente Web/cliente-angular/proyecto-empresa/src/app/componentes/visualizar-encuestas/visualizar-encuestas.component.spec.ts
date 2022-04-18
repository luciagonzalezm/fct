import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarEncuestasComponent } from './visualizar-encuestas.component';

describe('VisualizarEncuestasComponent', () => {
  let component: VisualizarEncuestasComponent;
  let fixture: ComponentFixture<VisualizarEncuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarEncuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
