import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { API_IMG } from '../services/api.js';
import { useTranslation } from 'react-i18next';
import { useMovieList } from '../context/MovieListContext.js';
import { toast } from 'react-toastify';

const MovieBox = ({ title, poster_path, vote_average, release_date, overview, id }) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const { addMovie, selectedMovies, removeMovie } = useMovieList();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const isMovieInList = selectedMovies.some((movie) => movie.id === id);


  const handleAddToList = () => {
    if (isMovieInList) {
      toast.warning(`${title} is already in your list!`);
      return;
    }
    const movie = { id, title, poster_path, vote_average, release_date, overview };
    addMovie(movie);
    toast.success(`${title} added to your list!`);
  };


  return (
    <div className="shadow-2xl">
      <img className="w-full z-100 rounded-3xl mt-12 md:h-64 object-cover hover:scale-110" src={API_IMG + poster_path} alt={title} />
      <div className="p-3 cursor-pointer">
        <div className='flex justify-center gap-2 text-white'>
          <h5 className="text-xs md:text-lg lg:text-lg font-bold text-center" onClick={handleShow}>{t('movieBox.viewMore')} </h5>
          <button
            variant="outline-light"
            className="text-2xl w-10 rounded-r-full md:pb-2 -translate-y-1 bg-blue-500 hover:bg-blue-400"
            onClick={isMovieInList ? () => removeMovie(id) : handleAddToList}
            disabled={isMovieInList}
          >
            {isMovieInList ? '-' : '+'}
          </button>
        </div>
        <Modal show={show} onHide={handleClose} className="animate-fadeIn">
          <Modal.Body className="bg-gray-800 text-white animate-fadeIn">
            <img className="w-full mb-4" src={API_IMG + poster_path} alt={title} />
            <div className='flex items-center justify-between text-xl text-green-500'>
              <h5> {t('movieBox.rating', { rating: vote_average })}</h5>
              <h5>{t('movieBox.releaseDate', { date: release_date })}</h5>
            </div>
            <h6 className="text-sm text-justify">{t('movieBox.overview', { overview: overview })}</h6>
          </Modal.Body>
          <Button variant="danger" className='pt-2 pb-2 text-xl !border-none !rounded-none' onClick={handleClose}> {t('movieBox.close')}</Button>
        </Modal>
      </div>
    </div>
  );
};

export default MovieBox;