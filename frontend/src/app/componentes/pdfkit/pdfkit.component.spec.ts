import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfkitComponent } from './pdfkit.component';

describe('PdfkitComponent', () => {
  let component: PdfkitComponent;
  let fixture: ComponentFixture<PdfkitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfkitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
