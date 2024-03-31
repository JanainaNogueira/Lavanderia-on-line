import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarPedidoComponent } from './realizar-pedido.component';

describe('RealizarPedidoComponent', () => {
  let component: RealizarPedidoComponent;
  let fixture: ComponentFixture<RealizarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizarPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealizarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
