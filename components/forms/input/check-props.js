/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import deprecatedProperty from '../../../utilities/warning/deprecated-property';
import oneOfRequiredProperty from '../../../utilities/warning/one-of-required-property';
import onlyOneOfProperties from '../../../utilities/warning/only-one-of-properties';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		// Deprecated and changed to another property
		deprecatedProperty(COMPONENT, props.iconCategory, 'iconCategory', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component.');
		deprecatedProperty(COMPONENT, props.iconName, 'iconName', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
		deprecatedProperty(COMPONENT, props.iconPosition, 'iconPosition', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
		deprecatedProperty(COMPONENT, props.iconAssistiveText, 'iconAssistiveText', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
		deprecatedProperty(COMPONENT, props.onIconClick, 'onIconClick', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');

		if (!props.inlineEditTrigger) {
			oneOfRequiredProperty(COMPONENT, {
				assistiveText: props.assistiveText,
				label: props.label
			});
		}
		
		onlyOneOfProperties(COMPONENT, {
			assistiveText: props.assistiveText,
			label: props.label
		});
	};
}

export default checkProps;
