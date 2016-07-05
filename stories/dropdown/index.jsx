/* eslint-disable indent */
/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { MENU_DROPDOWN } from '../../utilities/constants';
import Dropdown from '../../components/menu-dropdown';

const options = [
	{ label: 'A Option Option Super Super Long', value: 'A0' },
	{ label: 'B Option', value: 'B0' },
	{ label: 'C Option', value: 'C0' },
	{ label: 'D Option', value: 'D0' },
	{ label: 'E Option', value: 'E0' },
	{ label: 'A1 Option', value: 'A1' },
	{ label: 'B2 Option', value: 'B1' },
	{ label: 'C2 Option', value: 'C1' },
	{ label: 'D2 Option', value: 'D1' },
	{ label: 'E2 Option Super Super Long', value: 'E1' }
];

const getDropdown = (props) => (
	<Dropdown {...props} />
);

storiesOf(MENU_DROPDOWN, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getDropdown({
		align: 'right',
		label: 'Dropdown Click',
		onSelect: (value) => {
			action('Selected', value);
		},
		options
	}))
	.add('Hover', () => getDropdown({
		assistiveText: 'Icon More large',
		buttonVariant: 'icon',
		iconName: 'settings',
		iconSize: 'large',
		iconVariant: 'more',
		openOn: 'hover',
		options
	}))
	.add('Hover with Checkmark', () => getDropdown({
		assistiveText: 'More Options',
		buttonVariant: 'icon',
		checkmark: true,
		iconName: 'down',
		iconVariant: 'border-filled',
		onMouseEnter: action('Mouse enter'),
		onMouseLeave: action('Mouse leave'),
		onSelect: action('Selected'),
		openOn: 'hover',
		options,
		value: 'C0'
	}));

