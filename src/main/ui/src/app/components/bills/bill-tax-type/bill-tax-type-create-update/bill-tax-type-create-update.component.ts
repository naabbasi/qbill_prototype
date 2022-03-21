import {Component, OnInit, ViewChild} from '@angular/core';
import {BillTaxTypes} from "../../../../entities/bill_tax_types";
import {BillTaxTypesHelper} from "../../../shared/entities-helper";
import {MessageService} from "primeng/api";
import {HttpService} from "../../../../config/http.service";
import {EndpointsHelper} from "../../../shared/endpoints.helper";
import {HttpResponse} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {Calendar} from "primeng/calendar";
import {CrudHelper} from "../../../shared/crud.helper";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-bill-tax-type-create-update',
  templateUrl: './bill-tax-type-create-update.component.html',
  styleUrls: ['./bill-tax-type-create-update.component.css'],
  providers: [MessageService, DatePipe]
})
export class BillTaxTypeCreateUpdateComponent implements OnInit {
  bill: BillTaxTypes;
  billTaxTypesHelper: BillTaxTypesHelper = new BillTaxTypesHelper();
  error = {id: '', description: '', creator: '', changer: '', lifeCycleState: '', glCode: '', genericKey: ''};
  billSaved : boolean = false;
  crudHelper: CrudHelper<BillTaxTypes>;

  constructor(private http: HttpService<any>, private router: Router, private route: ActivatedRoute,
              private messageService: MessageService, private datePipe: DatePipe) {
    this.bill = new BillTaxTypes();
    HttpService.messageServiceRef(messageService);
    this.crudHelper = new CrudHelper(http, router, messageService);
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.bill.genericKey = params.get('genericKey') === null ? '' : String(params.get('genericKey'));

      if (this.bill.genericKey !== '') {
        this.http.get(`${EndpointsHelper.BILLS}/${String(params.get('genericKey'))}`).subscribe((res: HttpResponse<any>) => {
          this.bill = res.body;
        });
      }
    });
  }

  saveOrUpdateBill() {
    let user = JSON.parse(String(localStorage.getItem("user")));
    if(this.bill.genericKey === ''){
      this.bill.creator = user['username'];
      this.bill.created = `${this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm a')}`;
    } else {
      this.bill.changer = user['username'];
      this.bill.changed = `${this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm a')}`;
    }

    this.http.post(EndpointsHelper.BILLS, this.bill).subscribe((res: HttpResponse<any>) => {
      if (res.status == 201) {
        this.billSaved = true;
        this.messageService.add({
          sticky: false,
          severity: 'info',
          summary: 'Bill Information',
          detail: `${res.body.id} has been ${this.bill.genericKey === '' ? 'added' : 'updated'}`
        });
      }
    }, err => {
      this.error['id'] = err.error['id'] == null ? '' : err.error['id'];
      this.error['description'] = err.error['description'] == null ? '' : err.error['description'];
      this.error['lifeCycleState'] = err.error['lifeCycleState'] == null ? '' : err.error['lifeCycleState'];
    });
  }
}
