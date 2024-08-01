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
  ],
  providers: [MessageService],
})
export class LoginModule {}
