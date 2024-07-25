import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDialogComponent } from './pedido-dialog.component';

describe('PedidoDialogComponent', () => {
  let component: PedidoDialogComponent;
  let fixture: ComponentFixture<PedidoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
