import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloseccionComponent } from './tituloseccion.component';

describe('TituloseccionComponent', () => {
  let component: TituloseccionComponent;
  let fixture: ComponentFixture<TituloseccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TituloseccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TituloseccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
