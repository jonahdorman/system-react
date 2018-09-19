/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';

import assign from 'lodash.assign';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';

import SLDSNotification from '../../notification';
import IconSettings from '../../icon-settings';

describe('SLDSNotification: ', () => {
	const generateNotification = function(notificationInstance) {
		const reactCmp = TestUtils.renderIntoDocument(
			<IconSettings iconPath="/assets/icons">
				{notificationInstance}
			</IconSettings>
		);
		return ReactDOM.findDOMNode(reactCmp);
	};

	describe('component renders', () => {
		it('notification renders', () => {
			const notification = generateNotification(
				<SLDSNotification variant="toast" theme="success" isOpen content="hi" />
			);
			expect(notification).to.not.equal(undefined);
		});
	});

	describe('component basic props render', () => {
		it('renders variant', () => {
			const notification = generateNotification(
				<SLDSNotification
					variant="toast"
					theme="success"
					icon="notification"
					isOpen
					texture
					animated
					content="hi"
				/>
			);
			const alert = notification.getElementsByTagName('div')[0];
			expect(alert.className).to.include('slds-notify_toast');
		});

		it('renders theme', () => {
			const notification = generateNotification(
				<SLDSNotification variant="toast" theme="error" isOpen content="hi" />
			);
			const alert = notification.getElementsByTagName('div')[0];
			expect(alert.className).to.include('slds-theme_error');
		});

		it('renders icon', () => {
			const notification = generateNotification(
				<SLDSNotification
					variant="alert"
					theme="success"
					iconName="notification"
					isOpen
					texture
					content="hi"
				/>
			);

			const close = notification.querySelectorAll('button');
			const svgs = notification.querySelectorAll(
				'[*|href="/assets/icons/utility-sprite/svg/symbols.svg#notification"]'
			);
			expect(close[0].className).to.include('slds-notify__close');
			expect(svgs[0]).to.exist;
		});
	});

	describe('dismiss notification click', () => {
		it('button onClick invokes method from props', () => {
			const onClick = sinon.spy();
			const notification = generateNotification(
				<SLDSNotification
					variant="toast"
					theme="success"
					iconName="notification"
					onDismiss={onClick}
					isOpen
					content="hi"
				/>
			);
			const dismissBtn = notification.getElementsByTagName('button')[0];
			TestUtils.Simulate.click(dismissBtn);
			expect(onClick.calledOnce).to.be.true;
		});
	});
});
