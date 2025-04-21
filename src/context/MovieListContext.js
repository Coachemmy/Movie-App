import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { API_BACKEND } from '../services/api.js';

const MovieListContext = createContext();

export const MovieListProvider = ({ children }) => {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${API_BACKEND}`);
      const data = await response.json();
      setSelectedMovies(data);
    } catch (error) {
      toast.error('Error fetching movies:', error);
    }
  };

  const addMovie = async (movie) => {
    try {
      const response = await fetch(`${API_BACKEND}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error && errorData.error.includes('already exists')) {
          toast.error('Movie already added to the Movie list');
        } else {
          throw new Error(errorData.error || 'Failed to add movie');
        }
        return;
      }

      await fetchMovies();
      toast.success('Movie added successfully! 🎬')
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        toast.error('Unable to add to the Movie List. Please check your network.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  const removeMovie = async (id) => {
    try {
      const response = await fetch(`${API_BACKEND}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }

      setSelectedMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
      toast.success('Movie removed successfully');
    } catch (error) {
      toast.error('Error removing movie:', error);
    }
  };

  const clearList = async () => {
    try {
      await fetch(`${API_BACKEND}`, {
        method: 'DELETE',
      });
      setSelectedMovies([]);
      toast.success('Movie(s) removed successfully');
    } catch (error) {
      toast.error('Error clearing list:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MovieListContext.Provider
      value={{
        selectedMovies,
        addMovie,
        removeMovie,
        clearList,
      }}
    >
      {children}
    </MovieListContext.Provider>
  );
};

export const useMovieList = () => {
  return useContext(MovieListContext);
};