import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { name, type, label, testid, checked, onChange, id } = this.props;

    return (
      <label htmlFor={ name }>
        { label }
        <input
          key={ testid }
          checked={ checked }
          id={ id }
          name={ name }
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
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  checked: PropTypes.bool,
  testid: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  id: '',
  name: '',
  label: '',
  onChange: null,
  checked: null,
  testid: '',
};

export default Input;
