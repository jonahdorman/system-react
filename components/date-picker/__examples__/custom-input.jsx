/* eslint-disable no-console, react/prop-types */
import React from 'react';

import Datepicker from '~/components/date-picker';
import Input from '~/components/input';

class Example extends React.Component {
	static displayName = 'DatepickerExample';

	state = {
		isOpen: false,
	};

	render() {
		return (
			<Datepicker
				input={<Input placeholder="With custom Input" />}
				isOpen={this.state.isOpen}
				onRequestClose={() => {
					this.setState({ isOpen: false });
				}}
				onRequestOpen={() => {
					this.setState({ isOpen: true });
				}}
				onChange={(event, data) => {
					if (this.props.action) {
						const dataAsArray = Object.keys(data).map((key) => data[key]);
						this.props.action('onChange')(event, data, ...dataAsArray);
					} else if (console) {
						console.log('onChange', event, data);
					}
				}}
			/>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
