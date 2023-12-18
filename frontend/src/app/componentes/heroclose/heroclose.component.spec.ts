import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerocloseComponent } from './heroclose.component';

describe('HerocloseComponent', () => {
  let component: HerocloseComponent;
  let fixture: ComponentFixture<HerocloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HerocloseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HerocloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
