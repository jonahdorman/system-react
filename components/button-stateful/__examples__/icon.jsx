import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import ButtonStateful from '~/components/button-stateful'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'ButtonStatefulExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<ButtonStateful
					assistiveText="like"
					iconName="like"
					iconSize="large"
					variant="icon"
				/>
			</IconSettings>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
