import React, { PropTypes } from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { TABS } from '../../utilities/constants';

import Tabs from '../../components/tabs';
import Pane from '../../components/tabs/pane';


// Used in the Nested story
import Input from '../../components/forms/input';

// Used in the Conditinal story
import Checkbox from '../../components/forms/checkbox';

// Used in the outside control story
import Button from '../../components/button';

import classNames from 'classnames';

/* eslint-disable react/display-name */
const getTabs = () => (
	<div>
		<h2 className="slds-text-heading--large">Base Tabs Demo</h2>
		<Tabs id="main-tabs-demo" className="custom-class-is-custom" foo="baz">
			<Pane label="Tab 1">
				<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
				<p>And they&rsquo;re amazing.</p>
				<p>It's awesome.</p>
				<p>You can use your <var>TAB</var> and <var>ARROW</var> keys to navigate around. Try it!</p>
				<p className="slds-box slds-theme--info slds-m-top--large">
					(You might have to hit shift+tab to put the focus onto the tab bar ;)
				</p>
			</Pane>
			<Pane label="Tab 2">
				<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
				<p>And they&rsquo;re also amazing.</p>
			</Pane>
			<Pane label="Tab 3">
				<h2 className="slds-text-heading--medium">This is my tab 3 contents!</h2>
				<p>And they&rsquo;re quite spectacular.</p>
			</Pane>
		</Tabs>
	</div>
);
/* eslint-enable react/display-name */


/* eslint-disable react/display-name */
const getTabsNested = () => (
	<div>
		<h2 className="slds-text-heading--large">Nested Tabs Demo</h2>
		<Tabs id="nested-tabs-demo">
			<Pane label="Tab 1">
				<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
				<p>And they&rsquo;re <a href="#amazing">amazing</a>.</p>
			</Pane>
			<Pane label="Tab 2">
				<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
				<p>And they&rsquo;re also amazing.</p>

				<Input
					id="unique-id-123"
					name="left-clickable-icon"
					label="Input Label"
					iconName="search"
					iconCategory="utility"
					iconPosition="left"
					iconAssistiveText="Search Icon"
					onIconClick={action('Search icon clicked')}
					placeholder="You can tab onto this to focus it."
				/>


			</Pane>
			<Pane label="Tab 3 (has children)">
				<h2 className="slds-text-heading--medium">This is my tab 3 contents!</h2>
				<p>And they&rsquo;re tabceptionish.</p>
				<div className="slds-box slds-m-vertical--large">
					<Tabs defaultSelectedIndex={0}>
						<Pane label="Tab 1">
							<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
							<p>And they&rsquo;re amazing.</p>
						</Pane>
						<Pane label="Tab 2">
							<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
							<p>And they&rsquo;re also amazing.</p>
						</Pane>
						<Pane label="Tab 3 (Also has children!)">
							<h2 className="slds-text-heading--medium">This is my tab 3 contents!</h2>
							<p>And they&rsquo;re even <em>more</em> tabceptionish.</p>
							<div className="slds-box slds-m-vertical--large">
								<Tabs defaultSelectedIndex={0}>
									<Pane label="Tab 1 (no children!)">
										<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
										<p>And they&rsquo;re amazing.</p>
									</Pane>
								</Tabs>
							</div>
						</Pane>
					</Tabs>
				</div>
			</Pane>
		</Tabs>
	</div>
);
/* eslint-enable react/display-name */


const DemoTabsConditional = React.createClass({
	displayName: 'DemoTabsConditional',

	// ### Prop Types
	propTypes: {
		/**
		 * Class names to be added to the container element and is passed along to its children.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string
		])
	},

	getInitialState () {
		return {
			showA: true,
			showB: true,
			showC: true,
			disableA: false,
			disableB: true,
			disableC: true
		};
	},

	handleCheckClicked (checked, event) {
		const state = {};
		state[event.target.name] = checked;
		this.setState(state);
	},

	handleCheckClickedDisable (checked, event) {
		const state = {};
		state[event.target.name] = checked;
		this.setState(state);
	},

	renderPaneA (disabled) {
		return (
			<Pane
				label="Tab A"
				disabled={disabled}
			>
				<p>This is tab A.</p>
				<div>
					<Checkbox
						assistiveText="Disable tab B"
						checked={this.state.disableB}
						onChange={this.handleCheckClickedDisable}
						label="Disable tab B"
						name="disableB"
					/>
					<Checkbox
						assistiveText="Disable tab C"
						checked={this.state.disableC}
						onChange={this.handleCheckClickedDisable}
						label="Disable tab C"
						name="disableC"
					/>
				</div>
			</Pane>
		);
	},

	render () {
		return (
			<div>
				<h2 className="slds-text-heading--large">Conditional Tabs Demo</h2>

				<Checkbox
					assistiveText="Show tab A"
					checked={this.state.showA}
					onChange={this.handleCheckClicked}
					label="Show tab A"
					name="showA"
				/>
				<Checkbox
					assistiveText="Show tab B"
					checked={this.state.showB}
					onChange={this.handleCheckClicked}
					label="Show tab B"
					name="showB"
				/>

				<Checkbox
					checked={this.state.showC}
					onChange={this.handleCheckClicked}
					assistiveText="Show tab C"
					label="Show tab C"
					name="showC"
				/>

				<Tabs
					className={classNames(
						'slds-m-top--large',
						this.props.className
					)}
					onSelect={this.handleSelectNopesOnThree}
				>
					{this.state.showA && this.renderPaneA(this.state.disableA)}
					{this.state.showB && this.state.disableB ? <Pane label="Tab B" disabled><p>This is tab B.</p></Pane> : this.state.showB && <Pane label="Tab B"><p>This is tab B.</p></Pane>}
					{this.state.showC && this.state.disableC ? <Pane label="Tab C" disabled><p>This is tab C.</p></Pane> : this.state.showC && <Pane label="Tab C"><p>This is tab C.</p></Pane>}
				</Tabs>
			</div>
		);
	}
});

const DemoTabsOutsideControl = React.createClass({
	displayName: 'DemoTabsOutsideControl',

	// ### Prop Types
	propTypes: {
		/**
		 * Class names to be added to the container element and is passed along to its children.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string
		]),
		/**
		 * The Tab (and corresponding TabPanel) that is selected when the component renders. Defaults to `0`.
		 */
		whichOneSelectedYo: React.PropTypes.number,
		prevOneSelectedYo: React.PropTypes.number
	},

	getInitialState () {
		return {
			whichOneSelectedYo: this.props.whichOneSelectedYo || 0,
			prevOneSelectedYo: this.props.prevOneSelectedYo || 0
		};
	},

	handleSelect (index, last) {
		if (index === this.state.whichOneSelectedYo) {
			this.setState({ whichOneSelectedYo: index, prevOneSelectedYo: last });
			return false;
		}
		this.setState({ whichOneSelectedYo: index, prevOneSelectedYo: last });
		return true;
	},

	handleButtonClicked (event) {
		const prevOneSelected = this.state.prevOneSelectedYo;
		const thisOneSelected = this.state.whichOneSelectedYo;

		switch (event.currentTarget.id) {
			case 'monday':
				this.setState({ whichOneSelectedYo: 0, prevOneSelectedYo: prevOneSelected });
				break;

			case 'tuesday':
				this.setState({ whichOneSelectedYo: 1, prevOneSelectedYo: prevOneSelected });
				break;

			case 'tuesday-alt':
				this.setState({ whichOneSelectedYo: 1, prevOneSelectedYo: prevOneSelected });
				break;

			case 'wednesday':
				this.setState({ whichOneSelectedYo: 2, prevOneSelectedYo: prevOneSelected });
				break;

			case 'thursday':
				this.setState({ whichOneSelectedYo: 3, prevOneSelectedYo: prevOneSelected });
				break;

			case 'friday':
				this.setState({ whichOneSelectedYo: 4, prevOneSelectedYo: prevOneSelected });
				break;

			case 'none':
				this.setState({ whichOneSelectedYo: undefined, prevOneSelectedYo: prevOneSelected });
				break;

			case 'previous':
				this.setState({ whichOneSelectedYo: prevOneSelected, prevOneSelectedYo: thisOneSelected });
				break;

			default:
				// Statements executed when none of the values match the value of the expression
				this.setState({ whichOneSelectedYo: 0, prevOneSelectedYo: prevOneSelected });
		}
	},

	render () {
		return (
			<div>
				<h2 className="slds-text-heading--large">Outside Tabs Demo</h2>
				<p>
					Here we have several buttons, which are used to pass a new <code>selectedIndex</code> into the Tabs component.
				</p>
				<p className="slds-m-bottom--large">
					This shows that you can pass a new selected index property into the component from the outside and have it re-render.
				</p>

				<Button
					id="monday"
					label="Monday"
					onClick={this.handleButtonClicked}
				/>
				<Button
					id="tuesday"
					label="Tuesday"
					onClick={this.handleButtonClicked}
				/>
				<Button
					id="wednesday"
					label="Wednesday"
					onClick={this.handleButtonClicked}
				/>
				<Button
					id="thursday"
					label="Thursday"
					onClick={this.handleButtonClicked}
				/>
				<Button
					id="friday"
					label="Friday"
					onClick={this.handleButtonClicked}
				/>
				<Button
					id="none"
					label="None"
					onClick={this.handleButtonClicked}
				/>
				<Button
					id="previous"
					label="Previous"
					onClick={this.handleButtonClicked}
				/>


				<Tabs
					className={classNames(
						'slds-m-top--large',
						this.props.className
					)}
					selectedIndex={this.state.whichOneSelectedYo}
					onSelect={this.handleSelect}
				>
					<Pane label="Monday">
						<p>This is Monday's Pane.</p>
						<Button
							id="tuesday-alt"
							label="Submit and go to next tab"
							onClick={this.handleButtonClicked}
						/>
					</Pane>
					<Pane label="Tuesday"><p>This is Tuesday's Pane.</p></Pane>
					<Pane label="Wednesday"><p>This is Wednesday's Pane.</p></Pane>
					<Pane label="Thursday"><p>Thursday's Pane has far to go.</p></Pane>
					<Pane label="Friday"><p>This is Friday's Pane.</p></Pane>
				</Tabs>
			</div>
		);
	}
});

/* eslint-disable react/display-name */
const getTabsDisabled = () => (
	<div>
		<h2 className="slds-text-heading--large">Disabled Tabs Demo</h2>
		<Tabs id="disabled-tabs-demo">
			<Pane label="Tab 1">
				<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
				<p>And they&rsquo;re amazing.</p>
				<p>It's awesome.</p>
				<p>You can use your <var>TAB</var> and <var>ARROW</var> keys to navigate around. Try it!</p>
				<p className="slds-box slds-theme--info slds-m-top--large">
					(You might have to hit shift+tab to put the focus onto the tab bar ;)
				</p>
			</Pane>
			<Pane label="Tab 2" disabled>
				<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
				<p>And they&rsquo;re also amazing.</p>
			</Pane>
			<Pane label="Tab 3">
				<h2 className="slds-text-heading--medium">This is my tab 3 contents!</h2>
				<p>And they&rsquo;re quite spectacular.</p>
			</Pane>
			<Pane label="Tab 4">
				<h2 className="slds-text-heading--medium">This is my tab 3 contents!</h2>
				<p>Note that using your arrow keys you can loop <em>around the tabs</em>! 🎉</p>
			</Pane>
		</Tabs>
	</div>
);
/* eslint-enable react/display-name */


storiesOf(TABS, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getTabs())
	.add('With disabled tab', () => getTabsDisabled())
	.add('Nested', () => getTabsNested())
	.add('Outside Control', () => <DemoTabsOutsideControl className="controlled-yo" />)
	.add('Conditional', () => <DemoTabsConditional className="conditional-yo" />)
	;

module.exports = getTabs;
