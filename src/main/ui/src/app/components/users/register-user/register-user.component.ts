import {Component, OnInit} from '@angular/core';
import {UserHelper} from "../../shared/entities-helper";
import {HttpService} from "../../../config/http.service";
import {MessageService} from "primeng/api";
import {EndpointsHelper} from "../../shared/endpoints.helper";
import {HttpResponse} from "@angular/common/http";
import {User} from "../../../entities/user";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  providers: [MessageService]
})
export class RegisterUserComponent implements OnInit {

  userHelper = new UserHelper();
  user: User = new User();
  userSaved: boolean = false;
  error = {username: '', password: '', firstName: '', lastName: '', userStatus: '', userRoles: ''};

  constructor(private http: HttpService<any>, private messageService: MessageService, private route: ActivatedRoute) {
    HttpService.messageServiceRef(messageService);
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.user.userId = params.get('userId') === null ? null : String(params.get('userId'));
      this.user.username = params.get('username') === null ? "" : String(params.get('username'));

      if (this.user.userId !== null) {
        this.http.get(`${EndpointsHelper.USERS}/${String(params.get('userId'))}`).subscribe((res: HttpResponse<any>) => {
          this.user = res.body;
          if (this.user.assignedRoles != null) {
            this.user.userRoles = new Array();

            for (let assignedRole of this.user.assignedRoles) {
              let {role} = assignedRole;
              if (role != null && role.roleName != null) {
                this.user.userRoles.push(role.roleName);
              }
            }
          }
        });
      }
    });
  }

  registerUser() {
    this.http.post(EndpointsHelper.USERS, this.user).subscribe((res: HttpResponse<any>) => {
      if (res.status == 201) {
        this.userSaved = true;
        this.messageService.add({
          sticky: false,
          severity: 'info',
          summary: 'New User',
          detail: `${res.body.username} has been added`
        });
      }
    }, err => {
      this.error['username'] = err.error['username'] == null ? '' : err.error['username'];
      this.error['password'] = err.error['password'] == null ? '' : err.error['password'];
      this.error['firstName'] = err.error['firstName'] == null ? '' : err.error['firstName'];
      this.error['lastName'] = err.error['lastName'] == null ? '' : err.error['lastName'];
      this.error['userStatus'] = err.error['userStatus'] == null ? '' : err.error['userStatus'];
      this.error['userRoles'] = err.error['userRoles'] == null ? '' : err.error['userRoles'];
    });
  }

}
