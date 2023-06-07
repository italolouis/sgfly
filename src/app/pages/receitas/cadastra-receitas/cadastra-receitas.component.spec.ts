import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraReceitasComponent } from './cadastra-receitas.component';

describe('CadastraReceitasComponent', () => {
  let component: CadastraReceitasComponent;
  let fixture: ComponentFixture<CadastraReceitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastraReceitasComponent]
    });
    fixture = TestBed.createComponent(CadastraReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
