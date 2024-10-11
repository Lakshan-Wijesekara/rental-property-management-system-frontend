import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PropertyComponent } from './pages/property/property.component';
import { DropdownModule } from 'primeng/dropdown';
import { HeaderComponent } from './components/header/header.component';
import { PrimengModule } from './shared/primeng.module';
import { HomeModule } from './pages/home/home.module';
import { UserComponent } from './pages/user/user.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ValidatorDirDirective } from './directives/tpvalidator.directive';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './components/map/map.component';
import { PropertyFeatureComponent } from './components/property-feature/property-feature.component';
import { UserFeatureComponent } from './components/user-feature/user-feature.component';
@NgModule({
  declarations: [
    AppComponent,
    PropertyComponent,
    HeaderComponent,
    UserComponent,
    ValidatorDirDirective,
    BreadcrumbComponent,
    MapComponent,
    PropertyFeatureComponent,
    UserFeatureComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    PrimengModule,
    HomeModule,
    ReactiveFormsModule,
    TextFieldModule,
    GoogleMapsModule,
  ],
  providers: [provideHttpClient(), ConfirmationService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
