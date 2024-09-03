import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { appGuard } from './guards/app.guard';
import { AddPropertyComponent } from './pages/add-property/add-property.component';
import { AddUserComponent } from './pages/add-user/add-user.component';

const routes: Routes = [
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
  },
  {
    path: 'add-property',
    component: AddPropertyComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
