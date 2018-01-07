import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import * as _ from 'lodash';

/**
 * AppComponent
 *  Responsible for setting up the Dashboard main view
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * Listing of divisions (created from the listing of records)
   *
   * @type {Array}
   */
  divisions = [];
  /**
   * List of filters to filter data by
   *
   * @type {Array}
   */
  filters = [];
  /**
   * Initial listing of records (so that we have something to revert back to)
   */
  initialRecords: any;
  /**
   * Listing of records
   */
  records: any;
  /**
   * Search Text
   */
  searchText: string;
  /**
   * Whether to display filtering interface
   */
  showFilters: boolean;
  /**
   * Title of the Page
   *
   * @type {string}
   */
  title = 'The Project Dashboard';

  /**
   * Instantiates this class and adds a reference to the DataService
   *
   * @param {DataService} _data
   */
  constructor(private _data: DataService) {}

  /**
   * Initializes class variables
   */
  ngOnInit() {
    this._data.recordObservable.subscribe((res) => {
      this.records = _.orderBy(res, ['division'], ['asc']);
      this.initialRecords = _.clone(this.records);
      this.divisions = _.groupBy(this.records, 'division');
      this.filters = this.setupFilters(this.records[0]);
      this.searchText = '';
      this.showFilters = false;
    });
  }

  /**
   * Filters data by selected division
   *
   * @param divisionName
   * @param divisionObject
   */
  filterByDivision(divisionName, divisionObject) {
    let selected = divisionObject.selected,
      filter = _.find(this.filters, {key: 'division'});

    this.resetDivisions();
    divisionObject.selected = !selected;

    if (filter) {
      filter.value = divisionObject.selected ? divisionName : '';
    }

    console.log('filter', divisionObject.selected, filter);

    this.filterRecords(this.filters);
  }

  /**
   * Filters the records
   *
   * @param filters
   */
  filterRecords(filters) {
    this.filters = filters;
    this.records = _.clone(this.initialRecords);

    this.search(this.searchText, true);

    this.records = _.filter(this.records, function (rec) {
      let returnVal = true;

      _.each(filters, function (filter) {
        if (filter.type === 'date') {
          let recDate = new Date(rec[filter.key]);

          if (returnVal && typeof filter.fromDate === 'object') {
            returnVal = recDate >= filter.fromDate;
          }

          if (returnVal && typeof filter.toDate === 'object') {
            returnVal = recDate <= filter.toDate;
          }
        } else if (returnVal && filter.value && filter.type === 'number' && filter.value !== 0) {
          returnVal = _.startsWith(rec[filter.key], filter.value);
        } else if (returnVal && filter.value && filter.value !== '') {
          returnVal = _.startsWith(rec[filter.key].toLowerCase(), filter.value.toLowerCase());
        }
      });

      return returnVal;
    });
  }

  /**
   * Resets selected property of all divisions back to default value
   */
  resetDivisions() {
    _.forIn(this.divisions, function (div) {
      div.selected = false;
    });
  }

  /**
   * Filters results by property values which start with specified searchText
   *
   * @param searchText
   * @param filtering
   */
  search(searchText, filtering) {
    searchText = searchText.trim().toLowerCase();

    if (!filtering) {
      this.filterRecords(this.filters);
    }

    this.records = _.filter(this.records, function (rec) {
      let returnVal = false;

      _.forIn(rec, function (v) {
        if (_.startsWith((v + '').toLowerCase(), searchText)) {
          returnVal = true;
        }
      });

      return returnVal;
    });
  }

  /**
   * Setup filters for filtering data by corresponding type
   *
   * @param record
   */
  setupFilters(record) {
    let filters = [];
    let keys = Object.keys(record);

    _.each(keys, function (key) {
      let formattedKey = _.capitalize(_.words(key).join(' '));

      if (typeof record[key] === 'number') {
        filters.push({
          key: key,
          prettyKey: formattedKey,
          type: 'number',
          initialValue: '',
          value: ''
        });
      } else if (/^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/gi.exec(record[key])) {
        filters.push({
          key: key,
          prettyKey: formattedKey,
          type: 'date',
          initialFromDate: new Date('01/01/1900'),
          fromDate: new Date('01/01/1900'),
          initialToDate: new Date(),
          toDate: new Date()
        });
      } else {
        filters.push({
          key: key,
          prettyKey: formattedKey,
          type: 'string',
          initialValue: '',
          value: ''
        });
      }
    }.bind(this));

    return filters;
  }

  /**
   * Updates a record and updates the summary totals
   *
   * @param record
   */
  updateRecord(record) {
    let initialRecord = _.find(this.initialRecords, {recordId: record.recordId});

    if (initialRecord) {
      _.forIn(record, function (v, k) {
        initialRecord[k] = v;
      });

      this.divisions = _.groupBy(this.records, 'division');
    }
  }
}
