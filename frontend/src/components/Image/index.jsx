import React from 'react';
import PropTypes from 'prop-types';

const defaultPhoto = './default-photo.png';

const Image = ({src, width = 'auto', height = 'auto', alt = '', circular = false, responsive = false}) => {
  let boxStyle = {
    overflow: 'hidden'
  };
  
  let imageStyle = {
    objectFit: 'cover',
    height: '100%'
  };
  
  if (responsive) {
    boxStyle = {
      ...boxStyle, ...{
        width: '100%'
      }
    };
  } else {
    boxStyle = {
      ...boxStyle, ...{
        width,
        height
      }
    };
  }
  
  if (circular) {
    boxStyle.borderRadius = '50%';
  }
  
  let normalizedSource = src;
  if (src == null || src.toLowerCase() === 'n/a')
    normalizedSource = defaultPhoto;
  
  const imageOnError = (e) => {
    e.target.src = defaultPhoto;
  }
  
  return (
      <div style={boxStyle}>
        <img src={normalizedSource} alt={alt} style={imageStyle} onError={imageOnError} />
      </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  alt: PropTypes.string,
  circular: PropTypes.bool,
  responsive: PropTypes.bool
};

export default Image;
