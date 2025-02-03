import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diagnostico1Component } from './diagnostico1.component';

describe('Diagnostico1Component', () => {
  let component: Diagnostico1Component;
  let fixture: ComponentFixture<Diagnostico1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diagnostico1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diagnostico1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
