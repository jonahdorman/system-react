/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tabs Component

// Implements the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React.

// ## Dependencies

// ### React
import React, {
	PropTypes
} from 'react';

// Child components
// import TabsList from './tabs-list';
// import Tab from './tab';
// import TabItem from './tab-item';
// import TabPanel from './tab-panel';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Constants
import {
	TABS,
	TABS_LIST,
	TAB,
	TAB_PANEL
} from '../../utilities/constants';


// ### Helpers from Utilities
import {
	EventUtil,
	uuid
} from '../../utilities';

const handleClick = (event, props) => {
	EventUtil.trap(event);

	if (isFunction(props.onClick)) {
		props.onClick(event, {
			props: !props.selected
		});
	}
};

const Tabs = React.createClass({
	displayName: TABS,
	propTypes: {
		selected: PropTypes.number,
		children: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.element
		]).isRequired
	},
	getDefaultProps () {
		return {
			selected: 0
		};
	},
	getInitialState () {
		return {
			selected: this.props.selected
		};
	},
	// handleClick (index, event) {
	// 	event.preventDefault();
	// 	this.setState({
	// 		selected: index
	// 	});
	// },
	_renderTitles (props) {
		function labels (child, index) {
			let activeClass = (props.selected === index ? 'slds-active' : '');
			return (
				<li
					className={classNames(
						'slds-tabs--default__item',
						'slds-text-title--caps',
						activeClass
					)}
					key={
						index
					}
				>
					<a
						href="#"
						className={classNames(
							'slds-tabs--default__link',
							activeClass
						)}
						onClick={(event) => handleClick(event, props)}

						// onClick={
						// 	this.handleClick.bind(this, index)
						// }
					>
					{child.props.label}
					</a>
				</li>
			);
		}
		return (
			<ul className="slds-tabs--default__nav">
				{this.props.children.map(labels.bind(this))}
			</ul>
		);
	},
	_renderContent () {
		return (
			<div className="slds-tabs--default__content">
				{this.props.children[this.state.selected]}
			</div>
		);
	},
	render () {
		return (
			<div className="slds-tabs--default">
				{this._renderTitles(this.props)}
				{this._renderContent()}
			</div>);
	}
});

module.exports = Tabs;
