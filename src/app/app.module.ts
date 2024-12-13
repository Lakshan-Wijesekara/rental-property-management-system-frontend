import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Interceptors/auth.interceptor.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PropertiesComponent } from './pages/properties/properties.component';
import { DropdownModule } from 'primeng/dropdown';
import { HeaderComponent } from './components/header/header.component';
import { PrimengModule } from './shared/primeng.module';
import { HomeModule } from './pages/home/home.module';
import { UsersComponent } from './pages/users/users.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ValidatorDirDirective } from './directives/tpvalidator.directive';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './components/map/map.component';
import { PropertyAddViewUpdateFeaturesComponent } from './components/property-features/property-add-view-update-features.component';
import { UserAddViewUpdateFeaturesComponent } from './components/user-features/user-add-view-update-features.component';
@NgModule({
  declarations: [
    AppComponent,
    PropertiesComponent,
    HeaderComponent,
    UsersComponent,
    ValidatorDirDirective,
    BreadcrumbComponent,
    MapComponent,
    PropertyAddViewUpdateFeaturesComponent,
    UserAddViewUpdateFeaturesComponent,
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
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
