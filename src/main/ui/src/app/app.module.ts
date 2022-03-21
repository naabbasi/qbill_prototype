import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import LanguageDetector from 'i18next-browser-languagedetector';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './components/shared/shared.module';
import {LoginModule} from "./components/login/login.module";
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpService} from "./config/http.service";
import {FormsModule} from "@angular/forms";
import {AuthInterceptor} from "./config/interceptors/auth.interceptor";
import {
  defaultInterpolationFormat,
  I18NEXT_SERVICE,
  I18NextLoadResult,
  I18NextModule,
  ITranslationService
} from "angular-i18next";


const i18nextOptions = {
  debug: true,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        "welcome": "Welcome to QBill App",
        "dont_have_account": "Don't have account",
        "create_today": "Create Today",
        "lbl_username": "Username/Mobile Number",
        "username_placeholder": "Please enter your registered username or mobile number",
        "lbl_password": "Password",
        "forgot_password": "Forgot your password?",
        "sign_in_button": "Sign In",
        "users": "Users",
        "new_user": "Users",
        "all_user": "All Users",
        "bill_tax_types": "Bills Tax Types",
        "new_bill": "New Invoice",
        "all_bills": "All Bills",
        "update_profile": "Update Profile",
        "logout": "Logout",
      }
    },
    ar: {
      translation: {
        "welcome": "QBill مرحبًا بكم في تطبيق",
        "dont_have_account": "ليس لديك حساب؟",
        "create_today": "أنشئ اليوم!",
        "lbl_username": "اسم المستخدم / رقم الهاتف المحمول",
        "username_placeholder": "الرجاء إدخال اسم المستخدم المسجل أو رقم الهاتف المحمول",
        "lbl_password": "كلمه السر",
        "forgot_password": "نسيت رقمك السري؟",
        "sign_in_button": "تسجيل الدخول",
        "users": "المستخدمون",
        "new_user": "مستخدم جديد",
        "all_user": "جميع المستخدمين",
        "bill_tax_types": "أنواع ضريبة الفواتير",
        "new_bill": "فاتورة جديدة",
        "all_bills": "جميع الفواتير",
        "update_profile": "تحديث الملف",
        "logout": "تسجيل خروج",
      }
    }
  },
  interpolation: {
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  }
};

export function appInit(i18next: ITranslationService) {
  return () => {
    let promise: Promise<I18NextLoadResult> = i18next
      //.use(LocizeApi)
      .use<any>(LanguageDetector)
      .init(i18nextOptions);
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService)  {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    I18NextModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    LoginModule,
    SharedModule
  ],
  providers: [I18N_PROVIDERS, HttpService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
