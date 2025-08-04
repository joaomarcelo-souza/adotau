import { Component, inject } from '@angular/core';
import { BreadcrumbService } from './service/breadcrumb.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class Breadcrumb {
  constructor(public breadcrumbService: BreadcrumbService) {}
}
