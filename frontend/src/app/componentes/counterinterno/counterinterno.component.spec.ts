import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterinternoComponent } from './counterinterno.component';

describe('CounterinternoComponent', () => {
  let component: CounterinternoComponent;
  let fixture: ComponentFixture<CounterinternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterinternoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterinternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
