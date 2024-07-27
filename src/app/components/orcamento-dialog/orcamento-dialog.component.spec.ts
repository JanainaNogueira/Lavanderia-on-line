import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoDialogComponent } from './orcamento-dialog.component';

describe('OrcamentoDialogComponent', () => {
  let component: OrcamentoDialogComponent;
  let fixture: ComponentFixture<OrcamentoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcamentoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrcamentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
