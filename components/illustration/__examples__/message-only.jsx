import React from 'react';
import createReactClass from 'create-react-class';
import Illustration from '~/components/illustration'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'IllustrationExample',

	render () {
		return (
			<Illustration
				internalIllustration
				messageBody="Lorem ipsum dolor sit amet, consectetur"
			/>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
