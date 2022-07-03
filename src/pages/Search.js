import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Input from './Input';

class Search extends Component {
  render() {
    const { value, onChange } = this.props;
    const enableSearchButton = value.length < 2;
    return (
      <div data-testid="page-search">
        <Header />
        <Input
          name="searchArtistName"
          type="text"
          value={ value }
          testid="search-artist-input"
          onChange={ onChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ enableSearchButton }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Search;
