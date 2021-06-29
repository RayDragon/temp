import { Component, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';
import { DateInMonth } from '../../DateInMonth';
import { HolidayService } from 'src/app/services/holiday.service';

@Component({
	selector: 'app-holiday-view',
	templateUrl: './holiday-view.component.html',
	styleUrls: ['./holiday-view.component.css'],
})
export class HolidayViewComponent implements OnInit, OnChanges {
	// get the year from dashboard
	@Input() year;
	// get the monthIndex from dashboard
	@Input() monthIndex;
	// get the city from dashboard
	@Input() city;

	// assign user selected date to selectedDate
	selectedDate: any;

	// use dateObj to store DateInMonth objects
	dateObj: Array<Array<DateInMonth>> = Array();

	/**
	 * Fetch holiday list and insert into responseDateObjs
	 */
	responseDateObjs: Map<any, any> = new Map();

	selectedFlag;

	constructor(private holidayServiceObj: HolidayService) {}

	/**
	 * Generate month when year or monthIndex or city change
	 */
	ngOnChanges(changes: SimpleChanges): void {
		// generate dateobj
		this.monthGenerator();
		this.holidayInitializer();
		this.ngOnInit();
	}

	emptyFun() {}
	/**
	 * ngOnInit
	 * If any updates from holiday editor component then generate month
	 * Use monthViewUpdateNotifier$ in HolidayService to get updates
	 * Assign current date (dd/mm/yyyy) to selectedDate
	 * and send the selected date to holiday editor using sendUserSelectedDateId function in HolidayService
	 */
	ngOnInit() {
		this.holidayInitializer();
		let d = new Date();
		this.selectedDate =  `${('000'+d.getDate()).slice(-2)}/${('000'+(d.getMonth()+1)).slice(-2)}/${(d.getFullYear())}`;
		this.holidayServiceObj.monthViewUpdateNotifier$.subscribe(() => {
			this.monthGenerator();
			let d = new Date();
			this.selectedDate =  `${('000'+d.getDate()).slice(-2)}/${('000'+(d.getMonth()+1)).slice(-2)}/${(d.getFullYear())}`;
			this.holidayInitializer();
		});
		this.holidayServiceObj.sendUserSelectedDateId(this.selectedDate);
	}

	/**
	 *  Generate the data for the 42 cells in the table
	 *  Property "enabled" to be true for the current month
	 *  After generating fetch holiday list.
	 */
	monthGenerator() {
		let date1 = new Date(`${this.monthIndex + 1}-01-${this.year}`);
		let startDate = Number(new Date(Number(date1) - (date1.getDay() == 0? 7 : date1.getDay()) * 24000 * 60 * 60));
		this.dateObj = Array();

		for (let row = 0; row < 6; row++) {
			let rowData = [];
			for (let col = 0; col < 7; col++) {
				let rowDate = new Date(startDate + 24000 * 60 * 60 * (7 * row + col));
				// console.log(row, col, rowDate);
				let dateInMonth=new DateInMonth();
					dateInMonth.date = `${('000' + rowDate.getDate()).slice(-2)}/${('000' + (rowDate.getMonth() + 1)).slice(-2)}/${('000' + rowDate.getFullYear()).slice(-4)}`,
					dateInMonth.enabled = date1.getMonth() == rowDate.getMonth()
				//  = {
				// 	date: `${('000' + rowDate.getDate()).slice(-2)}/${('000' + (rowDate.getMonth() + 1)).slice(-2)}/${(
				// 		'000' + rowDate.getFullYear()
				// 	).slice(-4)}`,
				// 	enabled: date1.getMonth() == rowDate.getMonth(),
				//};
				rowData.push(dateInMonth);
			}
			this.dateObj.push(rowData);
		}
	}

	/**
	 * Fetch holiday list and insert into responseDateObjs
	 */
	holidayInitializer() {
		this.holidayServiceObj.getHolidays(this.city, this.monthIndex, this.year).subscribe((data) => {
			this.responseDateObjs = new Map<any, any>();
			if(0 in data){
				data.forEach(element => {
					this.responseDateObjs.set(element.date, element);
				});
			}
		});
	}

	/**
	 *  Assign user selected date to selectedDate
	 *  Send the selected date to holiday editor
	 */
	sendSelectedDate(userSelectedDate) {
		//let date = `${('000'+Number(userSelectedDate)).slice(-2)}/${('000'+Number(this.monthIndex)+1).slice(-2)}/${this.year}`;
		this.selectedDate = userSelectedDate;
		this.holidayServiceObj.sendUserSelectedDateId(userSelectedDate);
	}
}
