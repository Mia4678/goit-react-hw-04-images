import React, { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreButton from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import { fetchImages } from '../../API/ApiFetch';
import css from './App.module.css';

export function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  // const handleSubmit = query => {
  //   setSearchQuery(query);
  //   setImages([]);
  //   setPage(1);
  // };

  // useEffect(() => {
  //   if (page === 1) {
  //     setImages(null);
  //   }
  //   fetchImages();
  //   fetchPhotos();
  // }, [page, searchQuery]);

  // const fetchPhotos = async () => {
  //   try {
  //     setIsLoading(true);

  //     const data = await fetchImages(searchQuery, page);

  //     if (page === 1) {
  //       setImages(data.hits);
  //     } else {
  //       setImages(prevImages => [...prevImages, ...data.hits]);
  //     }
  //   } catch (error) {
  //     setError(error.response.data);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (page === 1) {
  //     setImages(null);
  //   }
  // }, [page, searchQuery, fetchPhotos]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!searchQuery) return;

      setIsLoading(true);
      try {
        const data = await fetchImages(searchQuery, page);

        if (page === 1) {
          setImages(data.hits);
        } else {
          setImages(prevImages => [...prevImages, ...data.hits]);
        }
      } catch (error) {
        setError(error.response.data);
      } finally {
        setIsLoading(false);
      }
    };

    if (page === 1) {
      setImages(null);
    }

    fetchPhotos();
  }, [page, searchQuery]);

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchQuery = value => {
    setSearchQuery(value);
    setPage(1);
  };

  const toggleModal = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  };

  const handleImgClick = id => {
    const targetEl = images.find(one => one.id === id);

    setLargeImageURL(targetEl.largeImageURL);
    toggleModal();
  };

  return (
    <div className={css.App}>
      {error && <h1>{error}</h1>}

      <Searchbar submit={handleSearchQuery} />

      {images &&
        (!images.length ? (
          <h1>No data found</h1>
        ) : (
          <ImageGallery
            images={images}
            handleImgClick={handleImgClick}
            toggleModal={toggleModal}
          />
        ))}

      {images &&
        (!images.length ? null : images.length % 12 ? (
          <h1>End of results</h1>
        ) : (
          <LoadMoreButton handleLoadMoreClick={handleLoadMoreClick} />
        ))}

      {isLoading && <Loader />}

      {isModalOpen && (
        <Modal toggleModal={toggleModal} largeImageURL={largeImageURL} />
      )}
    </div>
  );
}

export default App;
