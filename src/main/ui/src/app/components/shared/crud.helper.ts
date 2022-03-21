import {Supplier} from "../../entities/supplier";
import {Supply} from "../../entities/supply";
import {User} from "../../entities/user";
import {EndpointsHelper} from "./endpoints.helper";
import {HttpService} from "../../config/http.service";
import {Router} from "@angular/router";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {HttpResponse} from "@angular/common/http";
import {BillTaxTypes} from "../../entities/bill_tax_types";

export class CrudHelper<T> {
  readonly EDIT: string = "edit";
  readonly DELETE: string = "delete";
  private static ADMIN: string = "/admin/";
  private readonly ENDPOINT_SUPPLIERS_URL = CrudHelper.ADMIN + EndpointsHelper.SUPPLIERS;
  private readonly ENDPOINT_USERS_URL = CrudHelper.ADMIN + EndpointsHelper.USERS;
  private readonly ENDPOINT_BILLS_URL = CrudHelper.ADMIN + EndpointsHelper.BILLS;
  private http: HttpService<any>;
  private router: Router;
  private messageService: MessageService;
  private static confirmationService: ConfirmationService | null;

  constructor(http: HttpService<any>, router: Router, messageService: MessageService) {
    this.http = http;
    this.router = router;
    this.messageService = messageService;
  }

  static confirmationServiceRef(confirmationService: ConfirmationService) {
    CrudHelper.confirmationService = confirmationService;

    if (CrudHelper.confirmationService == null) {
      console.error("Please provide the message service object");
    }
  }

  actions(entityName: string, t: { entity: any }, action: string) {
    if (entityName === EndpointsHelper.SUPPLIERS) {
      let supplier: Supplier = t as unknown as Supplier;
      if (action === this.EDIT) {
        this.router.navigate([`${this.ENDPOINT_SUPPLIERS_URL}/register`], {queryParams: {supplierId: supplier.supplierId}}).then(r => console.log(r));
      } else if (action === this.DELETE) {
        this.http.delete(`${EndpointsHelper.SUPPLIERS}/${supplier.supplierId}`).subscribe((res: HttpResponse<any>) => {
          if (res.status === 202) {
            this.messageService.add({severity: 'success', summary: `${supplier.supplierName} has been deleted`});
          }
        });
      } else {
        this.messageService.add({severity: 'error', summary: 'Allowed actions (EDIT, DELETE)'});
      }
    } else if (entityName === EndpointsHelper.USERS) {
      let user: User = t as unknown as User;
      if (action === this.EDIT) {
        this.router.navigate([`${this.ENDPOINT_USERS_URL}/register`], {queryParams: {userId: user.userId}}).then(r => console.log(r))
      } else if (action === this.DELETE) {
        this.http.delete(`${EndpointsHelper.USERS}/${user.userId}`).subscribe((res: HttpResponse<any>) => {
          if (res.status === 202) {
            this.messageService.add({severity: 'success', summary: `${user.username} has been deleted`});
          }
        });
      } else {
        this.messageService.add({severity: 'error', summary: 'Allowed actions (EDIT, DELETE)'});
      }
    } else if (entityName === EndpointsHelper.BILLS) {
      let billTaxTypes: BillTaxTypes = t as unknown as BillTaxTypes;
      if (action === this.EDIT) {
        this.router.navigate([`${this.ENDPOINT_BILLS_URL}/create`], {queryParams: {genericKey: billTaxTypes.genericKey}}).then(r => console.log(r));
      } else if (action === this.DELETE) {
        this.http.delete(`${EndpointsHelper.BILLS}/${billTaxTypes.genericKey}`).subscribe((res: HttpResponse<any>) => {
          if (res.status === 202) {
            this.messageService.add({severity: 'success', summary: `${billTaxTypes.description} has been deleted`});
          }
        });
      } else {
        this.messageService.add({severity: 'error', summary: 'Allowed actions (EDIT, DELETE)'});
      }
    }
  }

  getConfirmation = (entityName: string, entity: any, action: string) => {
    if (CrudHelper.confirmationService !== null) {
      CrudHelper.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.actions(entityName, entity, action);
        },
        reject: (type: ConfirmEventType) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
              break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
              break;
          }
        },
        key: "positionDialog"
      });
    }
  }
}
