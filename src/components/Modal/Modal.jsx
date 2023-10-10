import React, { useEffect } from 'react';
import css from './Modal.module.css';

export function Modal({ toggleModal, largeImageURL }) {
  useEffect(() => {
    const handleKeyEsc = e => {
      if (e.code === 'Escape') toggleModal();
    };

    document.addEventListener('keydown', handleKeyEsc);

    return () => {
      document.removeEventListener('keydown', handleKeyEsc);
    };
  }, [toggleModal]);

  return (
    <div className={css.Overlay} onClick={toggleModal}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={largeImageURL} className={css.ImgModal} />
      </div>
    </div>
  );
}

export default Modal;
