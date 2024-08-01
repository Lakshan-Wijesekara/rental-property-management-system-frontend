import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [],
  imports: [ButtonModule, MenuModule, MenubarModule, TabMenuModule],
  exports: [ButtonModule, MenuModule, MenubarModule, TabMenuModule],
  providers: [],
})
export class HomeModule {}
