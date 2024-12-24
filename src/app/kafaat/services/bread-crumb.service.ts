import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {
//   private breadcrumbData: { label: string, url: string }[] = [];

// constructor(private router: Router, private activatedRoute: ActivatedRoute) {
//   this.router.events
//     .pipe(filter(event => event instanceof NavigationEnd))
//     .subscribe(() => {
//       this.breadcrumbData = this.generateBreadcrumbData(this.activatedRoute.root);
//     });
// }

// private generateBreadcrumbData
// (route: ActivatedRoute, url: string = '', breadcrumbs: { label: string, url: string }[] = [])
// : { label: string, url: string }[] {
//   const children = route.children;

//   if (children.length === 0) {
//     return breadcrumbs;
//   }

//   for (const child of children) {
//     const routeUrl = child.snapshot.url.map(segment => segment.path).join('/');
//     if (routeUrl) {
//       url += `/${routeUrl}`;
//     }

//     const breadcrumbLabel = child.snapshot.data['breadcrumb'];
//     if (breadcrumbLabel) {
//       breadcrumbs.push({ label: breadcrumbLabel, url });
//     }

//     return this.generateBreadcrumbData(child, url, breadcrumbs);
//   }
// }

// getBreadcrumbData(): { label: string, url: string }[] {
//   return this.breadcrumbData;
// }
}