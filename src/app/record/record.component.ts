import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
   * Event to update record through parent
   *
   * @type {EventEmitter<any>}
   */
  @Output() updateRecord: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Whether this record is currently being edited or not
   */
  editing: boolean;

  /**
   * Sets up this class
   */
  constructor() { }

  /**
   * Initializes component / view data
   */
  ngOnInit() {
    this.editing = false;
  }

  /**
   * Saves updates made to this record
   */
  save() {
    this.updateRecord.emit(this.record);
    this.editing = false;
  }

}
