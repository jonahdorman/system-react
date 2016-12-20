/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { PropTypes } from 'react';

import Calendar from './calendar';
import DatePickerNav from './dialog-navigation';

import { EventUtil, KEYS } from '../../../utilities';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

const DatepickerDialog = React.createClass({
	displayName: 'SLDSDatepickerDialog',

	getDefaultProps () {
		return {
			selectedDate: new Date(),
			value: new Date()
			// onChange (date) {
			// 	console.log('onChange should be defined ', date);
			// },

			// onDisplayedDateChange (date) {
			// 	console.log('onDisplayedDateChange should be defined ', date);
			// },

			// onClose () {
			// 	console.log('onClose should be defined');
			// }
		};
	},

	getInitialState () {
		return {
			displayedDate: this.props.selectedDate,
			isFocused: false,
			isClosing: false
		};
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ESCAPE) {
				if (this.props.onClose) {
					this.props.onClose();
				}
			} else if (event.keyCode === KEYS.SPACE) {
				// do nothing
			} else if (event.keyCode === KEYS.ENTER) {
				// do nothing
			} else if (event.keyCode === KEYS.TAB) {
				// do nothing
			} else if (event.keyCode === KEYS.ESCAPE) {
				// do nothing
			} else {
				EventUtil.trapEvent(event);
			}
		}
	},

	handleDisplayedDateChange (displayedDate) {
		if (this.props.onDisplayedDateChange) {
			this.props.onDisplayedDateChange(displayedDate);
		}
		this.setState({ displayedDate });
	},

	handleCancel () {
		if (this.props.onClose) {
			this.props.onClose();
		}
	},

	handleFocus () {
		this.setState({ isFocused: true });
	},

	handleBlur () {
		this.setState({ isFocused: false });
	},

	render () {
		return (
			<div className="ignore-react-onclickoutside">
				<div
					className={classNames('slds-datepicker slds-dropdown slds-dropdown--left', this.props.className)}
					aria-hidden={false}
					data-selection="single"
					onKeyDown={this.handleKeyDown}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					onClick={this.handleBGClick}
				>
					<DatePickerNav
						onChange={this.handleDisplayedDateChange}
						displayedDate={this.state.displayedDate}
						monthLabels={this.props.monthLabels}
						relativeYearFrom={this.props.relativeYearFrom}
						relativeYearTo={this.props.relativeYearTo}
						onCancel={this.handleCancel}
					/>
					<Calendar
						selectedDate={this.props.selectedDate}
						onChange={this.handleDisplayedDateChange}
						displayedDate={this.state.displayedDate}
						onSelectDate={this.props.onSelectDate}
						abbrWeekDayLabels={this.props.abbrWeekDayLabels}
						weekDayLabels={this.props.weekDayLabels}
						todayLabel={this.props.todayLabel}
						onCancel={this.handleCancel}
					/>
					<span id="bn_prev-label" className="slds-assistive-text">Go to previous month</span>
					<span id="bn_next-label" className="slds-assistive-text">Go to next month</span>
				</div>

			</div>
		);
	},

	componentDidUpdate (prevProps, prevState) {
		if (!this.state.isFocused && prevState.isFocused) {
			this.setState({ isClosing: true });

			setTimeout(() => {
				if (this.isMounted()) {
					if (this.state.isClosing) {
						if (this.state.isFocused) {
							this.setState({ isClosing: false });
						} else {
							if (this.props.onClose) {
								this.props.onClose();
							}
						}
					}
				}
			});
		}
	}
});

module.exports = DatepickerDialog;
