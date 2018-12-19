import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import './TextEditor.css';
 
export default class TextEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };
 
  state = {
    value: RichTextEditor.createValueFromString(this.props.startingValue, 'html')
  }
 
  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  };
 
  render () {
    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}