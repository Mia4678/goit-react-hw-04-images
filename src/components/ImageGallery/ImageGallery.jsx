import React from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImmageGalleryItem';

export const ImageGallery = ({ images, handleImgClick, toggleModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(one => (
        <ImageGalleryItem
          key={one.id}
          webformatURL={one.webformatURL}
          tags={one.tags}
          largeImageURL={one.largeImageURL}
          id={one.id}
          toggleModal={toggleModal}
          handleImgClick={handleImgClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
