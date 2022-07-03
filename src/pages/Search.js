import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Carregando from './Carregando';
import Header from '../components/Header';
import Input from './Input';

class Search extends Component {
  createAlbumElement = (albums) => albums.map((
    {
      artistName,
      collectionId,
      artworkUrl100,
      collectionName,
    },
  ) => (
    <div key={ collectionId }>
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        {collectionName}
      </Link>
      <img src={ artworkUrl100 } alt={ collectionName } />
      <p style={ { fontSize: 11 } }>{artistName}</p>
    </div>
  ));

  SearchResult = () => {
    const { currentArtistName, albums } = this.props;
    const searchResultMessage = `Resultado de álbuns de: ${currentArtistName}`;
    if (albums.length === 0) {
      return (
        <p>Nenhum álbum foi encontrado</p>
      );
    } return (
      <div>
        <this.LoadSearchInput />
        <p>
          {searchResultMessage}
        </p>
        {this.createAlbumElement(albums)}
      </div>
    );
  }

  LoadSearchInput = () => {
    const { value, onChange, searchArtistAlbums, isSearchLoading } = this.props;
    const enableSearchButton = value.length < 2;
    if (isSearchLoading) {
      return <Carregando />;
    } return (
      <div>
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
          onClick={ () => searchArtistAlbums() }
        >
          Pesquisar
        </button>
      </div>
    );
  }

  render() {
    const { albums } = this.props;
    return (
      <div data-testid="page-search">
        { albums ? <this.SearchResult /> : <this.LoadSearchInput />}
      </div>
    );
  }
}

Search.propTypes = {
  currentArtistName: PropTypes.string.isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchArtistAlbums: PropTypes.string.isRequired,
  isSearchLoading: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Search;
