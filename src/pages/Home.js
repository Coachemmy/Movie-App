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
import ChatbotModal from '../components/ChatBotModal.js';

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
    const [showChatbot, setShowChatbot] = useState(false);


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
            <NavbarComponent
                query={query}
                searchMovie={searchMovie}
                changeHandler={changeHandler}
                onLanguageChange={handleLanguageChange}
            />

             <div className="flex relative ">
                {/* Main content */}
                <div className={`flex-grow p-4 bg-black transition-all duration-300 ${showChatbot ? 'mr-80' : ''}`}>
                {selectedMovies.length > 0 && (
                    <div className="fixed right-6 bottom-24 bg-white text-black p-4 rounded-full shadow-lg z-50 flex items-center justify-center w-12 h-12 cursor-pointer" onClick={() => setShowModal(true)}>
                        {selectedMovies.length}
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
            {/* Chatbot sidebar */}
                <div className={`fixed right-0 top-0 h-full w-1/2 bg-gray-900 border-l border-gray-800 z-50 transition-transform duration-300 ${showChatbot ? 'translate-x-0' : 'translate-x-full'}`}>
                    <ChatbotModal onHide={() => setShowChatbot(false)} />
                </div>
            </div>
            
            {/* Chatbot toggle button */}
            <button 
                onClick={() => setShowChatbot(!showChatbot)}
                className="fixed right-6 bottom-40 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors flex items-center justify-center w-12 h-12"
            >
                {showChatbot ? '✕' : 'AI'}
            </button>
            <Footer />

            <MovieListModal show={showModal} onHide={() => setShowModal(false)} />
        </>
    );
}

export default Home;