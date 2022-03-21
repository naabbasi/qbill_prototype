export class UserHelper {
  static readonly ACTIVE = 'ACTIVE';
  static readonly IN_ACTIVE = 'IN_ACTIVE';
  static readonly ADMIN = 'ADMIN';
  static readonly CUSTOMER = 'CUSTOMER';
  userStatues = ['Please select status', UserHelper.ACTIVE, UserHelper.IN_ACTIVE];
  userRoles = [UserHelper.ADMIN, UserHelper.CUSTOMER];

  public getUserStatues() {
    return this.userStatues;
  }

  public getUserRoles() {
    return this.userRoles;
  }
}


export class SupplierHelper {
  supplierStatues = ['Please select status', 'ACTIVE', 'IN_ACTIVE'];

  public getSupplierStatues() {
    return this.supplierStatues;
  }
}

export class BillTaxTypesHelper {
  supplierStatues = ['ACTIVE', 'OBSOLETE'];

  public getLifeCycleState() {
    return this.supplierStatues;
  }
}
