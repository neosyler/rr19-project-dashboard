import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'The Project Dashboard';
  records: any;
  divisions = [];

  constructor(private _data: DataService) {
  }

  ngOnInit() {
    this._data.recordObservable.subscribe((res) => {
      this.records = res;
      this.divisions = _.groupBy(this.records, 'division');
      console.log('divs', this.divisions);
    });
  }
}
