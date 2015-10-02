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
import {default as PrismCode} from 'react-prism/lib/PrismCode';

import {SLDSButton, SLDSPicklistBase} from '../../../components';

import SLDSModal from '../../../components/SLDSModal';

module.exports = React.createClass( {

  getDefaultProps () {
    return {};
  },

  getInitialState () {
    return {
      modalIsOpen: false
    };
  },

  openModal () {
    this.setState({modalIsOpen: true});
  },

  closeModal () {
    this.setState({modalIsOpen: false});
  },

  handleSubmitModal () {
    this.closeModal();
  },

  getModalContent () {
    return  
    <div>
      <p>With the Lightning Design System you can build custom applications with a look and feel that is consistent with Salesforce core features — without reverse engineering our styles! Simply download our platform-agnostic CSS framework and get started today.</p>

{/*
    <SLDSPicklistBase
                    options={[
                      {label:'A Option Option Super Super Long',value:'A0'},
                      {label:'B Option',value:'B0'},
                      {label:'C Option',value:'C0'},
                      {label:'D Option',value:'D0'},
                      {label:'E Option',value:'E0'},
                      {label:'A1 Option',value:'A1'},
                      {label:'B2 Option',value:'B1'},
                      {label:'C2 Option',value:'C1'},
                      {label:'D2 Option',value:'D1'},
                      {label:'E2 Option Super Super Long',value:'E1'},

                    ]}
                    value='C0'
                    label="Contacts"
                    modal={true}
                    placeholder = "Select a contact"
                    onSelect={(value)=>{console.log('selected: ',value);}} />

*/}
                      <p>The Design System is an open source project on GitHub, meaning you can directly impact its evolution by filing issues and submitting pull requests.. This is as much your tool as it is ours, and we look forward to collaborating with developers and partners on making it even better.</p>

                      </div>;
  },

  render() {
    return (


            <div className='slds-p-around--medium'>

              <h3 className='slds-text-heading--medium slds-truncate'>
                Modal (Work in progress)
              </h3>
{/*
              <PrismCode className='language-markup'>
                {require("raw-loader!../../code-snippets/SLDSLookupPage.txt")}
              </PrismCode>
*/}

              <div className='slds-p-vertical--large'>
                <SLDSButton flavor='brand' onClick={this.openModal}>
                  Open Modal
                </SLDSButton>
                <SLDSModal 
                  isOpen={this.state.modalIsOpen}
                  title={<span>Lightning Design System: Style with Ease</span>}
                  footer={[
                    <button className='slds-button slds-button--neutral' onClick={this.closeModal}>Cancel</button>,
                    <button className='slds-button slds-button--neutral slds-button--brand' onClick={this.handleSubmitModal}>Save</button>
                  ]}
                  onRequestClose={this.closeModal}>
                  {this.getModalContent()}
                </SLDSModal>
              </div>
            </div>


    );
  },


});
