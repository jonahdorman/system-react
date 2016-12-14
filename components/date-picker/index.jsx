/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../utilities/dialog';
import DatePicker from './private/date-picker-base/index';
import InputIcon from '../icon/input-icon';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

import EventUtil from '../../utilities/EventUtil';
import KEYS from '../../utilities/KEYS';

import { DATEPICKER } from '../../utilities/constants';

const propTypes = {
	abbrWeekDayLabels: React.PropTypes.array,
	disabled: React.PropTypes.bool,
	/**
	 * Date formatting function
	 */
	formatter: React.PropTypes.func,
	monthLabels: React.PropTypes.array,
	/**
	 * Parsing date string into Date
	 */
	parser: React.PropTypes.func,
	relativeYearFrom: React.PropTypes.number,
	relativeYearTo: React.PropTypes.number,
	/**
	 * If true, adds asterisk next to input label to indicate it is a required field.
	 */
	required: React.PropTypes.bool,
	strValue: React.PropTypes.string,
	todayLabel: React.PropTypes.string,
    /**
     * Sets default date. If not null, input is filled with date string of value.
     */
	value: React.PropTypes.instanceOf(Date),
	weekDayLabels: React.PropTypes.array
};

const defaultProps = {
	abbrWeekDayLabels: ['S','M','T','W','T','F','S'],
	formatter (date) {
		if(date){
			return (date.getMonth()+1) +
				'/'+date.getDate() +
				'/'+date.getFullYear();
		}
	},
	monthLabels: [
		'January','February','March',
	'April','May','June','July',
	'August','September','October',
	'November','December'
		],
	onDateChange (date, strValue) {
		console.log('onDateChange should be defined');
	},
	parser (str) {
		return new Date(str);
	},
	placeholder: 'Pick a Date',
	relativeYearFrom: -5,
	relativeYearTo: 5,
	required: false,
	todayLabel: 'Today',
	value: null,
	weekDayLabels: [
		'Sunday','Monday','Tuesday',
	'Wednesday','Thursday','Friday',
	'Saturday'
		],
};

module.exports = React.createClass({

	displayName: DATEPICKER,

	propTypes: propTypes,

	getDefaultProps(){
		return defaultProps;
	},

	getInitialState(){
        let dateString = this.props.formatter(this.props.value);
		const initDate = this.props.value ? dateString : this.props.strValue;
		return {
			isOpen:false,
			value:this.props.value,
			strValue:initDate
		};
	},

	componentWillMount () {
	// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(DATEPICKER, this.props);
	},

	componentWillReceiveProps(nextProps) {
		if(nextProps.value && this.props.value) {
			const currentDate = this.props.value.getTime();
			const nextDate = nextProps.value.getTime();

			if(currentDate !== nextDate) {
				this.setState({
					value: nextProps.value,
					strValue: this.props.formatter(nextProps.value)
				});
			}
		}
	},

	handleChange(date) {
		this.setState({
			value:date,
		strValue:this.props.formatter(date),
		isOpen:false
		});
		if(this.props.onDateChange){
			this.props.onDateChange(date);
		}
	},

	handleClose() {
		this.setState({isOpen:false});
		this.setFocus();
	},

	handleClick() {
		this.setState({isOpen:true});
	},

	handleFocus() {
		if (this.props.onFocus) this.props.onFocus(e);
	//    this.setState({isOpen:true})
	},

	handleBlur() {
		if (this.props.onBlur) this.props.onBlur(e);
	//    this.setState({isOpen:false})
		this.setFocus();
	},

	setFocus () {
		if(this.isMounted()){
			ReactDOM.findDOMNode(this.refs.date).focus();
		}
	},

	parseDate(strValue) {
		const d = this.props.parser(strValue);
		if ( Object.prototype.toString.call(d) === "[object Date]" ) {
			if ( !isNaN( d.getTime() ) ) {
				return d;
			}
		}
		return new Date();
	},

	getInlineMenu() {
		return (
				!this.props.disabled && this.state.isOpen?
				<div className='slds-dropdown slds-dropdown--left'>
				{this.getDatePicker()}
				</div>:null
				);
	},

	getDialog() {
		return (
				!this.props.disabled && this.state.isOpen?
				<Dialog
				closeOnTabKey={true}
				constrainToScrollParent={this.props.constrainToScrollParent}
				inheritTargetWidth={this.props.inheritTargetWidth}
				flippable={true}
				onClose={this.handleClose}
				targetElement={this.refs.date}>
				{this.getDatePicker()}
				</Dialog>:null
				);
	},

	getDatePicker() {
		const date = this.state.strValue?this.parseDate(this.state.strValue):this.state.value;
		return <DatePicker
			onChange={this.handleChange}
		selected={this.state.selected}
		onClose={this.handleClose}
		abbrWeekDayLabels={this.props.abbrWeekDayLabels}
		weekDayLabels={this.props.weekDayLabels}
		monthLabels={this.props.monthLabels}
		todayLabel={this.props.todayLabel}
		relativeYearFrom={this.props.relativeYearFrom}
		relativeYearTo={this.props.relativeYearTo}
		selectedDate={date?date:new Date()} />;
	},

	handleInputChange() {
		const string = ReactDOM.findDOMNode(this.refs.date).value;
		this.setState({
			strValue:string
		});
		if(this.props.onDateChange){
			const d = this.props.parser(string)
				this.props.onDateChange(d, string);
		}
	},

	handleKeyDown(event) {
		if (event.keyCode){
			const isShift = !!event.shiftKey;
			if (!isShift && (event.keyCode === KEYS.ENTER ||
	//          event.keyCode === KEYS.SPACE ||
						event.keyCode === KEYS.DOWN ||
						event.keyCode === KEYS.UP)){
				EventUtil.trapEvent(event);

				this.setState({
					isOpen:true
				});
			}
		}
		if(this.props.onKeyDown) this.props.onKeyDown(event);
	},

	getInputIcon(){
	// inline style override
		return <InputIcon name='event' style={{pointerEvents: 'none'}} />;
	},

	inputRefName() {
		return `${this.props.label}Datepicker`;
	},

	getLabel(){
	// inline style override
		const required = this.props.required ? <span style={{color:"red"}}>* </span> : null;
		const inputLabel = this.props.label ? <label className="slds-form-element__label" htmlFor={this.inputRefName()} style={{width: "100%"}}>{required}{this.props.label}</label> : null;
		return inputLabel;
	},

	render() {
		const {
			disabled,
			modal,
			onKeyUp,
			onKeyPress,
			onInvalid,
			onInput,
			pattern,
			placeholder,
			...props // eslint-disable-line no-unused-vars
		} = this.props;

		let isInline;
		/* eslint-disable react/prop-types */
	if (this.props.isInline) {
		isInline = true;
	} else if (modal !== undefined) {
		isInline = !modal;
	}
	/* eslint-enable react/prop-types */

	const inputStyles = disabled ? {cursor: 'inherit'} : {cursor: 'pointer'};

	return (
		<div className='slds-form-element'>
			{this.getLabel()}
			<div className='slds-form-element__control'>
				<div className='slds-input-has-icon slds-input-has-icon--right'>

					{ this.getInputIcon() }
					<input
						className='slds-input slds-button--neutral slds-text-align--left'
						disabled={disabled}
						id={this.inputRefName()}
						onBlur={this.handleBlur}
						onChange={this.handleInputChange}
						onClick={this.handleClick}
						onFocus={this.handleFocus}
						onInvalid={onInvalid}
						onInput={onInput}
						onKeyDown={this.handleKeyDown}
						onKeyUp={onKeyUp}
						onKeyPress={onKeyPress}
						pattern={pattern}
						placeholder={placeholder}
						ref='date'
						style={inputStyles}
						type='text'
						value={this.state.strValue}
					/>
				</div>
			</div>
			{isInline ? this.getInlineMenu() : this.getDialog()}
		</div>
	);
}
});
