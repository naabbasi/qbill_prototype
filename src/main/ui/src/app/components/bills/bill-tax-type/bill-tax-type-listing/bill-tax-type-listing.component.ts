import { Component, OnInit } from '@angular/core';
import {BillTaxTypesHelper} from "../../../shared/entities-helper";
import {CrudHelper} from "../../../shared/crud.helper";
import {BillTaxTypes} from "../../../../entities/bill_tax_types";
import {EndpointsHelper} from "../../../shared/endpoints.helper";
import {HttpService} from "../../../../config/http.service";
import {Router} from "@angular/router";
import {LazyLoadEvent, MessageService} from "primeng/api";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-bill-tax-type-listing',
  templateUrl: './bill-tax-type-listing.component.html',
  styleUrls: ['./bill-tax-type-listing.component.css'],
  providers: [MessageService]
})
export class BillTaxTypeListingComponent implements OnInit {
  billsTaxTypes: BillTaxTypes[] = [];
  virtualBillsTaxTypes: BillTaxTypes[] = [];
  loading : boolean = false;
  selectedBillsTaxTypes: any;
  data: any;
  statusMessage: any;
  totalRecords: number = 0;
  billTaxTypesHelper: BillTaxTypesHelper = new BillTaxTypesHelper();
  crudHelper: CrudHelper<BillTaxTypes>;

  readonly BILL_ENDPOINT_URL = EndpointsHelper.BILLS;

  constructor(private http: HttpService<any>, private router: Router, private messageService: MessageService) {
    HttpService.messageServiceRef(messageService);
    this.crudHelper = new CrudHelper(http, router, messageService);
  }

  ngOnInit(): void {
    this.http.get(`${this.BILL_ENDPOINT_URL}/count`).subscribe((res: HttpResponse<any>) => {
      this.totalRecords = res.body;
    });
  }

  loadSuppliersLazy(event: LazyLoadEvent) {
    console.log(event.first, event.rows)
    //simulate remote connection with a timeout
    setTimeout(() => {
      this.loadDataFromServer(event.first, event.rows);
    });
  }

  private loadDataFromServer(first: number | undefined, rows: number | undefined){
    //trigger change detection
    let url = this.BILL_ENDPOINT_URL;

    if(typeof first === 'number' && typeof rows === 'number'){
      url = `${this.BILL_ENDPOINT_URL}/pageable?page=${first}&size=${rows}`;
    }

    this.loading = true;
    this.http.get(url).subscribe((res: HttpResponse<any>) => {
      if (res.status == 200) {
        this.loading = false;

        if (res.body['length'] !== 0) {
          this.virtualBillsTaxTypes = res.body;
        } else {
          console.log('Add notification')
        }
      }
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  onRowSelect(event: any) {
    this.messageService.add({severity:'info', summary:`Bill Selected`, detail: `${event.data['id']}`});
  }

  addBillTaxType() {
    this.router.navigate(['/admin/bills/create'], {})
  }
}
