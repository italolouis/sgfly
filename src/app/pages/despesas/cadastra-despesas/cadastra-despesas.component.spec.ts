import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraDespesasComponent } from './cadastra-despesas.component';

describe('CadastraDespesasComponent', () => {
  let component: CadastraDespesasComponent;
  let fixture: ComponentFixture<CadastraDespesasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastraDespesasComponent]
    });
    fixture = TestBed.createComponent(CadastraDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
