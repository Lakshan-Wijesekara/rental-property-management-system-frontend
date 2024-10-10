import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { appGuard } from './guards/app.guard';
import { AddPropertyComponent } from './pages/property/add-property.component';
import { AddUserComponent } from './pages/user/add-user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [appGuard],
    data: {
      title: 'Home',
      icon: 'pi-home',
    },
  },
  {
    path: 'properties',
    component: AddPropertyComponent,
    data: {
      title: 'Properties',
      icon: 'pi-building',
    },
  },
  {
    path: 'users',
    component: AddUserComponent,
    data: {
      title: 'Users',
      icon: 'pi-users',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
