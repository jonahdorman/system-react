/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

import React from 'react';
import SLDSButton from '../SLDSButton';
import {Icon} from '../SLDSIcons';
import {EventUtil} from '../utils';
import SLDSSettings from '../SLDSSettings';


import Modal from 'react-modal';

const customStyles = {
  content : {
    position                : 'default',
    top                     : 'default',
    left                    : 'default',
    right                   : 'default',
    bottom                  : 'default',
    border                  : 'default',
    background              : 'default',
    overflow                : 'default',
    WebkitOverflowScrolling : 'default',
    borderRadius            : 'default',
    outline                 : 'default',
    padding                 : 'default'
  },
  overlay : {
    backgroundColor: 'default'
  }
};

module.exports = React.createClass( {

  getDefaultProps () {
    return {
      title:'',
      isOpen:false,
      content:[],
      footer:[],
      returnFocusTo:null
    };
  },

  getInitialState () {
    return {
      isClosing: false,
      revealed: false
    };
  },

  componentDidMount () {
    Modal.setAppElement(SLDSSettings.getAppElement());
    console.log('!!! window.activeElement !!! ',document.activeElement);
    this.setState({returnFocusTo:document.activeElement})
    if(!this.state.revealed){
      setTimeout(()=>{
        this.setState({revealed:true});
      });
    }
    this.updateBodyScroll();
  },

  closeModal () {
    this.setState({isClosing: true});
    if(this.state.returnFocusTo && this.state.returnFocusTo.focus){
      this.state.returnFocusTo.focus();
    }
    if(this.props.onRequestClose){
      this.props.onRequestClose();
    }
  },

  handleSubmitModal () {
    this.closeModal();
  },

  updateBodyScroll () {
    if(window && document && document.body){
      if(this.props.isOpen){
        document.body.style.overflow = 'hidden';
      }
      else{
        document.body.style.overflow = 'inherit';
      }
    }
  },

  handleModalClick(event) {
    if(event && event.stopPropagation){
      event.stopPropagation();
    }
  },

  getModal() {
    return <div 
            className={'slds-modal' +(this.state.revealed?' slds-fade-in-open':'')} 
            style={{pointerEvents:'inherit'}}
            onClick={this.closeModal}
          >
          <div 
            role='dialog'
            className='slds-modal__container' 
            onClick={this.handleModalClick}
            >
            <div className='slds-modal__header'>
              <h2 className='slds-text-heading--medium'>{this.props.title}</h2>
              <SLDSButton className='slds-button slds-modal__close' onClick={this.closeModal}>
                <Icon name='close' category='utility' size='small'/>
                <span className='slds-assistive-text'>Close</span>
              </SLDSButton>
            </div>

            <div className='slds-modal__content'>

              {this.props.children}

            </div>
            <div className='slds-modal__footer'>
              {this.props.footer}
            </div>

          </div>

        </div>;
  },

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        overlayClassName={'slds-modal-backdrop'+ (this.state.revealed?' slds-modal-backdrop--open':'')} >
        {this.getModal()}
      </Modal>
    );
  },

  componentDidUpdate (prevProps, prevState) {


    if(this.props.isOpen !== prevProps.isOpen){
      this.updateBodyScroll();
    }

    if(this.state.isClosing !== prevState.isClosing){



      if(this.state.isClosing){
        console.log('CLOSING: ');

        if(this.isMounted()){
          const el = this.getDOMNode().parentNode;
          if(el && el.getAttribute('data-slds-modal')){
            React.unmountComponentAtNode(el);
            document.body.removeChild(el);
          }
        }
      }
    }


  }


});
