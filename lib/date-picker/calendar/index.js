/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./calendar-week/index');

var _index2 = _interopRequireDefault(_index);

var _utilities = require('../../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({

  displayName: 'Calendar',

  getDefaultProps: function getDefaultProps() {
    return {
      displayedDate: new Date(),
      selectedDate: new Date(),
      weekDayLabels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      abbrWeekDayLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      todayLabel: 'Today',
      onSelectDate: function onSelectDate(date) {
        console.log('onSelectDate should be defined ', date);
      },
      onCancel: function onCancel() {
        console.log('onCancel should be defined');
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      highlightedDate: _utilities.DateUtil.firstDayOfMonth(this.props.displayedDate),
      hasFocus: false,
      todayFocus: false
    };
  },
  handleSelectDate: function handleSelectDate(day) {
    this.setState({ selected: day });
    if (this.props.onSelectDate) {
      this.props.onSelectDate(day);
    }
  },
  handleCancel: function handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  },
  handleChangeDisplayedDate: function handleChangeDisplayedDate(date) {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
  },
  handlePrevDay: function handlePrevDay(date) {
    var prevDate = _utilities.DateUtil.addDays(date, -1);
    if (!_utilities.DateUtil.isSameMonth(prevDate, date)) {
      this.handleChangeDisplayedDate(prevDate);
    } else {
      this.setState({ highlightedDate: prevDate });
    }
  },
  handleNextDay: function handleNextDay(date) {
    var nextDate = _utilities.DateUtil.addDays(date, 1);
    if (!_utilities.DateUtil.isSameMonth(nextDate, date)) {
      this.handleChangeDisplayedDate(nextDate);
    } else {
      this.setState({ highlightedDate: nextDate });
    }
  },
  handlePrevWeek: function handlePrevWeek(date) {
    var prevDate = _utilities.DateUtil.addDays(date, -7);
    if (!_utilities.DateUtil.isSameMonth(prevDate, date)) {
      this.handleChangeDisplayedDate(prevDate);
    } else {
      this.setState({ highlightedDate: prevDate });
    }
  },
  handleNextWeek: function handleNextWeek(date) {
    var nextDate = _utilities.DateUtil.addDays(date, 7);
    if (!_utilities.DateUtil.isSameMonth(nextDate, date)) {
      this.handleChangeDisplayedDate(nextDate);
    } else {
      this.setState({ highlightedDate: nextDate });
    }
  },
  handleTodaySelect: function handleTodaySelect() {
    this.handleSelectDate(new Date());
  },
  handleFocus: function handleFocus() {
    if (!this.state.todayFocus) {
      this.setState({ hasFocus: true });
    }
  },
  handleBlur: function handleBlur() {
    this.setState({ hasFocus: false });
  },
  handleTodayFocus: function handleTodayFocus() {
    this.state.todayFocus = true;
  },
  handleTodayBlur: function handleTodayBlur() {
    this.state.todayFocus = false;
  },
  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode) {
      if (event.keyCode === _utilities.KEYS.TAB) {
        if (!event.shiftKey) {
          _utilities.EventUtil.trapEvent(event);
          if (this.props.onCancel) {
            this.props.onCancel();
          }
        }
      }
    }
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'Calendar',
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      },
      _react2.default.createElement(
        'table',
        { className: 'datepicker__month', role: 'grid', 'aria-labelledby': 'month' },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            { ref: 'weekdays' },
            _react2.default.createElement(
              'th',
              { ref: 'Sunday' },
              _react2.default.createElement(
                'abbr',
                { title: this.props.weekDayLabels[0] },
                this.props.abbrWeekDayLabels[0]
              )
            ),
            _react2.default.createElement(
              'th',
              { ref: 'Monday' },
              _react2.default.createElement(
                'abbr',
                { title: this.props.weekDayLabels[1] },
                this.props.abbrWeekDayLabels[1]
              )
            ),
            _react2.default.createElement(
              'th',
              { ref: 'Tuesday' },
              _react2.default.createElement(
                'abbr',
                { title: this.props.weekDayLabels[2] },
                this.props.abbrWeekDayLabels[2]
              )
            ),
            _react2.default.createElement(
              'th',
              { ref: 'Wednesday' },
              _react2.default.createElement(
                'abbr',
                { title: this.props.weekDayLabels[3] },
                this.props.abbrWeekDayLabels[3]
              )
            ),
            _react2.default.createElement(
              'th',
              { ref: 'Thursday' },
              _react2.default.createElement(
                'abbr',
                { title: this.props.weekDayLabels[4] },
                this.props.abbrWeekDayLabels[4]
              )
            ),
            _react2.default.createElement(
              'th',
              { ref: 'Friday' },
              _react2.default.createElement(
                'abbr',
                { title: this.props.weekDayLabels[5] },
                this.props.abbrWeekDayLabels[5]
              )
            ),
            _react2.default.createElement(
              'th',
              { ref: 'Saturday' },
              _react2.default.createElement(
                'abbr',
                { title: this.props.weekDayLabels[6] },
                this.props.abbrWeekDayLabels[6]
              )
            )
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          this.renderWeeks(),
          this.renderToday()
        )
      )
    );
  },
  renderToday: function renderToday() {
    return _react2.default.createElement(
      'tr',
      null,
      _react2.default.createElement(
        'td',
        {
          colSpan: '7',
          role: 'gridcell' },
        _react2.default.createElement(
          'a',
          { href: 'javascript:void(0)',
            onFocus: this.handleTodayFocus,
            onBlur: this.handleTodayBlur,
            tabIndex: '0',
            onKeyDown: this.handleKeyDown,
            className: 'slds-show--inline-block slds-p-bottom--x-small',
            onClick: this.handleTodaySelect },
          this.props.todayLabel
        )
      )
    );
  },
  renderWeeks: function renderWeeks() {
    var firstDayOfMonth = _utilities.DateUtil.firstDayOfMonth(this.props.displayedDate);

    var date = firstDayOfMonth;
    if (firstDayOfMonth.getDay() > 0) {
      var prevWeek = _utilities.DateUtil.addWeeks(firstDayOfMonth, -1);
      var nextSunday = _utilities.DateUtil.nearestWeekDay(prevWeek, 0);
      date = nextSunday;
    }

    var weeks = [];
    var done = false;

    var monthIndex = date.getMonth();
    var count = 0;
    while (!done) {
      weeks.push(_react2.default.createElement(_index2.default, {
        key: date.toString(),
        date: date,
        month: this.props.month,
        onSelectDate: this.handleSelectDate,
        selectedDate: this.props.selectedDate,
        displayedDate: this.props.displayedDate,
        highlightedDate: this.state.highlightedDate,
        onPrevDay: this.handlePrevDay,
        onNextDay: this.handleNextDay,
        onPrevWeek: this.handlePrevWeek,
        onNextWeek: this.handleNextWeek,
        calendarHasFocus: this.state.hasFocus,
        onCancel: this.handleCancel }));
      date = _utilities.DateUtil.addWeeks(date, 1);
      done = count++ > 2 && monthIndex !== date.getMonth();
      monthIndex = date.getMonth();
    }
    var extra = 0;
    while (weeks.length < 6) {
      weeks.push(_react2.default.createElement(
        'tr',
        { key: 'extra_' + extra++, className: 'week' },
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(
            'span',
            { className: 'slds-day' },
            ' '
          )
        )
      ));
    }

    return weeks;
  },
  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (!_utilities.DateUtil.isEqual(this.props.displayedDate, prevProps.displayedDate)) {
      this.setState({ highlightedDate: this.props.displayedDate });
    }
  }
});