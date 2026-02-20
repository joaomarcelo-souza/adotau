// src/app/services/breadcrumb.service.ts
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../models/breadcrumb.model';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  breadcrumbs: Breadcrumb[] = [];

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
      });
  }

  private buildBreadcrumb(route: ActivatedRoute): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [];
    let currentRoute = route;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      const breadcrumb = currentRoute.snapshot.data['breadcrumb'];
      const path = currentRoute.snapshot.url.map((s) => s.path).join('/');

      if (breadcrumb && path) {
        breadcrumbs.push({
          label:
            typeof breadcrumb === 'function'
              ? breadcrumb(currentRoute.snapshot.data)
              : breadcrumb,
          url: '/' + path,
        });
      }
    }

    return breadcrumbs;
  }
}
