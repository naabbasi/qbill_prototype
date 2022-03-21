import {Component, OnInit} from '@angular/core';
import {Supplier} from "../../../entities/supplier";
import {HttpService} from "../../../config/http.service";
import {SupplierHelper} from "../../shared/entities-helper";
import {MessageService} from "primeng/api";
import {EndpointsHelper} from "../../shared/endpoints.helper";
import {HttpResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-register-supplier',
  templateUrl: './register-supplier.component.html',
  styleUrls: ['./register-supplier.component.css'],
  providers: [MessageService]
})
export class RegisterSupplierComponent implements OnInit {

  supplier: Supplier = new Supplier();
  supplierHelper: SupplierHelper = new SupplierHelper();
  supplierStatues: any;
  statusMessage: any;
  supplierSaved: boolean = false;
  error = {supplierName: '', supplierAddress: '', supplierMobileNumber: '', supplierStatus: ''};

  constructor(private http: HttpService<any>, private messageService: MessageService, private route: ActivatedRoute) {
    this.supplierStatues = this.supplierHelper.getSupplierStatues();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.supplier.supplierId = params.get('supplierId') === null ? null : String(params.get('supplierId'));

      if (this.supplier.supplierId !== null) {
        this.http.get(`${EndpointsHelper.SUPPLIERS}/${String(params.get('supplierId'))}`).subscribe((res: HttpResponse<any>) => {
          this.supplier = res.body;
        });
      }
    });
  }

  saveSupplier() {
    console.log(this.supplier);
    this.http.post(EndpointsHelper.SUPPLIERS, this.supplier).subscribe((res: HttpResponse<any>) => {
      if (res.status == 201) {
        this.supplierSaved = true;
        this.messageService.add({
          sticky: false,
          severity: 'info',
          summary: 'New Supplier',
          detail: `${res.body.supplierName} has been added`
        });
      }
    }, err => {
      this.error['supplierName'] = err.error['supplierName'] == null ? '' : err.error['supplierName'];
      this.error['supplierAddress'] = err.error['supplierAddress'] == null ? '' : err.error['supplierAddress'];
      this.error['supplierMobileNumber'] = err.error['supplierMobileNumber'] == null ? '' : err.error['supplierMobileNumber'];
      this.error['supplierStatus'] = err.error['supplierStatus'] == null ? '' : err.error['supplierStatus'];
    });
  }
}
