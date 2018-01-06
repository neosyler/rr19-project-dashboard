import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as data from '../assets/data.json';

/**
 * DataService
 *  Responsible for loading external data and providing a means for accessing it through an observer interface
 */

@Injectable()
export class DataService {

  private records = new BehaviorSubject(data);
  recordObservable = this.records.asObservable();

  constructor() {}
}
