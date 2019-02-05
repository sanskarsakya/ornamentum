import { Component } from '@angular/core';

import {
  demoSnippet,
  headerDetailsUsage,
  showColumnSelectorUsage,
  showRefreshButtonUsage,
  titleUsage
} from './data-table-header-details.list';

import { FileType } from 'helper-models';

@Component({
  selector: 'app-data-table-header-details-component',
  templateUrl: './data-table-header-details.component.html',
  styleUrls: ['./data-table-header-details.component.scss']
})
export class DataTableHeaderDetailsComponent {
  public FileType = FileType;

  public demoSnippet = demoSnippet;

  public headerDetailsUsage = headerDetailsUsage;
  public showRefreshButtonUsage = showRefreshButtonUsage;
  public titleUsage = titleUsage;
  public showColumnSelectorUsage = showColumnSelectorUsage;
}
