import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent implements OnInit {
  breadcrumb: MenuItem[] = [];

  items: MenuItem[] = [];
  home: MenuItem | undefined;
  properties: MenuItem | undefined;
  users: MenuItem | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', value: 'home' },
      { label: 'Properties', icon: 'pi pi-building', value: 'properties' },
      { label: 'Users', icon: 'pi pi-users', value: 'users' },
    ];
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let temp = event.urlAfterRedirects.split('/');
        const lastURL = temp[temp.length - 1];
        const breadcrumbTitle = this.items.find((x) => x['value'] == lastURL);
        this.breadcrumb = [
          { label: breadcrumbTitle?.label, icon: breadcrumbTitle?.icon },
        ];
      }
    });
  }
}
