import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DropdownLoadingSpinnerTemplateComponent } from './index';

/**
 * Represent dropdown loading spinner template routes.
 */
const dropdownLoadingSpinnerTemplateRoutes: Routes = [
  {
    component: DropdownLoadingSpinnerTemplateComponent,
    path: ''
  }
];

/**
 * Dropdown loading spinner template routing module.
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(dropdownLoadingSpinnerTemplateRoutes)]
})
export class DropdownLoadingSpinnerTemplateRoutingModule {
}
