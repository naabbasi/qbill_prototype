import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTaxTypeListingComponent } from './bill-tax-type-listing.component';

describe('BillTaxTypeListingComponent', () => {
  let component: BillTaxTypeListingComponent;
  let fixture: ComponentFixture<BillTaxTypeListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillTaxTypeListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillTaxTypeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
