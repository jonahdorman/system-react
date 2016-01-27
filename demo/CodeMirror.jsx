const CM = require('codemirror');
import 'codemirror/addon/runmode/runmode';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/solarized.css';
import 'demo/assets/styles/codemirror.css';

const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames');

const SLDSButton =  require('../components/SLDSButton');
const SLDSButtonStateful =  require('../components/SLDSButtonStateful');
const SLDSButtonGroup =  require('../components/SLDSButtonGroup');
const SLDSIcon =  require('../components/SLDSIcon');
const SLDSLookup =  require('../components/SLDSLookup');
const SLDSMenuDropdown =  require('../components/SLDSMenuDropdown');
const SLDSMenuPicklist =  require('../components/SLDSMenuPicklist');
const SLDSModal =  require('../components/SLDSModal');
const SLDSNotification =  require('../components/SLDSNotification');
const SLDSPopoverTooltip =  require('../components/SLDSPopoverTooltip');
const SLDSDateInput =  require('../components/SLDSDateInput');


const displayName = 'CodeMirror';
const propTypes = {
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onFocusChange: React.PropTypes.func,
  options: React.PropTypes.object,
  path: React.PropTypes.string,
  value: React.PropTypes.string,
};
const defaultProps = {};

function request (url, method, data, callback) {
  const request = new window.XMLHttpRequest()
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      const res = JSON.parse(request.responseText)
      if (request.status === 200) {
        if (res.response) {
          return callback(null, res.response)
        }
        if (res.error) {
          return callback(new Error(res.error))
        }
      } else {
        return callback(new Error('REQUEST_ERROR'))
      }
    }
  }
  request.open(method, url)
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  request.send(JSON.stringify(data))
}

class CodeMirrorEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.refs.editor);
    this.editor = CM.fromTextArea(node, {
      mode: 'javascript',
      lineNumbers: true,
      lineWrapping: false,
      matchBrackets: true,
      tabSize: 2,
      theme: 'solarized light',
      readOnly: this.props.readOnly
    });
    this.editor.on('change', this.handleChange);
  }

  componentDidUpdate() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  }

  handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  }

  render() {
    let editor = <textarea ref="editor" defaultValue={this.props.codeText} />;
    return (
      <div style={this.props.style} className={this.props.className}>
        {editor}
      </div>
      );
  }
}

class CodeMirror extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      code: props.codeText,
      showCode: true
    };
  }

  componentDidMount() {
    this.executeCode();
  }

  handleCodeChange(code) {
    clearTimeout(this._codeTimeout);
    this._codeTimeout = setTimeout(() => {
      this.setState({ code }, this.executeCode);
    }, 300)
  }

  clearExample() {
    const mountNode = ReactDOM.findDOMNode(this.refs.mount);
    try {
      ReactDOM.unmountComponentAtNode(mountNode);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
    return mountNode;
  }

  executeCode() {
    request('/api/transform/js', 'POST', {
      js: this.state.code
    }, (err, result) => {
      const mountNode = this.clearExample();
      if (err) {
        // TODO: Display error message
        clearTimeout(this.errorTimeout);
        this.errorTimeout = setTimeout(() => {
          ReactDOM.render(
            <div bsStyle="danger">
            {err.toString()}
            </div>,
            mountNode
          );
        }, 500);
        return;
      }
      /* eslint-disable */
      eval(result);
      /* eslint-enable */
    })
  }


  renderEditor() {
    if (!this.state.showCode) {
      return null;
    }

    return (
      <div>
        <h1 className="slds-text-heading--small slds-p-vertical--small">Edit code to modify above examples</h1>
        <CodeMirrorEditor
          key="jsx"
          onChange={this.handleCodeChange.bind(this)}
          className="highlight"
          codeText={this.state.code}
        />
      </div>
    );
  }

  renderExample() {
    return (
      <div className={classNames('bs-example', this.props.exampleClassName)}>
        <div ref="mount" />
      </div>
    );
  }

  toggleEditor() {
    this.setState({ showCode: !this.state.showCode })
  }

  render() {
    return (
      <div className="playground">
        <div className="slds-p-vertical--medium">
          {this.renderExample()}
        </div>

        <SLDSButton label={this.state.showCode ? "Hide Code" : "Show Code"} onClick={this.toggleEditor.bind(this)} />
        {this.renderEditor()}
      </div>
    );
  }
}

CodeMirror.displayName = displayName;
CodeMirror.propTypes = propTypes;
CodeMirror.defaultProps = defaultProps;

module.exports = CodeMirror;

