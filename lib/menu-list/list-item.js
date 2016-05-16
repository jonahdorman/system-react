'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _KEYS = require('../../utilities/KEYS');

var _KEYS2 = _interopRequireDefault(_KEYS);

var _EventUtil = require('../../utilities/EventUtil');

var _EventUtil2 = _interopRequireDefault(_EventUtil);

var _listItemLabel = require('./list-item-label');

var _listItemLabel2 = _interopRequireDefault(_listItemLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var displayName = "List-Item";
var propTypes = {
  data: _react2.default.PropTypes.object,
  checkmark: _react2.default.PropTypes.bool,
  index: _react2.default.PropTypes.number,
  inverted: _react2.default.PropTypes.bool,
  isHighlighted: _react2.default.PropTypes.bool,
  isSelected: _react2.default.PropTypes.bool,
  label: _react2.default.PropTypes.string,
  labelRenderer: _react2.default.PropTypes.func,
  value: _react2.default.PropTypes.any,
  onBlur: _react2.default.PropTypes.func,
  onClick: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onMoveFocus: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func
};
var defaultProps = {
  data: {},
  index: 0,
  inverted: false,
  isHighlighted: false,
  isSelected: false,
  label: '',
  labelRenderer: _listItemLabel2.default,
  onBlur: function onBlur(relatedTarget) {
    console.log('onBlur should be defined ', relatedTarget);
  },
  onClick: function onClick(index) {
    console.log('onClick should be defined ', index);
  },
  onFocus: function onFocus(index, height) {
    console.log('onFocus should be defined ', index, height);
  },
  onMoveFocus: function onMoveFocus(delta) {
    console.log('onMoveFocus should be defined ', delta);
  },
  onSelect: function onSelect(index) {
    console.log('onSelect should be defined ', index);
  },

  value: null
};

var ListItem = function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ListItem).apply(this, arguments));
  }

  _createClass(ListItem, [{
    key: 'handleClick',
    value: function handleClick(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.props.onSelect) {
        this.props.onSelect(this.props.index);
      }
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      if (e.nativeEvent) {
        e.nativeEvent.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
      }
      e.preventDefault();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.isHighlighted) {
        this.setFocus();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (!prevProps.isHighlighted && this.props.isHighlighted) {
        this.setFocus();
      }
    }
  }, {
    key: 'setFocus',
    value: function setFocus() {
      if (!this.props.isHover) {
        _reactDom2.default.findDOMNode(this.refs.link).focus();
      }
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      if (event.keyCode) {
        if (event.keyCode === _KEYS2.default.DOWN) {
          _EventUtil2.default.trapEvent(event);
          if (this.props.onMoveFocus) {
            this.props.onMoveFocus(1);
          }
        } else if (event.keyCode === _KEYS2.default.UP) {
          _EventUtil2.default.trapEvent(event);
          if (this.props.onMoveFocus) {
            this.props.onMoveFocus(-1);
          }
        } else if (event.keyCode === _KEYS2.default.ENTER || event.keyCode === _KEYS2.default.SPACE) {
          _EventUtil2.default.trapEvent(event);
          if (this.props.onSelect) {
            this.props.onSelect(this.props.index);
          }
        } else if (event.keyCode === _KEYS2.default.ESCAPE) {
          _EventUtil2.default.trapEvent(event);
          if (this.props.onCancel) {
            this.props.onCancel();
          }
        } else if (event.keyCode === _KEYS2.default.TAB) {} else {
          _EventUtil2.default.trapEvent(event);
          var ch = String.fromCharCode(event.keyCode);
          if (this.props.onSearch) {
            this.props.onSearch(this.props.index, ch);
          }
        }
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      if (this.props.onBlur) {
        this.props.onBlur(this.props.index, e.relatedTarget, e);
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      var height = _reactDom2.default.findDOMNode(this).offsetHeight;
      if (height && this.props.onFocus) {
        this.props.onFocus(this.props.index, height);
      }
    }
  }, {
    key: 'getLabel',
    value: function getLabel() {
      var LabelComp = this.props.labelRenderer;
      return _react2.default.createElement(LabelComp, {
        checkmark: this.props.checkmark,
        index: this.props.index,
        label: this.props.label,
        value: this.props.value,
        inverted: this.props.inverted,
        isSelected: this.props.isSelected,
        isHighlighted: this.props.isHighlighted,
        data: this.props.data
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var isSelected = this.props.isSelected ? " slds-is-selected" : "";
      //    console.log('!!!ListItem render');
      return _react2.default.createElement(
        'li',
        {
          className: "slds-dropdown__item" + isSelected,
          onMouseDown: this.handleMouseDown.bind(this)
          //        onMouseEnter={this.props.onMouseEnter}
          //        onMouseLeave={this.props.onMouseLeave}
        },
        _react2.default.createElement(
          'a',
          { id: 'menu-0-' + this.props.index,
            href: 'javascript:void(0)',
            ref: 'link',
            'data-index': this.props.index,
            onClick: this.handleClick.bind(this)
            //            onMouseDown={this.handleMouseDown.bind(this)}
            //            onKeyDown={this.handleKeyDown.bind(this)}
            , onFocus: this.handleFocus.bind(this),
            'aria-checked': this.props.isSelected,
            role: 'menuitemradio',
            tabIndex: -1 },
          this.getLabel()
        )
      );
    }
  }]);

  return ListItem;
}(_react2.default.Component);

ListItem.displayName = displayName;
ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

module.exports = ListItem;