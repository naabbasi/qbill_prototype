import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../config/http.service";
import {User} from "../../entities/user";
import {MessageService} from "primeng/api";
import {HttpResponse} from "@angular/common/http";
import {UserHelper} from "../shared/entities-helper";
import {I18NEXT_SERVICE, ITranslationService} from "angular-i18next";
import {DOCUMENT} from "@angular/common";
import {Direction} from "@angular/cdk/bidi";
import {AppConfig} from "../../config/app.config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  language: string = 'en';
  componentDirection: Direction = 'ltr';
  users: User = new User();
  loading: boolean = false;
  loginLabel: string = "";
  error = {username: '', password: ''};

  constructor(@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
              @Inject(DOCUMENT) private document: Document, private router: Router,
              private http: HttpService<any>, private messageService: MessageService) {
    HttpService.messageServiceRef(messageService);
  }

  ngOnInit(): void {
    this.i18NextService.events.initialized.subscribe((e) => {
      if (e) {
        this.updateState(this.i18NextService.language);
      }
    });

    this.loginLabel = this.i18NextService.t('sign_in_button');
    AppConfig.changeLayout();
  }

  onLogin() {
    this.users.firstName = 'not_null';
    this.users.lastName = 'not_null';
    this.users.userStatus = UserHelper.ACTIVE;
    this.loading = true;
    this.loginLabel = "Logging in ...";
    this.http.post("users/login", this.users).subscribe((res: HttpResponse<any>) => {
      if (res.status == 200) {
        localStorage.setItem("user", JSON.stringify(res.body));
        this.updateState(String(res.body['locale']));
        this.router.navigate(['admin']).then(r => {
          console.log('redirected to admin', r);
          window.location.reload();
        })
      }
    }, err => {
      this.loading = false;
      this.loginLabel = "Sign In";
      console.log(err.error);
      this.error['username'] = err.error['username'] == null ? '' : err.error['username'];
      this.error['password'] = err.error['password'] == null ? '' : err.error['password'];
    });
  }

  changeLanguage(lang: string){
    if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(lang).then(x => {
        this.updateState(lang);
        document.location.reload();
      });
    }
  }

  private updateState(lang: string) {
    localStorage.removeItem("layout");
    this.language = lang === 'null' ? 'en' : lang;
    const direction = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("i18nextLng", this.language);
    localStorage.setItem("layout", JSON.stringify({lang: lang, direction: direction}));
  }
}
