import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    ButtonModule,
    MenuModule,
    MenubarModule,
    TabMenuModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    BreadcrumbModule,
    RouterModule,
    CommonModule,
  ],
  exports: [
    HomeComponent,
    ButtonModule,
    MenuModule,
    MenubarModule,
    TabMenuModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    BreadcrumbModule,
    RouterModule,
    CommonModule,
  ],
  providers: [],
})
export class HomeModule {}
