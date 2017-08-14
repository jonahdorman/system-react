/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox/combobox';
import Icon from '~/components/icon';
import escapeRegExp from 'lodash.escaperegexp';
import globalSettings from '../../components/settings';

globalSettings.setIconsPath('/assets/icons');

const accounts = [
	{ label: 'Acme', subTitle: 'Account • San Francisco', type: 'account' },
	{ label: 'Salesforce.com, Inc.', subTitle: 'Account • San Francisco', type: 'account' }
];

const defaultFilter = (term, item) => {
	if (!term) return true;
	return (item.data && item.data.type === 'section') || item.label.match(new RegExp(escapeRegExp(term), 'ig'));
};

const accountsWithIcon = accounts.map((elem) => Object.assign(elem, {
	icon: <Icon
		assistiveText="Account"
		category="standard"
		name={elem.type}
	/> })
);

class Example extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			inputValue: '',
			selection: []
		};
	}

	render () {
		return (
			<Combobox
				id="combobox-unique-id"
				isInline
				isOpen
				labels={{
					placeholder: 'Search Salesforce'
				}}
				onChange={(event, { value }) => {
					console.log('onChange', value);
					this.setState({	inputValue: value });
				}}
				onRequestRemoveSelectedOption={(event, data) => {
					this.setState({
						inputValue: '',
						selection: []
					});
				}}
				onSubmit={(event, { value }) => {
					console.log('onSubmit', value);
					this.setState({ selection: [{
						label: value,
						icon: <Icon
							assistiveText="Account"
							category="standard"
							name="account"
						/> }] });
				}}
				onSelect={(event, data) => {
					console.log('onSelect', data);
					this.setState({ selection: data.selection });
				}}
				options={accountsWithIcon}
				selection={this.state.selection}
				value={this.state.selectedOption ? this.state.selectedOption.label : this.state.inputValue}
			/>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
