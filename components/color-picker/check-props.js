/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import isPrototype from '../../utilities/warning/component-is-prototype';
import onlyOneOfProperties from '../../utilities/warning/only-one-of-properties';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		isPrototype(COMPONENT);

		onlyOneOfProperties(
			COMPONENT,
			{
				'assistiveText.label': props.assistiveText && props.assistiveText.label,
				label: props.labels.label,
			},
			createDocUrl('assistiveText')
		);
	};
}

export default checkProps;
