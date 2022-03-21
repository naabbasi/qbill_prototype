import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTaxTypeCreateUpdateComponent } from './bill-tax-type-create-update.component';

describe('BillTaxTypeCreateUpdateComponent', () => {
  let component: BillTaxTypeCreateUpdateComponent;
  let fixture: ComponentFixture<BillTaxTypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillTaxTypeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillTaxTypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
