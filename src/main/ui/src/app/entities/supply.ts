export class Supply {
  supplyId: string | null;
  supplier: any = {
    supplierId: null,
    supplierName: null,
  };
  supplyDateTime: string | null;
  supplyPurchaseAmount: number | null;
  supplyQuantity: number | null;
  supplyPrice?: number = 0;

  constructor() {
    this.supplyId = null;
    this.supplier = {
      supplierId: null,
      supplierName: null
    }
    this.supplyDateTime = null;
    this.supplyPurchaseAmount = null;
    this.supplyQuantity = null;
  }
}
