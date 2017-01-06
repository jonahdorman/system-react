/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { PropTypes } from 'react';

import Dialog from '../utilities/dialog';
import CalendarWrapper from './private/calendar-wrapper';
import InputIcon from '../icon/input-icon';
import Input from '../forms/input';

// ### isBoolean
import isBoolean from 'lodash.isboolean';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

import EventUtil from '../../utilities/EventUtil';
import KEYS from '../../utilities/KEYS';

import { DATEPICKER } from '../../utilities/constants';

/* A datepicker is a non text input form element. You can select a single date from a popup or inline calendar. The datepicker supplied by this library comes with an input by default, but other components could be passed in as children--however, pairing with other components is untested.

 * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
 *
 * This component may use a portalMount (a disconnected React subtree mount) within an absolutely positioned DOM node created with [Drop](http://github.hubspot.com/drop/).
*/
const Datepicker = React.createClass({
	displayName: DATEPICKER,

	propTypes: {
		/**
		 * Three letter abbreviations of the days of the week, starting on Sunday.
		 */
		abbreviatedWeekDayLabels: PropTypes.array,
		/**
		 * Label for button to go to the next month
		 */
		assistiveTextNextMonth: PropTypes.string,
		/**
		 * Call to action label for calendar dialog trigger
		 */
		assistiveTextOpenCalendar: PropTypes.string,
		/**
		 * Label for button to go to the previous month
		 */
		assistiveTextPreviousMonth: PropTypes.string,
		/**
		 * Aligns the right or left side of the menu with the respective side of the trigger.
		 */
		align: PropTypes.oneOf(['left', 'right']),
		/**
		 * Pass in an <Input /> component to customize it. Event handlers for the input (if needed) should be added here and not to this component. `<Input onKeyDown... />`.`
		 */
		children: PropTypes.node,
		/**
		 * CSS classes to be added to tag with `slds-datepicker`.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * If true, constrains the menu to the scroll parent. Has no effect if `isInline` is `true`.
		 */
		constrainToScrollParent: PropTypes.bool,
		/**
		 * Disable input and calendar.
		 */
		disabled: PropTypes.bool,
		/**
		 * Date formatting function
		 */
		formatter: PropTypes.func,
		/**
		 * Value of input that gets passed to `parser` prop. Set the `value` prop if using a `Date` object. Use an external library such as [MomentJS](https://github.com/moment/moment/) if additional date formatting or internationalization is needed.
		 */
		formattedValue: PropTypes.string,
		/* Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen.
		*/
		hasStaticAlignment: PropTypes.bool,
		/**
		 * HTML id for component
		 */
		id: PropTypes.string,
		/**
		 * Renders menu within the wrapping trigger as a sibling of the input. By default, you will have an absolutely positioned container at an elevated z-index.
		 */
		isInline: PropTypes.bool,
		/**
		 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
		 */
		isOpen: PropTypes.bool,
		/**
		 * Makes Monday the first day of the week
		 */
		isIsoWeekday: PropTypes.bool,
		/**
		 * Names of the months
		 */
		monthLabels: PropTypes.array,
		/**
		 * Triggered when the date changes. It receives an object. {date: [Date object], formattedDate: [string]}. Can be used for validation.
		 */
		onChange: PropTypes.func,
		/**
		 * Triggered when the calendar is closed.
		 */
		onClose: PropTypes.func,
		/**
		 * Triggered when the calendar has opened.
		 */
		onOpen: PropTypes.func,
		/**
		 * Custom function to parase date string into and return a `Date` object. Default function passes the input value to `Date()` and prays. Use an external library such as [MomentJS](https://github.com/moment/moment/) if additional date parsing is needed.
		 */
		parser: PropTypes.func,
		/**
		 * Absolutely positioned DOM nodes, such as a datepicker dialog, may need their own React DOM tree root. They may need their alignment "flipped" if extended beyond the window or outside the bounds of an overflow-hidden scrolling modal. This library's portal mounts are added as a child node of `body`. This prop will be triggered instead of the default `ReactDOM.mount()` when this dialog is mounted. This prop is useful for testing and simliar to a "callback ref." Two arguments,`reactElement` and `domContainerNode` are passed in. Consider the following code that bypasses the internal mount and uses an Enzyme wrapper to mount the React root tree to the DOM.
		 *
		 * ```
		 * <Datepicker
				isOpen
				portalMount={(reactElement, domContainerNode) => {
					portalWrapper = Enzyme.mount(reactElement, { attachTo: domContainerNode });
				}}
				onOpen={() => {
					expect(portalWrapper.find(`#my-heading`)).to.exist;
					done();
				}}
			/>
			```
		 */
		portalMount: PropTypes.func,
		/**
		 * Function called when the calendar dialog would like hide.
		 */
		onRequestClose: PropTypes.func,
		/**
		 * Function called when the calendar dialog would like show.
		 */
		onRequestOpen: PropTypes.func,
		/**
		 * Placeholder text for input
		 */
		placeholder: PropTypes.string,
		/**
		 * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
		 */
		relativeYearFrom: PropTypes.number,
		/**
		 * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
		 */
		relativeYearTo: PropTypes.number,
		/**
		 * Label of shortcut to jump to today within the calendar. This is also used for assistive text on today's date.
		 */
		todayLabel: PropTypes.string,
		/**
		 * CSS classes to be added to tag with `slds-datepicker-trigger`. This is typically a wrapping `div` around the input.
		 */
		triggerClassName: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
     * Sets date with a `Date` ECMAScript object.
     */
		value: PropTypes.instanceOf(Date),
		/**
		 * Full names of the seven days of the week, starting on Sunday.
		 */
		weekDayLabels: PropTypes.array
	},

	getDefaultProps () {
		return {
			align: 'left',
			abbreviatedWeekDayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			assistiveTextOpenCalendar: 'Open Calendar',
			assistiveTextNextMonth: 'Next month',
			assistiveTextPreviousMonth: 'Previous month',
			formatter (date) {
				return date ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : '';
			},
			monthLabels: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			],
			parser (str) {
				return new Date(str);
			},
			placeholder: 'Pick a Date',
			relativeYearFrom: -5,
			relativeYearTo: 5,
			todayLabel: 'Today',
			weekDayLabels: [
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday'
			]
		};
	},

	getInitialState () {
		const dateString = this.props.formatter(this.props.value);
		const initDate = this.props.value ? dateString : this.props.formattedValue;
		return {
			isOpen: false,
			value: this.props.value,
			formattedValue: initDate || '',
			inputValue: initDate || ''
		};
	},

	componentWillMount () {
		this.generatedId = shortid.generate();

		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(DATEPICKER, this.props);
	},

	componentWillReceiveProps (nextProps) {
		if (nextProps.value && this.props.value) {
			const currentDate = this.props.value.getTime();
			const nextDate = nextProps.value.getTime();

			if (currentDate !== nextDate) {
				this.setState({
					value: nextProps.value,
					formattedValue: this.props.formatter(nextProps.value)
				});
			}
		}
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	getIsOpen () {
		return !!(isBoolean(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);
	},

	handleCalendarChange (event, { date }) {
		this.setState({
			value: date,
			formattedValue: this.props.formatter(date),
			inputValue: this.props.formatter(date)
		});

		this.handleRequestClose();

		if (this.props.onChange) {
			this.props.onChange(event, { date, formattedDate: this.props.formatter(date) });
		}
	},

	handleClickOutside () {
		this.handleRequestClose();
	},

	handleRequestClose () {
		const isOpen = this.getIsOpen();

		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}

		if (isOpen) {
			this.setState({ isOpen: false });
		}

		if (this.input) {
			this.input.focus();
		}
	},

	openDialog () {
		if (this.props.onRequestOpen) {
			this.props.onRequestOpen();
		} else {
			this.setState({ isOpen: true });
		}
	},

	parseDate (formattedValue) {
		let parsedDate = this.props.parser(formattedValue);
		if (Object.prototype.toString.call(parsedDate) !== '[object Date]'
			|| isNaN(parsedDate.getTime())) {
			parsedDate = new Date();
		}
		return parsedDate;
	},

	getInlineMenu () {
		return (
			!this.props.disabled && this.getIsOpen()
			? <div
				className={classNames('slds-datepicker',
					'slds-dropdown',
					`slds-dropdown--${this.props.align}`,
				this.props.className)}
			>
				{this.getDatePicker()}
			</div>
			: null
		);
	},

	handleClose () {
		if (this.props.onClose) {
			this.props.onClose();
		}
	},

	handleOpen () {
		if (this.props.onOpen) {
			this.props.onOpen();
		}

		if (this.selectedDateCell) {
			this.selectedDateCell.focus();
		}
	},

	getDialog () {
		return (
				!this.props.disabled && this.getIsOpen()
				? <Dialog
					contentsClassName="slds-datepicker slds-dropdown"
					closeOnTabKey
					constrainToScrollParent={this.props.constrainToScrollParent}
					horizontalAlign={this.props.align}
					flippable={!this.props.hasStaticAlignment}
					onClose={this.handleClose}
					onOpen={this.handleOpen}
					portalMount={this.props.portalMount}
					targetElement={this.input}
				>
				{this.getDatePicker()}
				</Dialog>
				: null
		);
	},

	getDatePicker () {
		const date = this.state.formattedValue
			? this.parseDate(this.state.formattedValue)
			: this.state.value;

		return (<CalendarWrapper
			abbreviatedWeekDayLabels={this.props.abbreviatedWeekDayLabels}
			assistiveTextNextMonth={this.props.assistiveTextNextMonth}
			assistiveTextPreviousMonth={this.props.assistiveTextPreviousMonth}
			id={this.getId()}
			isIsoWeekday={this.props.isIsoWeekday}
			monthLabels={this.props.monthLabels}
			onRequestClose={this.handleRequestClose}
			onSelectDate={this.handleCalendarChange}
			ref={() => {
				// since it's inline, there is no callback except on render
				if (this.props.isInline) {
					this.handleOpen();
				}
			}}
			relativeYearFrom={this.props.relativeYearFrom}
			relativeYearTo={this.props.relativeYearTo}
			selectedDate={date || new Date()}
			selectedDateRef={(component) => { this.selectedDateCell = component; }}
			todayLabel={this.props.todayLabel}
			weekDayLabels={this.props.weekDayLabels}
		/>);
	},

	handleInputChange (event) {
		this.setState({
			formattedValue: event.target.value,
			inputValue: event.target.value
		});

		if (this.props.onChange) {
			this.props.onChange(event, { date: this.props.parser(event.target.value), formattedDate: event.target.value });
		}
	},

	handleKeyDown (event) {
		// Don't open if user is selecting text
		if (event.keyCode
				&& !event.shiftKey
				&& (event.keyCode === KEYS.DOWN || event.keyCode === KEYS.UP)) {
			EventUtil.trapEvent(event);
			this.setState({ isOpen: true });
		}
	},

	render () {
		const clonedProps = {
			disabled: this.props.children && !!this.props.children.props.disabled || this.props.disabled,
			iconRight: this.props.children && !!this.props.children.props.iconRight || (<InputIcon
				assistiveText={this.props.assistiveTextOpenCalendar}
				aria-haspopup
				aria-expanded={this.state.isOpen}
				category="utility"
				name="event"
				onClick={this.openDialog}
			/>),
			id: this.getId(),
			inputRef: (component) => { this.input = component; },
			onChange: this.handleInputChange,
			onClick: () => {
				this.openDialog();
				if (this.props.children && this.props.children.props.onClick) {
					this.props.children.props.onClick();
				}
			},
			onKeyDown: this.props.children && this.props.children.props.onKeyDown || this.handleKeyDown,
			placeholder: this.props.children && this.props.children.props.placeholder || this.props.placeholder,
			value: this.props.children && this.props.children.props.value || this.state.inputValue
		};

		const clonedInput = this.props.children ? React.cloneElement(this.props.children, {
			...clonedProps
		})
		: <Input
			{...clonedProps}
		/>;

		return (
			<div
				className={classNames(
					'slds-dropdown-trigger',
					'slds-dropdown-trigger--click',
					'ignore-react-onclickoutside', {
						'slds-is-open': this.getIsOpen()
					},
					this.props.triggerClassName
				)}
			>
				{clonedInput}
				{this.props.isInline ? this.getInlineMenu() : this.getDialog()}
			</div>
		);
	}
});

export default Datepicker;
