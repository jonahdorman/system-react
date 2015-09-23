/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const React = require('react');
const ReactDOM = require('react-dom');
const PT = React.PropTypes;
import {ButtonIcon} from "../SLDSIcons";
import Button from "../SLDSButton";

const classNames = require('classnames');
import {omit} from 'lodash';

class ModalFooter extends React.Component {

  getClassName(cls) {
    return classNames(this.props.className, 'slds-modal__footer');
  }

  render() {
    const props = omit(['className', 'flavor'], this.props);
    return (
      <div { ...props } className={this.getClassName()}>
        { this.props.children }
      </div>
    );
  }
}

class ModalBody extends React.Component {

  getClassName(cls) {
    return classNames(this.props.className, 'slds-modal__content');
  }

  render() {
    return (
      <div { ...this.props } className={this.getClassName()}>
        { this.props.children }
      </div>
    );
  }
}

class ModalHeader extends React.Component {

  getClassName(cls) {
    return classNames(this.props.className, 'slds-modal__header');
  }

  render() {
    return (
      <div { ...this.props } className={this.getClassName()}>
        { this.props.children }
        { this.props.closeButton ?
            <Button className="slds-modal__close">
              <ButtonIcon
                onClick={this.context.onRequestClose}
                iconFlavor="inverse,large"
                inverse={true}
                size="large"
                sprite="action"
                name="close"
                assistiveText="Close" />
            </Button>
            : null
        }
      </div>
    );
  }
}

ModalHeader.propTypes = { closeButton: PT.bool };
ModalHeader.defaultProps = { closeButton: true };
ModalHeader.contextTypes = { onRequestClose: PT.func };

class Modal extends React.Component {

  getChildContext() {
    return { onRequestClose: this.onClick.bind(this) };
  }

  onClick() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }
  onContentClick(e) {
    e.stopPropagation();
  }
  isModalChild(t) {
    let container = ReactDOM.findDOMNode(this);
    let node = t.parentNode;
    while (node !== null) {
      if (node === container) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  getClassName(cls) {
    return classNames(this.props.className, cls);
  }
  render() {
    const className = this.getClassName(classNames('slds-modal', {
      ['slds-fade-in-open']: this.props.isOpen
    }));
    const classNameModalContainer = 'slds-modal__container';
    const classNameModalBackdrop = classNames('slds-modal-backdrop', {
      ['slds-modal-backdrop--open']: this.props.isOpen
    });
    return (
      <div>
        <div aria-hidden={!this.props.isOpen} role="dialog" className={className} onClick={ this.onClick.bind(this) }>
          <div className={classNameModalContainer} onClick={ this.onContentClick.bind(this) } key="content">
            { this.props.children }
          </div>
        </div>
        <div className={classNameModalBackdrop} />
      </div>
    );
  }
}
Modal.childContextTypes = { onRequestClose: PT.func };

class ModalWrapper extends React.Component {

  componentDidMount() {
    const {renderInline} = this.props;
    const hasDOM = document && document.createElement;
    if (!renderInline && hasDOM) {
      this.__node = document.createElement('div');
      document.body.appendChild(this.__node);
      this.renderModal(this.props);
    }
  }
  componentWillUnmount() {
    if (this.__node) {
      ReactDOM.unmountComponentAtNode(this.__node);
      document.body.removeChild(this.__node);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.renderModal(nextProps);
  }
  render() {
    const {renderInline} = this.props;
    return renderInline
      ? <Modal {...this.props} tabindex="-1" />
      : null;
  }
  renderModal(props) {
    if (this.__node) {
      this.__modal = React.render(
        React.createElement(Modal, props),
        this.__node
      );
    }
  }
}
ModalWrapper.propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func,
    renderInline: React.PropTypes.bool
  };
ModalWrapper.defaultProps = { renderInline: false };

ModalWrapper.displayName = 'Modal';

ModalWrapper.Header = ModalHeader;
ModalWrapper.Body = ModalBody;
ModalWrapper.Footer = ModalFooter;

module.exports = ModalWrapper;
