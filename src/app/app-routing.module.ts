import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { appGuard } from './guards/app.guard';
import { PropertiesComponent } from './pages/properties/properties.component';
import { UsersComponent } from './pages/users/users.component';

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
    component: PropertiesComponent,
    canActivate: [appGuard],
    data: {
      title: 'Properties',
      icon: 'pi-building',
    },
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [appGuard],
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
