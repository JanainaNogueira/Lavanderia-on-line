import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRoupasComponent } from './editar-roupas.component';

describe('EditarRoupasComponent', () => {
  let component: EditarRoupasComponent;
  let fixture: ComponentFixture<EditarRoupasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRoupasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarRoupasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
