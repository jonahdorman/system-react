/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from "react";
const classNames = require("classnames");
import SLDSButton from "../SLDSButton";
import {Icon} from "../SLDSIcons";

const displayName = "SLDSNotification";
const propTypes = {
  /**
   * Custom classes applied to Notification element
   */
  className: React.PropTypes.string,
  /**
   * Message for notification
   */
  content: React.PropTypes.node,
  /**
   * if isDissmissible, close button appears for users to dismiss notification.
   */
  isDismissible: React.PropTypes.bool,
  /**
   * if duration exists, the notification will be visible for that amount of time.
   */
  duration: React.PropTypes.number,
  icon: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  onDismiss: React.PropTypes.func,
  /**
   * styling for notification background
   */
  returnFocusTo: React.PropTypes.node,
  texture: React.PropTypes.bool,
  theme: React.PropTypes.oneOf(["success", "warning", "error", "offline"]),
  variant: React.PropTypes.oneOf(["alert", "toast"]),
};

const defaultProps = {
  isDismissible: true,
  isOpen: false,
  returnFocusTo: null,
};

/**
 * The SLDS Notification component is used for alerts and toasts. For prompts, use the SLDS Modal component.<br />
 * For more details, please reference <a href="http://www.lightningdesignsystem.com/components/notifications">Lightning Design System - Notifications</a>.
 */
class SLDSNotification extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if(this.props.duration) {
      setTimeout(() => {
        this.onDismiss();
      }, this.props.duration)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isOpen !== this.props.isOpen){
      this.setState({ returnFocusTo: document.activeElement });
    }
  }

  //componentDidUpdate(prevProps) {
  //  if(prevProps.isOpen !== this.props.isOpen){
  //    const btn = React.findDOMNode(this.refs.dismissNotificationBtn);
  //    if(btn) btn.focus();
  //  }
  //}

  renderIcon(){
    if(this.props.icon){
      let classes = "";
      if(this.props.variant === "alert") {
        classes = "slds-m-right--x-small";
      }
      else if(this.props.variant === "toast") {
        classes = "slds-m-right--small slds-col slds-no-flex";
      }
      return <Icon category="utility" name={this.props.icon} size="small" className={classes} />;
    }
  }

  renderClose(){
    if(this.props.isDismissible){
      let size = "";
      if(this.props.variant === "alert") {
        size = "medium";
      }
      else if(this.props.variant === "toast") {
        size = "large";
      }
      return <SLDSButton
            assistiveText="Dismiss Notification"
            variant="icon-inverse"
            iconName="close"
            iconSize={size}
            className="slds-button slds-notify__close"
            onClick={this.onDismiss.bind(this)}
            //ref="dismissNotificationBtn"
          />
    }
  }

  onDismiss(){
    if(this.props.onDismiss) this.props.onDismiss();
    if(this.state.returnFocusTo && this.state.returnFocusTo.focus){
      this.state.returnFocusTo.focus();
    }
  }

  renderAlertContent(){
    return (
      <h2>
        {this.renderIcon()}
        {this.props.content}
      </h2>
    );
  }

  renderToastContent(){
    return (
      <section className="notify__content slds-grid">
        {this.renderIcon()}
        <div className="slds-col slds-align-middle">
          <h2 className="slds-text-heading--small ">{this.props.content}</h2>
        </div>
      </section>
    );
  }

  getClassName() {
    return classNames(this.props.className, "slds-notify", {
      [`slds-transition-hide`]: !this.props.isOpen,
      [`slds-notify--${this.props.variant}`]: this.props.variant,
      [`slds-theme--${this.props.theme}`]: this.props.theme,
      [`slds-theme--alert-texture-animated`]: this.props.texture,
    });
  }

  renderContent() {
    return (
      <div>
        {this.renderClose()}
        {this.props.variant === "toast" ? this.renderToastContent() : null}
        {this.props.variant === "alert" ? this.renderAlertContent() : null}
      </div>
    )
  }

  /*
   * The parent container with role="alert" only announces its content if there is a change inside of it.
   * Because React renders the entire element to the DOM, we must switch out a blank div for the real content.
   * Bummer, I know.
   */
  blankContent() {
    return (
      <div></div>
    )
  }

  render(){
    //TODO: If there are multiple notifications on a page, we must 'hide' the ones that aren't open.
    //Need to find a better way to do this than using width:0 to override slds-notify-container.
    let styles = !this.props.isOpen ? { "width": "0" } : {"width": "100%"};
    return (
      <div className="slds-notify-container" style={styles}>
        <div ref="alertContent" className={this.getClassName()} role="alert">
        {this.props.isOpen ? this.renderContent() : this.blankContent()}
        </div>
      </div>
    );
  }
}

SLDSNotification.displayName = displayName;
SLDSNotification.propTypes = propTypes;
SLDSNotification.defaultProps = defaultProps;

module.exports = SLDSNotification;

