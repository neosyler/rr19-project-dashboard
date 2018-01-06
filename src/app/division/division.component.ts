import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  @Input() name: string;
  @Input() records = [];

  division = { abbr: '', total: 0, budgets: [] };

  constructor() { }

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
