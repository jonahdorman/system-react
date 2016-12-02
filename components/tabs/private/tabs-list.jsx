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
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';
import { TABS_LIST } from '../../../utilities/constants';


const TabsList = ({
	id,
	className,
	children,
	variant,
	...attributes
}) => (
	<ul
		id={`${id}-slds-tabs__nav`}
		className={classNames(
			className,
			{
				'slds-tabs--default__nav': variant === 'default',
				'slds-tabs--scoped__nav': variant === 'scoped'
			}
		)}
		role="tablist"
		variant={variant}
	>
		{children}
	</ul>
);

TabsList.displayName = TABS_LIST;

TabsList.propTypes = {
	/**
	 * Inherits the `id` from the parent `<Tabs />` component and appends `-tabs__nav`. Becomes the HTML `id` attribute of UL element that has the class `.slds-tabs--default__nav` on it.
	 */
	id: PropTypes.string,

	/**
	 * Class names to be added to the tabs list element.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string
	]),

	/**
	 * The `children` are the actual tabs to be rendered as `li` elements. They get created by [tabs/index.jsx](./index.jsx) in the `renderTabsList` function.
	 */
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]),

	/**
	 * If the Tabs should be scopped, defaults to false
	 */
	variant: React.PropTypes.oneOf(['default', 'scoped'])
};

module.exports = TabsList;
