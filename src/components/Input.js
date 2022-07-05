import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { name, type, label, testid, checked, onChange } = this.props;

    return (
      <label htmlFor={ name }>
        { label }
        <input
          checked={ checked }
          id={ name }
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
  checked: PropTypes.bool,
  testid: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  label: PropTypes.string,
  onChange: PropTypes.func,
  handleAddFavorite: PropTypes.func,
};

Input.defaultProps = {
  name: '',
  label: '',
  onChange: null,
  handleAddFavorite:null,
  value: '',
  checked: null,
  testid: '',
};

export default Input;
