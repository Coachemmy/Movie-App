import React, { useEffect } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { useMovieList } from '../context/MovieListContext.js';
import { API_IMG } from '../services/api.js';
import jsPDF from 'jspdf';

const MovieListModal = ({ show, onHide }) => {
  const { selectedMovies, removeMovie, clearList } = useMovieList();

  useEffect(() => {
    if (selectedMovies.length === 0) {
      onHide();
    }
  }, [selectedMovies, onHide]);

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('My Movie List', 10, 10);

    let y = 20;
    selectedMovies.forEach((movie, index) => {
      doc.setFontSize(12);
      doc.text(`Movie ${index + 1}: ${movie.title}`, 10, y);
      y += 10;
      doc.text(`Rating: ${movie.vote_average}`, 10, y);
      y += 10;
      doc.text(`Release Date: ${movie.release_date}`, 10, y);
      y += 10;
    });

    doc.save('movie-list.pdf');
  };

  const handleExportCSV = () => {
    const headers = ['Title', 'Rating', 'Release Date'];
    const rows = selectedMovies.map((movie) => [movie.title, movie.vote_average, movie.release_date]);
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'movie-list.csv';
    link.click();
  };

  return (
    <Modal show={show} onHide={onHide} className='min-w-full'>
      <Modal.Header closeButton className="bg-blue-800 text-white">
        <Modal.Title>My Movie List</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-white text-white">
        <Container>
          <Button variant="danger" className="mb-4" onClick={clearList}>
            Clear List
          </Button>
          <Button variant="success" className="mb-4 ms-2" onClick={handleExportPDF}>
            Export as PDF
          </Button>
          <Button variant="success" className="mb-4 ms-2" onClick={handleExportCSV}>
            Export as CSV
          </Button>
          <Row>
            {selectedMovies.map((movie, idx) => (
              <Col key={idx} xs={6} md={4} className="mb-4">
                <div className="bg-gray-700 p-3 rounded w-32">
                  <img src={API_IMG + movie.poster_path} alt={movie.title} className="w-full mb-3" />
                  <Button variant="danger" onClick={() => removeMovie(movie.id)}>
                    Remove
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default MovieListModal;