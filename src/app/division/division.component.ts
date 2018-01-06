import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';

/**
 * Division Component
 *  Responsible for displaying a summary of data on a specific division
 */

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  /**
   * Name of the Division
   */
  @Input() name: string;
  /**
   * Listing of records within this Division
   *
   * @type {Array}
   */
  @Input() records = [];
  /**
   * Object containing summary data
   *
   * @type {Object}
   */
  division = { abbr: '', total: 0, budgets: [] };

  /**
   * Sets up this class
   */
  constructor() { }

  /**
   * Initializes component / view data
   */
  ngOnInit() {
    this.division.abbr = this.name.substr(0, 2).toUpperCase();
    this.division.total = _.sumBy(this.records, 'budget');
    this.division.budgets = _.map(_.groupBy(this.records, 'project_owner'), function (rows, owner) {
      return {
        owner: owner,
        total: _.sumBy(rows, 'budget')
      };
    });
  }

}
