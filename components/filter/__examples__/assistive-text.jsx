import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import IconSettings from '~/components/icon-settings';

import Panel from '~/components/panel'; // `~` is replaced with design-system-react at runtime
import FilterGroup from '~/components/panel/filtering/group';
import FilterList from '~/components/panel/filtering/list';
import FilterListHeading from '~/components/panel/filtering/list-heading';
import Filter from '~/components/filter';

import Combobox from '~/components/combobox';

const options = {
	'show-me': [
	{ id: 1, label: 'All Products', value: 'all-products' },
	{ id: 2, label: 'All Wackamoles', value: 'all-Wackamoles' }
	]
};

const Example = createReactClass({
	displayName: 'FilterExample',

	propTypes () {
		return {
			align: PropTypes.string
		};
	},

	getInitialState () {
		return {
			'show-me': {
				selectedItem: options['show-me'][0],
				isActive: true,
				comboboxSelection: [options['show-me'][0]]
			}
		};
	},

	onChangePredicate (event, { id }) {
		const idSuffix = id.split('sample-panel-filtering-')[1];
		this.setState({
			[idSuffix]: {
				...this.state[idSuffix],
				selectedItem: this.state[idSuffix].comboboxSelection[0]
			}
		});
	},

	onRemove (event, { id }) {
		const idSuffix = id.split('sample-panel-filtering-')[1];
		this.setState({
			[idSuffix]: {
				...this.state[idSuffix],
				isActive: false
			}
		});
	},

	render () {
		return this.state['show-me'].isActive && (
			<IconSettings iconPath="/assets/icons">
				<Filter
					assistiveText={{ editFilter: 'editFilter-TEST',
						editFilterHeading: 'editFilterHeading-TEST',
						removeFilter: 'removeFilter-TEST' }}
					align={this.props.align}
					id="sample-panel-filtering-show-me"
					onChange={this.onChangePredicate}
					onRemove={this.onRemove}
					property="Show Me"
					predicate={this.state['show-me'].selectedItem.label}
					{...this.props}
				>
					<Combobox
						events={{
							onSelect: (event, data) => {
								this.setState({ 'show-me': {
									...this.state['show-me'],
									comboboxSelection: data.selection
								} });
							}
						}}
						labels={{
							label: 'Show Me',
							placeholder: 'Select record type'
						}}
						menuPosition="relative"
						options={options['show-me']}
						selection={this.state['show-me'].comboboxSelection}
						variant="readonly"
					/>
				</Filter>
			</IconSettings>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
