/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Panel - Filter variant

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

import Panel from '../';
import Button from '../../button';
import PanelFilteringFooter from '~/components/panel/filtering/footer';

// ## Constants
import { PANEL_FILTERING } from '../../../utilities/constants';

/**
 * A filtering panel contextual filtering options.
 */
const FilteringPanel = ({
	assistiveTextCloseFilterPanel,
	cancelLabel,
	children,
	errorLabel,
	footer,
	heading,
	modified,
	onClickAdd,
	onClickRemoveAll,
	onRequestCancel,
	onRequestClose,
	onRequestSave,
	saveLabel
}) => (
	<Panel variant="filters">
		<div className="slds-form--stacked slds-grow slds-scrollable--y slds-grid slds-grid--vertical">
			<div className="slds-filters">
				{modified ? <div className="slds-filters__header slds-grid slds-has-divider--bottom-space slds-grid--align-spread">
					<Button
						label={cancelLabel}
						onClick={onRequestCancel}
						variant="neutral"
					/>
					<Button
						label={saveLabel}
						onClick={onRequestSave}
						variant="brand"
					/>
				</div>
				: <div className="slds-filters__header slds-grid slds-has-divider--bottom-space">
					<h2 className="slds-align-middle slds-text-heading--small">{heading}</h2>
					<Button
						className="slds-col--bump-left"
						assistiveText={assistiveTextCloseFilterPanel}
						iconCategory="utility"
						iconName="forward"
						iconVariant="bare"
						iconSize="small"
						onClick={onRequestClose}
						title={assistiveTextCloseFilterPanel}
						variant="icon"
					/>
				</div>}
				<div className="slds-filters__body">
					{errorLabel
						? <div className="slds-text-color--error slds-m-bottom--x-small" role="alert">{errorLabel}</div>
						: null}
					{children}
				</div>
				{footer || <PanelFilteringFooter onClickAdd={onClickAdd} onClickRemoveAll={onClickRemoveAll} />}
			</div>
		</div>
	</Panel>
);

FilteringPanel.displayName = PANEL_FILTERING;

FilteringPanel.propTypes = {
	/**
	 * Localized description of the close button for the panel for screen readers
	 */
	assistiveTextCloseFilterPanel: PropTypes.node,
	/**
	 * Label for button that cancels modified filters
	 */
	cancelLabel: PropTypes.string,
	/**
	 * Pass in `FilterList`'s of `Filters`
	 */
	children: PropTypes.node,
	/**
	 * Allows for customization of footer beyond default
	 */
	footer: PropTypes.node,
	/**
	 * The heading of the filtering panel
	 */
	heading: PropTypes.node,
	/**
	 * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
	 */
	modified: PropTypes.bool,
	/**
	 * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
	 */
	onClickAdd: PropTypes.func,
	/**
	 * Callback triggered when "Remove All" is clicked. Recieves an `event`.
	 */
	onClickRemoveAll: PropTypes.func,
	/**
	 * When the panel's cancel button is clicked in order to reset filter panel to previous state.
	 */
	onRequestCancel: PropTypes.func,
	/**
	 * When the panel's close button is clicked. Please place Panel within another element to control position and visibility.
	 */
	onRequestClose: PropTypes.func,
	/**
	 * When the panel's save button is clicked in order to confirm filter panel state.
	 */
	onRequestSave: PropTypes.func,
	/**
	 * Label for button that saves modified filters
	 */
	saveLabel: PropTypes.string
};

FilteringPanel.defaultProps = {
	cancelLabel: 'Cancel',
	assistiveTextCloseFilterPanel: 'Close Filter Panel',
	heading: 'Filter',
	saveLabel: 'Save'
};

module.exports = FilteringPanel;
