import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'learn-angular-lakshan';
  constructor(private authenticationService: AuthenticationService) {}

  hasAccess(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
