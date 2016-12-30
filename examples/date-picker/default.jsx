import React from 'react';
import Datepicker from '~/components/date-picker';

const Example = React.createClass({
	displayName: 'DatepickerExample',

	render () {
		return (
			<Datepicker
				onDateChange={(event, data) => {
					if (this.props.log) { this.props.log('onDateChange')(data.date, data.formattedDate); }
				}}
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
