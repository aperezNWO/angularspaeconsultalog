import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultahistoricodineroComponent } from './consultahistoricodinero.component';

describe('ConsultahistoricodineroComponent', () => {
  let component: ConsultahistoricodineroComponent;
  let fixture: ComponentFixture<ConsultahistoricodineroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultahistoricodineroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultahistoricodineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
