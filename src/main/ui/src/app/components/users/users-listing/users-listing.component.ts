import {Component, OnInit} from '@angular/core';

import {CrudHelper} from "../../shared/crud.helper";
import {EndpointsHelper} from "../../shared/endpoints.helper";
import {HttpService} from "../../../config/http.service";
import {LazyLoadEvent, MessageService} from "primeng/api";
import {User} from "../../../entities/user";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.css'],
  providers: [MessageService]
})
export class UsersListingComponent implements OnInit {

  users: User[] = [];
  virtualUsers: User[] = [];
  loading: boolean = false;
  selectedUser: any;
  rowData: any;
  totalRecords: number = 0;
  crudHelper: CrudHelper<User>;
  EndpointsHelper = EndpointsHelper;

  private readonly ENDPOINT_URL = EndpointsHelper.USERS;

  constructor(private http: HttpService<any>, private router: Router, private messageService: MessageService) {
    HttpService.messageServiceRef(messageService);
    this.crudHelper = new CrudHelper(http, router, messageService);
  }

  ngOnInit(): void {
    this.http.get(`${this.ENDPOINT_URL}/count`).subscribe((res: HttpResponse<any>) => {
      this.totalRecords = res.body;
    });
  }

  lazyLoadUsers(event: LazyLoadEvent) {
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
          this.virtualUsers = res.body;
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
    this.messageService.add({severity:'info', summary:`User Selected`, detail: `${event.data['username']}`});
    console.log(this.selectedUser);
  }

}
