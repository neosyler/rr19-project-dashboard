import {Component, Input, OnInit} from '@angular/core';

/**
 * Record Component
 *  Responsible for displaying a single record and allowing editing capabilities on it
 */

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  /**
   * Record with data to display in the view
   */
  @Input() record: object;

  /**
   * Sets up this class
   */
  constructor() { }

  /**
   * Initializes component / view data
   */
  ngOnInit() {
  }

}
