import { Component, Input } from '@angular/core';
import { ColumnSelectorProperty } from '../../models/data-table.model';

@Component({
  selector: 'ng-data-table-column-selector',
  templateUrl: './data-table-column-selector.component.html'
})
export class DataTableColumnSelectorComponent {
  @Input()
  public props: ColumnSelectorProperty;
}
