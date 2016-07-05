import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import logo from './logo.svg';

import GlobalHeader from '../../components/global-header';
import GlobalHeaderButton from '../../components/global-header/button';
import GlobalHeaderDropdown from '../../components/global-header/dropdown';
import GlobalHeaderProfile from '../../components/global-header/profile';
import GlobalHeaderSearch from '../../components/global-header/search';

import { GLOBAL_HEADER } from '../../utilities/constants';

storiesOf(GLOBAL_HEADER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('w/ Search', () => (
		<GlobalHeader logoSrc={logo} onSkipToContent={action('Skip to Main Content')} onSkipToNav={action('Skip to Navigation')}>
			<GlobalHeaderSearch
				onSelect={action('Search Selected')}
				options={[
					{ label: 'Email' },
					{ label: 'Mobile' }
				]}
			/>
			<GlobalHeaderButton
				className="slds-m-right--small"
				iconVariant={null}
				label="Feedback"
				onClick={action('Feedback Clicked')}
				variant="neutral"
			/>
			<GlobalHeaderDropdown
				iconCategory="utility"
				iconName="add"
				onSelect={action('Action Selected')}
				options={[
					{ label: 'New Note' },
					{ label: 'Log a Call' }
				]}
			/>
			<GlobalHeaderProfile
				onClick={action('Profile Clicked')}
				onSelect={action('Profile Selected')}
				options={[
					{ label: 'Profile Menu' }
				]}
			/>
		</GlobalHeader>
	))
	.add('w/o Search or Feedback', () => (
		<GlobalHeader logoSrc={logo} onSkipToContent={action('Skip to Main Content')} onSkipToNav={action('Skip to Navigation')}>
			<GlobalHeaderDropdown
				iconCategory="utility"
				iconName="add"
				onSelect={action('Action Selected')}
				options={[
					{ label: 'New Note' },
					{ label: 'Log a Call' }
				]}
			/>
			<GlobalHeaderProfile
				onClick={action('Profile Clicked')}
				onSelect={action('Profile Selected')}
				options={[
					{ label: 'Profile Menu' }
				]}
			/>
		</GlobalHeader>
	));
