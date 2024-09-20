import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoginComponent } from '../pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MatInputModule } from '@angular/material/input';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    FloatLabelModule,
    PasswordModule,
    CardModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    RippleModule,
    CascadeSelectModule,
    TabMenuModule,
    MenubarModule,
    MenuModule,
    ConfirmDialogModule,
    FormsModule,
    InputTextModule,
    MatInputModule,
    DialogModule,
    TableModule,
    BreadcrumbModule,
    IconFieldModule,
    InputIconModule,
  ],
  exports: [
    LoginComponent,
    FloatLabelModule,
    PasswordModule,
    CardModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    RippleModule,
    CascadeSelectModule,
    TabMenuModule,
    MenubarModule,
    MenuModule,
    ConfirmDialogModule,
    FormsModule,
    InputTextModule,
    MatInputModule,
    DialogModule,
    TableModule,
    BreadcrumbModule,
    IconFieldModule,
    InputIconModule,
  ],
  providers: [],
})
export class PrimengModule {}
