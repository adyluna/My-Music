import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { name, type, label, testid, checked, value, onChange } = this.props;

    return (
      <label htmlFor={ name }>
        { label }
        <input
          checked={ checked }
          id={ name }
          name={ name }
          value={ value }
          type={ type }
          onChange={ onChange }
          data-testid={ testid }
          required
        />
      </label>
    );
  }
}

Input.propTypes = {
  checked: PropTypes.bool,
  testid: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  label: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  name: '',
  label: '',
  onChange: null,
  value: '',
  checked: null,
};

export default Input;
