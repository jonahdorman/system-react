/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
import comboboxFilterAndLimit from '~/components/combobox/filter';
import Icon from '~/components/icon';
import escapeRegExp from 'lodash.escaperegexp';

const accounts = [
	{ id: '1', label: 'Acme', subTitle: 'Account • San Francisco', type: 'account' },
	{ id: '2', label: 'Salesforce.com, Inc.', subTitle: 'Account • San Francisco', type: 'account' },
	{ id: '3', label: 'Paddy\'s Pub', subTitle: 'Account • Boston, MA', type: 'account' },
	{ id: '4', label: 'Tyrell Corp', subTitle: 'Account • San Francisco, CA', type: 'account' },
	{ id: '5', label: 'Paper St. Soap Company', subTitle: 'Account • Beloit, WI', type: 'account' },
	{ id: '6', label: 'Nakatomi Investments', subTitle: 'Account • Chicago, IL', type: 'account' },
	{ id: '7', label: 'Acme Landscaping', type: 'account' },
	{ id: '8', label: 'Acme Construction', subTitle: 'Account • Grand Marais, MN', type: 'account' }
];

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
			selection: [accountsWithIcon[0], accountsWithIcon[1]]
		};
	}

	render () {
		return (
			<Combobox
				id="combobox-unique-id"
				events={{
					onChange: (event, { value }) => {
						this.props.action('onChange')(event, value);
						this.setState({	inputValue: value });
					},
					onRequestRemoveSelectedOption: (event, data) => {
						this.setState({
							inputValue: '',
							selection: data.selection
						});
					},
					onSelect: (event, data) => {
						const dataAsArray = Object.keys(data).map((key) => data[key]);
						this.props.action('onSelect')(event, ...dataAsArray);
						this.setState({
							inputValue: '',
							selection: data.selection
						});
					}
				}}
				labels={{
					label: 'Search',
					placeholder: 'Search Salesforce'
				}}
				multiple
				options={comboboxFilterAndLimit({
					inputValue: this.state.inputValue,
					options: accountsWithIcon,
					selection: this.state.selection
				})}
				predefinedOptionsOnly
				selection={this.state.selection}
				value={this.state.inputValue}
			/>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
