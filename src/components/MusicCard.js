import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { previewUrl, index } = this.props;
    const audioAlt = `Track Name ${index + 1}`;
    return (
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        {audioAlt}
        {' '}
        <code>audio</code>
      </audio>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default MusicCard;
