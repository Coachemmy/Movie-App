import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { API_SEARCH, API_URL } from '../services/api.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import Footer from '../components/Footer.js';
import MovieList from '../components/MovieList.js';
import Pagination from '../components/Pagination.js';
import NoMoviesFound from '../components/NoMoviesFound.js';
import NavbarComponent from '../components/NavbarComponent.js';
import { useSearchParams } from 'react-router-dom';
import { useMovieList } from '../context/MovieListContext.js';
import MovieListModal from '../components/MovieListModal.js';

function Home() {
    const { t } = useTranslation();
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get('page')) || 1;
    const [page, setPage] = useState(initialPage);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem('language') || 'en'
    );
    const { selectedMovies } = useMovieList();
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        i18next.changeLanguage(selectedLanguage);
        localStorage.setItem('language', selectedLanguage);
        fetchMovies(API_URL, page);
    }, [page, selectedLanguage]);

    useEffect(() => {
        setSearchParams({ page });
    }, [page, setSearchParams]);

    const fetchMovies = async (url, page) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}&page=${page}`);
            const data = await response.json();
            setMovies(data.results);
        } finally {
            setIsLoading(false);
        }
    };

    const searchMovie = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const url = `${API_SEARCH}=${query}`;
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
        } finally {
            setIsLoading(false);
        }
    };

    const changeHandler = (e) => {
        setQuery(e.target.value);
    };

    const handlePageChange = (newPage) => {
        const maxPagesToShow = 20;
        if (newPage >= 1 && newPage <= maxPagesToShow) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleLanguageChange = (languageCode) => {
        setSelectedLanguage(languageCode);
        i18next.changeLanguage(languageCode);
    };

    return (
        <>

            <NavbarComponent query={query} searchMovie={searchMovie} changeHandler={changeHandler} onLanguageChange={handleLanguageChange} />
            <div className="flex-grow p-4 bg-black">
                {selectedMovies.length > 0 && (
                    <div className="fixed bottom-20 z-50 right-4 bg-white text-black p-3 rounded-full shadow-lg cursor-pointer" onClick={() => setShowModal(true)}>
                        🎬 {selectedMovies.length}
                    </div>
                )}
                {isLoading ? (
                    <LoadingSpinner />
                ) : movies.length > 0 ? (
                    <div className="container mx-auto">
                        <MovieList movies={movies} />
                        <Pagination page={page} handlePageChange={handlePageChange} />
                    </div>
                ) : (
                    <NoMoviesFound message={t('home.noMoviesFound')} />
                )}
            </div>
            <Footer />

            <MovieListModal show={showModal} onHide={() => setShowModal(false)} />
        </>

    );
}

export default Home;