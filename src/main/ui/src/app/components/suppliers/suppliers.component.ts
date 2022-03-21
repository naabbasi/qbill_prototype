import {Component, OnInit} from '@angular/core';
import {LazyLoadEvent, MessageService} from "primeng/api";
import {Supplier} from "../../entities/supplier";
import {HttpService} from "../../config/http.service";
import {SupplierHelper} from "../shared/entities-helper";
import {Router} from "@angular/router";
import {EndpointsHelper} from "../shared/endpoints.helper";
import {CrudHelper} from "../shared/crud.helper";
import {HttpResponse} from "@angular/common/http";

import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  providers: [MessageService]
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  virtualSuppliers: Supplier[] = [];
  loading : boolean = false;
  selectedSupplier: any;
  data: any;
  statusMessage: any;
  totalRecords: number = 0;
  supplierHelper: SupplierHelper = new SupplierHelper();
  crudHelper: CrudHelper<Supplier>;

  private readonly ENDPOINT_URL = EndpointsHelper.SUPPLIERS;

  constructor(private http: HttpService<any>, private router: Router, private messageService: MessageService) {
    HttpService.messageServiceRef(messageService);
    this.crudHelper = new CrudHelper(http, router, messageService);
  }

  ngOnInit(): void {
    this.http.get(`${this.ENDPOINT_URL}/count`).subscribe((res: HttpResponse<any>) => {
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
    let url = this.ENDPOINT_URL;

    if(typeof first === 'number' && typeof rows === 'number'){
      url = `${this.ENDPOINT_URL}/pageable?page=${first}&size=${rows}`;
    }

    this.loading = true;
    this.http.get(url).subscribe((res: HttpResponse<any>) => {
      if (res.status == 200) {
        this.loading = false;

        if (res.body['length'] !== 0) {
          this.virtualSuppliers = res.body;
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
    this.messageService.add({severity:'info', summary:`Supplier Selected`, detail: `${event.data['supplierName']} and contain ${event.data['supplies'].length} supplies`});
  }

  addSupply() {
    let {supplierId, supplierName} = this.selectedSupplier;
    this.router.navigate(['/admin/supply/add-supply'], {queryParams: {supplierId: supplierId, supplierName: supplierName}})
  }
}
