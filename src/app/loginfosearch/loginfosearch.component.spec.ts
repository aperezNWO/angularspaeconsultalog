import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginfosearchComponent } from './loginfosearch.component';

describe('LoginfosearchComponent', () => {
  let component: LoginfosearchComponent;
  let fixture: ComponentFixture<LoginfosearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginfosearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginfosearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
