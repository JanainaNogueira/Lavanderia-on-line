import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaPedidoComponent } from './consulta-pedido.component';
import { PedidoService } from '../services/pedido.service';

describe('ConsultaPedidoComponent', () => {
  let component: ConsultaPedidoComponent;
  let fixture: ComponentFixture<ConsultaPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaPedidoComponent ],
      providers: [ PedidoService ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
