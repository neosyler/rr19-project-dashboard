import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as data from '../assets/data.json';

@Injectable()
export class DataService {

  private records = new BehaviorSubject(data);
  recordObservable = this.records.asObservable();

  constructor() {

  }


}
