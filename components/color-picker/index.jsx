import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';

import checkProps from './check-props';

import CustomColor from './private/custom-color';
import Swatch from './private/swatch';
import SwatchPicker from './private/swatch-picker';

import Button from '../button';
import Dialog from '../utilities/dialog';
import Input from '../forms/input';
import Tabs from '../tabs';
import TabsPanel from '../tabs/panel';

import ColorUtils from '../../utilities/color';

import { COLOR_PICKER } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * * `hueSlider`: Instructions for hue selection input
	 * * `saturationValueGrid`: Instructions for using the grid for saturation
	 * and value selection
	 */
	assistiveText: PropTypes.shape({
		hueSlider: PropTypes.string,
		saturationValueGrid: PropTypes.string,
	}),
	/**
	 * Current color (in hexadecimal string)
	 */
	value: PropTypes.string,
	/**
	 * Unique ID for component
	 */
	id: PropTypes.string,
	/**
	 * Disables the input and button
	 */
	disabled: PropTypes.bool,
	/**
	 * Popover open state
	 */
	isOpen: PropTypes.bool,
	/**
	 * **Text labels for internationalization**
	 * * `blueAbbreviated`: One letter abbreviation of blue color component
	 * * `cancelButton`: Text for cancel button on popover
	 * * `customTab`: Text for custom tab of popover
	 * * `greenAbbreviated`: One letter abbreviation of green color component
	 * * `hexLabel`: Label for input of hexadecimal color
	 * * `invalidColor`: Error message when hex color input is invalid
	 * * `invalidComponent`: Error message when a component input is invalid
	 * * `label`: Label for entire colorpicker control
	 * * `redAbbreviated`: One letter abbreviation of red color component
	 * * `swatchTab`: Label for swatch tab of popover
	 * * `submitButton`: Text for submit/done button of popover
	 */
	labels: PropTypes.shape({
		blueAbbreviated: PropTypes.string,
		cancelButton: PropTypes.string,
		customTab: PropTypes.string,
		greenAbbreviated: PropTypes.string,
		hexLabel: PropTypes.string,
		invalidColor: PropTypes.string,
		invalidComponent: PropTypes.string,
		label: PropTypes.string,
		redAbbreviated: PropTypes.string,
		swatchTab: PropTypes.string,
		submitButton: PropTypes.string,
	}),
	/**
	 * Triggered when the date changes. It receives and event object that
	 * originally triggered the change, as well as an object in the shape `{
	 * color: [string] }`, which is a hex representation of the color.
	 */
	onChange: PropTypes.func,
	/**
	 * An array of hex color values which is used to set the options of the
	 * swatch tab of the colorpicker popover.
	 */
	swatchColors: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
	assistiveText: {
		saturationValueGrid:
			'Use arrow keys to select a saturation and brightness, on an x and y axis.',
		hueSlider: 'Select Hue',
	},
	labels: {
		blueAbbreviated: 'B',
		cancelButton: 'Cancel',
		customTab: 'Custom',
		greenAbbreviated: 'G',
		hexLabel: 'Hex',
		invalidColor: 'The color entered is invalid',
		invalidComponent: 'The value needs to be an integer from 0-255',
		label: 'Choose Color',
		redAbbreviated: 'R',
		submitButton: 'Done',
		swatchTab: 'Default',
	},
	swatchColors: [
		'#e3abec',
		'#c2dbf7',
		'#9fd6ff',
		'#9de7da',
		'#9df0c0',
		'#fff099',
		'#fed49a',
		'#d073e0',
		'#86baf3',
		'#5ebbff',
		'#44d8be',
		'#3be282',
		'#ffe654',
		'#ffb758',
		'#bd35bd',
		'#5779c1',
		'#5679c0',
		'#00aea9',
		'#3cba4c',
		'#f5bc25',
		'#f99221',
		'#580d8c',
		'#001970',
		'#0a2399',
		'#0b7477',
		'#0b6b50',
		'#b67e11',
		'#b85d0d',
	],
};

class ColorPicker extends React.Component {
	static displayName = COLOR_PICKER;
	static propTypes = propTypes;
	static defaultProps = defaultProps;

	constructor (props) {
		super(props);

		this.generatedId = this.props.id || shortid.generate();

		this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
		this.handleHexInputChange = this.handleHexInputChange.bind(this);
		this.handleSaturationValueChange = this.handleSaturationValueChange.bind(
			this
		);
		this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
		this.handleSwatchButtonClick = this.handleSwatchButtonClick.bind(this);
		this.handleSwatchSelect = this.handleSwatchSelect.bind(this);

		this.state = {
			currentColor: this.props.value,
			disabled: this.props.disabled,
			isOpen: this.props.isOpen,
			workingColor: ColorUtils.getNewColor({
				hex: this.props.value,
			}),
		};
	}

	componentWillMount () {
		checkProps(COLOR_PICKER, this.props);
	}

	// use getDerivedStateFromProps when available
	componentWillReceiveProps (nextProps) {
		const nextState = {};

		if (nextProps.value) {
			nextState.currentColor = nextProps.value;
			nextState.workingColor = ColorUtils.getNewColor({
				hex: nextProps.value,
			});
		}

		if (nextProps.disabled !== undefined) {
			nextState.disabled = nextProps.disabled;
		}

		this.setState(nextState);
	}

	getDialog () {
		return this.state.isOpen ? (
			<Dialog
				align="bottom left"
				contentsClassName="slds-color-picker__selector slds-popover"
				position="absolute"
				onRequestTargetElement={() => this.wrapper}
			>
				<div className="slds-popover__body">
					<Tabs>
						<TabsPanel label={this.props.labels.swatchTab}>
							<SwatchPicker
								color={this.props.workingColor}
								onSelect={this.handleSwatchSelect}
								swatchColors={this.props.swatchColors}
							/>
						</TabsPanel>
						<TabsPanel label={this.props.labels.customTab}>
							<CustomColor
								assistiveText={this.props.assistiveText}
								id={this.generatedId}
								color={this.state.workingColor}
								labels={this.props.labels}
								onBlueChange={this.handleColorChange('blue')}
								onGreenChange={this.handleColorChange('green')}
								onHexChange={this.handleColorChange('hex')}
								onHueChange={this.handleColorChange('hue')}
								onRedChange={this.handleColorChange('red')}
								onSaturationValueChange={this.handleSaturationValueChange}
								onSaturationNavigate={this.handleNavigate('saturation')}
								onValueNavigate={this.handleNavigate('value')}
							/>
						</TabsPanel>
					</Tabs>
				</div>
				<footer className="slds-popover__footer">
					<div className="slds-color-picker__selector-footer">
						<Button
							className="slds-color-picker__selector-cancel"
							label={this.props.labels.cancelButton}
							onClick={this.handleCancelButtonClick}
							variant="neutral"
						/>
						<Button
							className="slds-color-picker__selector-submit"
							label={this.props.labels.submitButton}
							onClick={this.handleSubmitButtonClick}
							variant="brand"
						/>
					</div>
				</footer>
			</Dialog>
		) : null;
	}

	setWorkingColor (event, color) {
		const newColor = ColorUtils.getNewColor(color, this.state.workingColor);
		this.setState({
			workingColor: newColor,
		});

		if (this.props.onWorkingColorChange) {
			this.props.onWorkingColorChange(event, { color: newColor });
		}
	}

	handleCancelButtonClick () {
		this.setState({
			isOpen: false,
		});
	}

	handleColorChange (property) {
		return (event) => {
			const colorProperties = {};
			colorProperties[property] = event.target.value;
			this.setWorkingColor(event, colorProperties);
		};
	}

	handleHexInputChange (event) {
		const currentColor = event.target.value;
		const isValid = ColorUtils.isValidHex(event.target.value);
		this.setState({
			currentColor,
			colorErrorMessage: isValid ? '' : this.props.labels.invalidColor,
		});

		if (this.props.onChange && isValid) {
			this.props.onChange(event, {
				color: currentColor,
			});
		}
	}

	handleNavigate (property) {
		return (event, { delta }) => {
			const colorProperties = {};
			colorProperties[property] = delta;
			const newColor = ColorUtils.getDeltaColor(
				colorProperties,
				this.state.workingColor
			);
			this.setState({
				workingColor: newColor,
			});

			if (this.props.onWorkingColorChange) {
				this.props.onWorkingColorChange(event, { color: newColor });
			}
		};
	}

	handleSaturationValueChange (event, { saturation, value }) {
		this.setWorkingColor(event, {
			saturation,
			value,
		});
	}

	handleSubmitButtonClick (event) {
		this.setState({
			isOpen: false,
			currentColor: this.state.workingColor.hex,
			colorErrorMessage: '',
		});

		if (this.props.onChange) {
			this.props.onChange(event, {
				color: this.state.workingColor.hex,
			});
		}
	}

	handleSwatchButtonClick () {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	handleSwatchSelect (event, { hex }) {
		this.setWorkingColor(event, {
			hex,
		});
	}

	render () {
		return (
			<div
				className="slds-color-picker"
				ref={(node) => {
					this.wrapper = node;
				}}
			>
				<div className="slds-color-picker__summary">
					<label
						className="slds-color-picker__summary-label"
						htmlFor={`color-picker-summary-input-${this.generatedId}`}
					>
						{this.props.labels.label}
					</label>
					<Button
						className="slds-color-picker__summary-button"
						disabled={this.props.disabled}
						iconClassName="slds-m-left_xx-small"
						iconPosition="right"
						iconVariant="more"
						label={<Swatch color={this.state.currentColor} />}
						onClick={this.handleSwatchButtonClick}
						variant="icon"
					/>
					<Input
						aria-describedby={`color-picker-summary-error-${this.generatedId}`}
						disabled={this.props.disabled}
						className={classNames('slds-color-picker__summary-input', {
							'slds-has-error': !!this.state.colorErrorMessage,
						})}
						id={`color-picker-summary-input-${this.generatedId}`}
						onChange={this.handleHexInputChange}
						value={this.state.currentColor}
					/>
					{this.getDialog()}
					{!this.state.isOpen && this.state.colorErrorMessage ? (
						<p
							className="slds-form-error"
							id={`color-picker-summary-error-${this.generatedId}`}
						>
							{this.state.colorErrorMessage}
						</p>
					) : (
						''
					)}
				</div>
			</div>
		);
	}
}

export default ColorPicker;
