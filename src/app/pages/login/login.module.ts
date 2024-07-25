import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from "primeng/password";



@NgModule({
    declarations: [],
    imports: [
      FloatLabelModule,
      PasswordModule,
      CardModule,
      ButtonModule

    ],
    exports:[
      FloatLabelModule,
      PasswordModule,
      CardModule,
      ButtonModule
    ],
    providers: [],
  })
  export class LoginModule {}