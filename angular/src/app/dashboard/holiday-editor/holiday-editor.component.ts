import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { HolidayService } from 'src/app/services/holiday.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-holiday-editor',
	templateUrl: './holiday-editor.component.html',
	styleUrls: ['./holiday-editor.component.css'],
})
export class HolidayEditorComponent implements OnInit, OnChanges {
	// get the city from dashboard
	@Input() city = '';

	// get the selected date from hoilday view and assigin it to selectedDate
	selectedDate = '';
	// get the respose and assign it to holidayObj
	holidayObj: any = {};

	// Use the editorFlag to display or hide form
	editorFlag = false;

	/**
	 * holidayEditor should contain the following Form control
	 * 1. holidayName -> should contain only alphabets, required.
	 */
	holidayEditor: FormGroup = new FormGroup({
		holidayName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
	});

	get holidayName() {
		return this.holidayEditor.get('holidayName');
	}

	constructor(private holidayServiceObj: HolidayService) {}

	/**
	 * When city change get Holiday information
	 */
	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
		this.getSelectedHolidayInfo();
	}

	/**
	 * Get user selected date from holiday view component and assign it to selectedDate
	 * Call getSelectedHolidayInfo() when user selects date
	 */
	ngOnInit() {
		this.holidayServiceObj.userDate$.subscribe((date) => {
			this.selectedDate = date;
			this.getSelectedHolidayInfo();
		});
	}

	/**
	 *    ---> getSelectedHolidayInfo()<---
	 *
	 * Validate selected date with current date.
	 *  ->  If selected date is greater then do the following
	 *      1. Display editor
	 *      2. Get Holiday information and assign it to holidayObj variable.
	 *  -> If selected date is lesser then do the following.
	 *      1. Hide editor
	 *      2. Do not fetch holiday information
	 */
	getSelectedHolidayInfo() {
		let dateStr = this.selectedDate.split('/');
		let selectedDate = new Date([dateStr[1], dateStr[0], dateStr[2]].join('/'));
		if (selectedDate > new Date()) {
			this.editorFlag = true;
			this.holidayServiceObj
				.getSelectedHolidayInfo(this.selectedDate, this.city)
				.subscribe((data) => {
					if(data.holidayName)
					this.holidayEditor = new FormGroup({
						holidayName: new FormControl(data.holidayName, [
							Validators.required,
							Validators.pattern('^[a-zA-Z]*$'),
						]),
					});
					else{
						this.holidayName.setValue(null);
						this.holidayObj = {};
					}
				});
		} else {
			console.log(selectedDate);
			this.holidayEditor = new FormGroup({
				holidayName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
			});

			this.editorFlag = false;
		}
	}

	/**
	 *    ---> addHoliday()<---
	 * Add Holiday
	 * After adding holiday implement the following scenario:
	 *    -> Notify holiday view component
	 *    -> Get Holiday information
	 */
	addHoliday() {
		this.holidayServiceObj
			.addHoliday(this.selectedDate, this.city, this.holidayName.value)
			.subscribe((data) => {
				this.holidayObj = data;
				this.holidayServiceObj.monthComponentNotify();
				this.getSelectedHolidayInfo();
			});
	}

	/**
	 *    ---> updateHoliday()<---
	 * Update Holiday
	 * After updating holiday implement the following scenario:
	 *    -> Notify holiday view component
	 *    -> Get Holiday information
	 */
	updateHoliday() {
		this.holidayServiceObj
			.updateHoliday(this.holidayObj.id, this.selectedDate, this.city, this.holidayName.value)
			.subscribe((data) => {
				this.holidayObj = data;
				this.holidayServiceObj.monthComponentNotify();
				this.getSelectedHolidayInfo();
			});
	}

	/**
	 *    ---> removeHoliday()<---
	 * Remove Holiday
	 * After removing holiday implement the following scenario:
	 *    -> Notify holiday view component
	 *    -> User should be able to add new Holiday
	 */
	removeHoliday() {
		this.holidayServiceObj.removeHoliday(this.holidayObj.id).subscribe((data) => {
			this.holidayName.setValue(null);
			this.holidayServiceObj.monthComponentNotify();
			this.getSelectedHolidayInfo();
			this.holidayObj = {};
		});
	}
}
