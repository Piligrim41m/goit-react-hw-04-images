import { useState, useEffect, useCallback } from 'react';

import s from './App.module.css';

import Searchbar from './component/Searchbar';
import PreLoader from './component/PreLoader';
import Modal from './component/Modal';
import ImageGallery from './component/ImageGallery';
import LoadMore from './component/LoadMore';

import fetchDataApi from './services/fetchDataApi';

function App() {
  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(null);
  const [largeImage, setLargeImage] = useState({});
  const [total, setTotal] = useState(0);

  const fetchGallary = useCallback(() => {
    setShowLoader(true);

    fetchDataApi(searchQuery, page)
      .then(({ hits, total }) => {
        setGallery(prev => [...prev, ...hits]);
        setTotal(total);

        scrollToDown();
      })
      .catch(error => setError(error))
      .finally(() => setShowLoader(false));
  }, [page, searchQuery]);

  const scrollToDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleFormSubmit = query => {
    if (query === searchQuery) {
      return;
    }

    setSearchQuery(query);
    setGallery([]);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const handleOpenPicture = largeImage => {
    setLargeImage(largeImage);
    toggleModal();
  };

  const showLoadMore = () => {
    return Math.ceil(total / 12) !== page - 1;
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    fetchGallary();
  }, [fetchGallary, searchQuery]);

  return (
    <div className={s.container}>
      <Searchbar onSubmit={handleFormSubmit} />

      {error && <p>{error.message}</p>}

      {gallery.length > 0 && (
        <ImageGallery gallery={gallery} onOpenPicture={handleOpenPicture} />
      )}

      {showLoader && <PreLoader />}

      {gallery.length > 0 && !showLoader && showLoadMore() && (
        <LoadMore onLoadMore={loadMore} />
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage.largeImageURL} alt={largeImage.tags} />
        </Modal>
      )}
    </div>
  );
}

export default App;