import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
    };
  }

  componentDidMount() {
    this.handle8LastRequirement();
    this.handlChecked();
  }

  handlChecked = async () => {
    const { song } = this.props;
    // const FAVORITE_SONGS_KEY = 'favorite_songs';

    // if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY))) {
    //   localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
    // }
    // const readFavoriteSongs = JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY));
    const favorites = await getFavoriteSongs();

    favorites.filter(({
      trackId }) => {
      if (trackId === song.trackId) {
        this.setState({ isChecked: true });
      } return true;
    });
  };

  handle8LastRequirement = async () => {
    const { song } = this.props;
    const FAVORITE_SONGS_KEY = 'favorite_songs';
    if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY))) {
      localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
    }
    const readFavoriteSongs = JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY));
    readFavoriteSongs.filter(({
      trackId }) => {
      if (trackId === song.trackId) {
        this.setState({ isChecked: true });
      } return false;
    });
  };

  handleAddFavorite = async () => {
    const { handleLoading, song } = this.props;
    handleLoading();
    await addSong(song);
    handleLoading();
  };

  render() {
    const { isChecked } = this.state;
    const { song } = this.props;

    return (
      <div>
        <h4>{ song.trackName }</h4>
        <Input
          id={ song.trackId }
          name="isSongSaved"
          testid={ `checkbox-music-${song.trackId}` }
          label="Favorita"
          type="checkbox"
          checked={ isChecked }
          onChange={ this.handleAddFavorite }
        />
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  handleLoading: PropTypes.func.isRequired,
  song: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])).isRequired,
};

export default MusicCard;
