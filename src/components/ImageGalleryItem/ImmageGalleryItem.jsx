import React from 'react';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  handleImgClick,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        id={id}
        className={css.ImageGalleryItemImage}
        onClick={() => handleImgClick(id)}
      />
    </li>
  );
};

export default ImageGalleryItem;
