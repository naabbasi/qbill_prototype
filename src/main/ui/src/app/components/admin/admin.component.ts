import {Component, Inject, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService, PrimeIcons} from "primeng/api";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {User} from "../../entities/user";
import {CrudHelper} from "../shared/crud.helper";
import {AppConfig} from "../../config/app.config";
import {I18NEXT_SERVICE, ITranslationService} from "angular-i18next";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AdminComponent implements OnInit {
  items: MenuItem[] = [];
  loading: boolean;
  userItems: MenuItem[] = [];
  localStorage: any;
  user: User = new User();

  constructor(@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService, private router: Router, private confirmationService: ConfirmationService) {
    this.localStorage = localStorage;
    this.loading = false;

    CrudHelper.confirmationServiceRef(confirmationService);

    this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.loading = true;
          console.log('NavigationStart', this.loading)
        } else if (event instanceof NavigationEnd) {
          this.loading = false;
          console.log('NavigationEnd', this.loading)
        }
      }
    );
  }


  ngOnInit(): void {
    this.user = JSON.parse(String(localStorage.getItem("user")));
    if (this.user === null) {
      this.redirectToLoginPage();
    }

    AppConfig.changeLayout();

    this.items = [
      {
        label: this.i18NextService.t('users'),
        items: [
          {
            label: this.i18NextService.t('new_user'),
            icon: PrimeIcons.PLUS_CIRCLE,
            routerLink: 'users/register'
          },
          {
            label: this.i18NextService.t('all_user'),
            routerLink: 'users'
          },
        ]
      },
      {
        label: this.i18NextService.t('bill_tax_types'),
        items: [
          {
            label: this.i18NextService.t('new_bill'),
            icon: PrimeIcons.PLUS_CIRCLE,
            routerLink: 'bills/create'
          },
          {
            label: this.i18NextService.t('all_bills'),
            routerLink: 'bills'
          },
        ]
      }
    ];

    this.userItems = [
      {
        label: this.i18NextService.t('update_profile'),
        icon: 'pi pi-external-link',
      },
      {
        label: this.i18NextService.t('logout'),
        icon: PrimeIcons.POWER_OFF,
        command: event => {
          this.onLogout();
        }
      }
    ];
  }

  onLogout() {
    this.localStorage.removeItem("user");
    this.localStorage.removeItem("i18nextLng");
    this.localStorage.removeItem("layout");

    setTimeout(()=>{
      AppConfig.changeLayout();
      this.redirectToLoginPage();
    },100);
  }

  private redirectToLoginPage() {
    this.router.navigate(['/login'],).then(r => {
      console.log("User Not Authenticated");
      window.location.reload();
    });
  }
}
