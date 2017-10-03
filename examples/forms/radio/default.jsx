import React from 'react';
import Radio from '~/components/forms/radio'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'RadioExample',

	render () {
		return (
			<Radio
				id="radioId1"
				label="Radio Label"
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
