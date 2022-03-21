import {NgModule} from '@angular/core';

import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from "primeng/sidebar";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {DropdownModule} from "primeng/dropdown";
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import {InputMaskModule} from 'primeng/inputmask';

import {ScrollingModule} from '@angular/cdk/scrolling';
import {VirtualScroller} from "primeng/virtualscroller";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from "primeng/toast";
import {ContextMenuModule} from "primeng/contextmenu";
import {DialogModule} from "primeng/dialog";
import {ProgressBarModule} from "primeng/progressbar";
import {SliderModule} from "primeng/slider";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {SplitButtonModule} from "primeng/splitbutton";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
  declarations: [],
  imports: [ScrollingModule],
  exports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
        CheckboxModule,
    SidebarModule,
    TableModule,
    ToolbarModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    ScrollingModule,
    InputMaskModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule,
    SliderModule,
    DialogModule,
    ContextMenuModule,
    ProgressBarModule,
    PasswordModule,
    DividerModule,
    SplitButtonModule,
  ],
    providers: [VirtualScroller],
    bootstrap: []
  })
  export class SharedModule { }
