import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraPlanoContasComponent } from './cadastra-plano-contas.component';

describe('CadastraPlanoContasComponent', () => {
  let component: CadastraPlanoContasComponent;
  let fixture: ComponentFixture<CadastraPlanoContasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastraPlanoContasComponent]
    });
    fixture = TestBed.createComponent(CadastraPlanoContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
