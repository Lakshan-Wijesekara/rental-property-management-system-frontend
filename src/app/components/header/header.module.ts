import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MenubarModule } from 'primeng/menubar';
import { HomeModule } from '../../pages/home/home.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MenubarModule, HomeModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
