import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuinternoComponent } from './menuinterno.component';

describe('MenuinternoComponent', () => {
  let component: MenuinternoComponent;
  let fixture: ComponentFixture<MenuinternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuinternoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuinternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
