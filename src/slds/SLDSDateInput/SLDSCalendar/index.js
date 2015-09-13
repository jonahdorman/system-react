/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
'use strict';

import React from 'react';
import Week from './SLDSCalendarWeek/index';
import moment from 'moment';

module.exports = React.createClass({

  displayName: 'SLDSCalendar',

  getDefaultProps () {
    return {
      month:moment(),
      selected:moment(),
      labels:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      abbrLabels:['S','M','T','W','T','F','S'],

      onSelectDate (date) {
        console.log('onSelectDate should be defined ',date);
      },

      onCancel () {
        console.log('onCancel should be defined');
      }

    };
  },

  handleSelectDate (day) {
    this.setState({selected:day});
    if(this.props.onSelectDate){
      this.props.onSelectDate(day);
    }
  },

  handleCancel () {
    if(this.props.onCancel){
      this.props.onCancel();
    }
  },

  render: function() {
    return (<div className='SLDSCalendar'>
      <table className='datepicker__month' role='grid' aria-labelledby='month'>
        <thead>
          <tr ref='weekdays'>
            <th ref='Sunday'>
              <abbr title={this.props.labels[0]}>{this.props.abbrLabels[0]}</abbr>
            </th>
            <th ref='Monday'>
              <abbr title={this.props.labels[1]}>{this.props.abbrLabels[1]}</abbr>
            </th>
            <th ref='Tuesday'>
              <abbr title={this.props.labels[2]}>{this.props.abbrLabels[2]}</abbr>
            </th>
            <th ref='Wednesday'>
              <abbr title={this.props.labels[3]}>{this.props.abbrLabels[3]}</abbr>
            </th>
            <th ref='Thursday'>
              <abbr title={this.props.labels[4]}>{this.props.abbrLabels[4]}</abbr>
            </th>
            <th ref='Friday'>
              <abbr title={this.props.labels[5]}>{this.props.abbrLabels[5]}</abbr>
            </th>
            <th ref='Saturday'>
              <abbr title={this.props.labels[6]}>{this.props.abbrLabels[6]}</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.renderWeeks()}
        </tbody>
      </table>
    </div>);
  },

  renderWeeks: function() {
    var weeks = [],
      done = false,
      date = this.props.month.clone().startOf('month').add('w' -1).day('Sunday'),
      monthIndex = date.month(),
      count = 0;

    while (!done) {
      weeks.push(<Week 
          key={date.toString()} 
          date={date.clone()} 
          month={this.props.month} 
          onSelectDate={this.handleSelectDate} 
          selectedDate={this.props.selected} 
          onCancel={this.handleCancel} />);
      date.add(1, 'w');
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    var extra = 0;
    while(weeks.length < 6){
      weeks.push(<tr key={'extra_'+extra++} className='week'><td><span className='slds-day'>&nbsp;</span></td></tr>);
    }

    return weeks;
  },


});