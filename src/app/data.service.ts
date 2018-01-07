import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as data from '../assets/data.json';
import * as _ from 'lodash';

/**
 * DataService
 *  Responsible for loading external data and providing a means for accessing it through an observer interface
 */

@Injectable()
export class DataService {

  /**
   * Record ID Counter for assigning unique record IDs
   * @type {number}
   */
  private recordIdCounter = 1;
  /**
   * Observer for listing of records
   *
   * @type {BehaviorSubject<any>}
   */
  private records = new BehaviorSubject(_.map(data, function (d) {
    d.recordId = this.recordIdCounter;
    this.recordIdCounter += 1;
    return d;
  }.bind(this)));
  /**
   * Observable for listing of records
   *
   * @type {Observable<any>}
   */
  recordObservable = this.records.asObservable();

  constructor() {}
}
