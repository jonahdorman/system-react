import React from 'react';
import classNames from 'classnames';

import Input from '../../forms/input';

class CustomColorForm extends React.Component {
	static displayName = 'SLDSCustomColorForm';

	render () {
		return (
			<div className="slds-color-picker__custom-inputs">
				<Input
					aria-describedby={`color-picker-custom-error-${this.props.id}`}
					className={classNames('slds-color-picker__input-custom-hex', {
						'slds-has-error':
							this.props.color.errors && this.props.color.errors.hex,
					})}
					id={`color-picker-input-hex-${this.props.id}`}
					label={this.props.labels.hexLabel}
					onChange={this.props.onHexChange}
					value={this.props.color.hex}
				/>
				<Input
					aria-describedby={`color-picker-custom-error-${this.props.id}`}
					className={classNames('slds-color-picker__input-custom-r', {
						'slds-has-error':
							this.props.color.errors && this.props.color.errors.red,
					})}
					id={`color-picker-input-r-${this.props.id}`}
					label={this.props.labels.redAbbreviated}
					onChange={this.props.onRedChange}
					value={String(this.props.color.rgb.red)}
				/>
				<Input
					aria-describedby={`color-picker-custom-error-${this.props.id}`}
					className={classNames('slds-color-picker__input-custom-g', {
						'slds-has-error':
							this.props.color.errors && this.props.color.errors.green,
					})}
					id={`color-picker-input-g-${this.props.id}`}
					label={this.props.labels.greenAbbreviated}
					onChange={this.props.onGreenChange}
					value={String(this.props.color.rgb.green)}
				/>
				<Input
					aria-describedby={`color-picker-custom-error-${this.props.id}`}
					className={classNames('slds-color-picker__input-custom-b', {
						'slds-has-error':
							this.props.color.errors && this.props.color.errors.blue,
					})}
					id={`color-picker-input-b-${this.props.id}`}
					label={this.props.labels.blueAbbreviated}
					onChange={this.props.onBlueChange}
					value={String(this.props.color.rgb.blue)}
				/>
			</div>
		);
	}
}

export default CustomColorForm;
