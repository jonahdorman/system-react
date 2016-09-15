/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classnames from 'classnames';

// ## Children
import MediaObject from '../media-object';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

import { CARD_HEADER } from '../../utilities/constants';

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
const idSuffixes = {
	headerActions: '__header-actions',
	heading: '__heading',
	filter: '__filter-input'
};

const renderFilter = (filter, id) => {
	// allow id to be set by custom header component passed in
	const clonedFilter = React.cloneElement(filter, {
		id: filter.props.id || id
	});

	return (
		<div className="slds-input-has-icon slds-input-has-icon--left slds-size--1-of-3">
			{clonedFilter}
		</div>
	);
};

renderFilter.displayName = 'renderFilter';

/**
 * Card Header is a private component and is not meant to be imported or used for Card's `header` prop. It just happens to have the same file name.
 */
const CardHeader = (props) => {
	let title = null;

	if (typeof props.heading === 'string' || props.heading instanceof String) {
		title = props.heading;
	}

	const heading = (
		<h2
			id={props.headingId}
			className="slds-text-heading--small slds-truncate"
			title={title}
		>
			{props.heading}
		</h2>
	);

	let Header;

	if (props.header) {
		Header = React.cloneElement(props.header, {
			figure: props.icon,
			body: heading,
			verticalCenter: true,
			canTruncate: true,
			...props.header.props
		});
	} else {
		Header = (<MediaObject
			figure={props.icon}
			body={heading}
			verticalCenter
			canTruncate
		/>);
	}

	const hasFilter = props.filter ? true : null;

	return (
		<div className={classnames('slds-card__header', 'slds-grid')}>
			{Header}
			{
				props.filter
				? renderFilter(props.filter, props.filterId)
				: null
			}
			<div
				id={props.headerActionsId}
				className={classnames(
					'slds-no-flex',
					{
						'slds-size--1-of-3': hasFilter,
						'slds-text-align--right': hasFilter
					})}
			>
				{props.headerActions}
			</div>
		</div>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
CardHeader.displayName = CARD_HEADER;

// ### Prop Types
CardHeader.propTypes = {
	/**
	 * Adds a filter input to the card header
	 */
	filter: PropTypes.node,
	/**
	 * Set the HTML `id` of the card filter.
	 */
	filterId: PropTypes.string,
	/**
	 * Allows a custom header (the media object with the icon in the first column). `icon`, `heading` and other props are passed in the media object from Card. Use `design-system-react/components/media-object` to create your own.
	 */
	header: PropTypes.node,
	/**
	 * Actions performed on selected items or that relate to the entire group of items such as "Add Item.""
	 */
	headerActions: PropTypes.node,
	/**
	 * Set the HTML `id` of the card header actions.
	 */
	headerActionsId: PropTypes.string,
	/**
	 * The heading is the name of the related item group.
	 */
	heading: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.string
	]).isRequired,
	/**
	 * Set the HTML `id` of the card heading.
	 */
	headingId: PropTypes.string,
	/**
	 * Icon associated with grouped items
	 */
	icon: PropTypes.node
};

module.exports = CardHeader;
module.exports.idSuffixes = idSuffixes;
