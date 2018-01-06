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
   * Title of the Page
   *
   * @type {string}
   */
  title = 'The Project Dashboard';
  /**
   * Listing of records
   */
  records: any;
  /**
   * Listing of divisions (created from the listing of records)
   *
   * @type {Array}
   */
  divisions = [];

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
      this.records = res;
      this.divisions = _.groupBy(this.records, 'division');
    });
  }
}
