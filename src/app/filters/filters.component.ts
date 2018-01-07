import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  /**
   * Array of filters
   */
  @Input() filters = [];
  /**
   * Notify parent that we want to filter some records
   *
   * @type {EventEmitter<any>}
   */
  @Output() filterRecords: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Set up class
   */
  constructor() { }

  /**
   * Initialize component / view data
   */
  ngOnInit() { }

  /**
   * Resets filters to their default values
   */
  clear() {
    _.each(this.filters, function (filter) {
      if (filter.type === 'date') {
        filter.fromDate = filter.initialFromDate;
        filter.toDate = filter.initialToDate;
      } else {
        filter.value = filter.initialValue;
      }
    });

    this.filter();
  }

  /**
   * Called when user clicks on filter button to filter with supplied set of filters
   */
  filter() {
    this.filterRecords.emit(this.filters);
  }

}
