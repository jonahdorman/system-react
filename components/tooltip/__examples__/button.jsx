import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Tooltip from '~/components/tooltip'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

const Example = createReactClass({
	displayName: 'TooltipExample',

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Tooltip align="right" content="Tooltip with right alignment">
					<Button label="Hover or focus to Open" />
				</Tooltip>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
