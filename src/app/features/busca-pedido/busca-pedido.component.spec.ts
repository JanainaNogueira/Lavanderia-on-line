import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaPedidoComponent } from './busca-pedido.component';

describe('BuscaPedidoComponent', () => {
  let component: BuscaPedidoComponent;
  let fixture: ComponentFixture<BuscaPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
