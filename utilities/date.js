/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const DateUtil = {
	firstDayOfMonth (date) {
		const newDate = new Date(date);
		newDate.setDate(1);
		return newDate;
	},

	isFirstDayOfMonth (date) {
		return date.getDate() === 1;
	},

	isLastDayOfMonth (date) {
		return !DateUtil.isSameMonth(date, DateUtil.addDays(date, 1));
	},
	isSameMonth (d1, d2) {
		if (!d1 || !d2) {
			return false;
		}
		return (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth());
	},
	isSameDay (d1, d2) {
		if (!d1 || !d2) {
			return false;
		}
		return (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate());
	},
	isCurrentMonth (date) {
		if (!date) {
			return false;
		}
		return DateUtil.isSameMonth(date, new Date());
	},
	isToday (date) {
		if (!date) {
			return false;
		}
		return DateUtil.isSameDay(date, new Date());
	},
	isEqual (d1, d2) {
		return d1.getTime() === d2.getTime();
	},
	addDays (date, deltaDays) {
		const newDate = new Date(date);
		newDate.setDate(newDate.getDate() + parseInt(deltaDays, 10));
		return newDate;
	},
	addWeeks (date, deltaWeeks) {
		return DateUtil.addDays(date, parseInt(deltaWeeks, 10) * 7);
	},
	nearestWeekDay (date, weekDayIndex) {
		let delta = weekDayIndex - date.getDay();
		if (delta < 0) {
			delta += 7;
		}
		return DateUtil.addDays(date, delta);
	},
	isLeapYear (year) {
		return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
	},

	getDaysInMonth (year, month) {
		return [31, (DateUtil.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	},

	addMonths (date, value) {
		const newDate = new Date(date);
		const dateOfNewDate = newDate.getDate();
		newDate.setDate(1);
		newDate.setMonth(newDate.getMonth() + value);
		newDate.setDate(Math.min(dateOfNewDate, DateUtil.getDaysInMonth(newDate.getFullYear(), newDate.getMonth())));
		return newDate;
	}
};

export default DateUtil;
