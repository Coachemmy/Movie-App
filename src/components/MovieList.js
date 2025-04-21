import React from 'react'
import MovieBox from './MovieBox.js'

const MovieList = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map((movie, idx) => (
        <MovieBox key={idx} {...movie} />
      ))}
    </div>
  )
}

export default MovieList;
