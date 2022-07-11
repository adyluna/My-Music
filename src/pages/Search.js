import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Carregando from './Carregando';
import Header from '../components/Header';
import Input from '../components/Input';

class Search extends Component {
  createAlbumElement = (albums) => albums.map((
    {
      artistName,
      collectionId,
      artworkUrl100,
      collectionName,
    },
  ) => {
    const length = 40;
    const shortCollectionName = collectionName.substring(0, length);
    return (
      <div className="searchAlbum" key={ collectionId }>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          style={ { color: 'black', fontWeight: 'bold' } }
        >
          { collectionName.length > length ? `${shortCollectionName}...` : collectionName}
        </Link>
        <img src={ artworkUrl100 } alt={ collectionName } style={ { maxWidth: 100 } } />
        <p style={ { fontSize: 11 } }>{artistName}</p>
      </div>
    );
  });

  SearchResult = () => {
    const { currentArtistName, albums } = this.props;
    const searchResultMessage = `Resultado de álbuns de: ${currentArtistName}`;
    if (albums[0] === undefined) {
      return (
        <p>Nenhum álbum foi encontrado</p>
      );
    } return (
      <div className="loadedContainer">
        <this.LoadSearchInput />
        <p style={ { textAlign: 'center', fontSize: 35 } }>
          {searchResultMessage}
        </p>
        <div className="loadedAlbums">
          {this.createAlbumElement(albums)}
        </div>
      </div>
    );
  }

  LoadSearchInput = () => {
    const { value, onChange, searchArtistAlbums, isSearchLoading } = this.props;
    const enableSearchButton = value.length < 2;
    if (isSearchLoading) {
      return <Carregando />;
    } return (
      <div className="Search">
        <Header />
        <div className="searchInput">
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
  albums: PropTypes.arrayOf(PropTypes.object),
  searchArtistAlbums: PropTypes.func.isRequired,
  isSearchLoading: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Search.defaultProps = {
  albums: null,
};

export default Search;
