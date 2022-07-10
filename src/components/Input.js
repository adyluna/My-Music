import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { name, type, label, testid, checked, onChange, id, value, placeholder } = this.props;

    return (
      <div>
        <label htmlFor={ id }>
          { label }
        </label>
        <input
          value={ value }
          key={ testid }
          checked={ checked }
          id={ id }
          name={ name }
          type={ type }
          placeholder={ placeholder }
          onChange={ onChange }
          data-testid={ testid }
          required
        />
      </div>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string,
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
  value: '',
  id: '',
  name: '',
  label: '',
  onChange: null,
  checked: null,
  testid: '',
};

export default Input;
