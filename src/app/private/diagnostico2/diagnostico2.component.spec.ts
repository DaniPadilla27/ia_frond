import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diagnostico2Component } from './diagnostico2.component';

describe('Diagnostico2Component', () => {
  let component: Diagnostico2Component;
  let fixture: ComponentFixture<Diagnostico2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diagnostico2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diagnostico2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
