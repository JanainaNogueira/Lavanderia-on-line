import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirRoupaComponent } from './inserir-roupa.component';

describe('InserirRoupaComponent', () => {
  let component: InserirRoupaComponent;
  let fixture: ComponentFixture<InserirRoupaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserirRoupaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InserirRoupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
