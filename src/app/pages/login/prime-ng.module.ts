import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [],
  imports: [
    FloatLabelModule,
    PasswordModule,
    CardModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    RippleModule,
    BrowserAnimationsModule,
    CascadeSelectModule,
    TabMenuModule,
    MenubarModule,
    MenuModule,
  ],
  exports: [
    FloatLabelModule,
    PasswordModule,
    CardModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    RippleModule,
    BrowserAnimationsModule,
    CascadeSelectModule,
    TabMenuModule,
    MenubarModule,
    MenuModule,
  ],
  providers: [MessageService],
})
export class PrimeNgModule {}
