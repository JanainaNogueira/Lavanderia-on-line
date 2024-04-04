import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAdmComponent } from './listar-adm.component';

describe('ListarAdmComponentt', () => {
  let component: ListarAdmComponent;
  let fixture: ComponentFixture<ListarAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAdmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
