import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
  ],
  providers: [],
})
export class HomeModule {}
