import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Pagination = ({ page, handlePageChange }) => {
    const maxPagesToShow = 20;
    const navigate = useNavigate()

    const handlePageClick = (newPage) => {
        handlePageChange(newPage);
        navigate(`?page=${newPage}`);
    };

    const renderPagination = () => {
        const pages = [];
         const ellipsis = (key) => <span key={`ellipsis-${key}`} className="text-white mx-1">...</span>;

        pages.push(
            <Button
                key={1}
                variant={page === 1 ? 'primary' : 'secondary'}
                onClick={() => handlePageChange(1)}
                className="mx-1"
            >
                1
            </Button>
        );

        const startPage = Math.max(2, page - 2);
        const endPage = Math.min(maxPagesToShow - 1, page + 2);

        if (startPage > 2) {
             pages.push(ellipsis('left'));
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button
                    key={i}
                    variant={page === i ? 'primary' : 'secondary'}
                    onClick={() => handlePageChange(i)}
                    className="mx-1"
                >
                    {i}
                </Button>
            );
        }

        if (endPage < maxPagesToShow - 1) {
            pages.push(ellipsis('right'));
        }

        if (maxPagesToShow > 1) {
            pages.push(
                <Button
                    key={maxPagesToShow}
                    variant={page === maxPagesToShow ? 'primary' : 'secondary'}
                    onClick={() => handlePageChange(maxPagesToShow)}
                    className="mx-1"
                >
                    {maxPagesToShow}
                </Button>
            );
        }

        return pages;
    };

    return (
        <div className="flex justify-center mt-12">
            <Button
                variant="secondary"
                onClick={() => handlePageClick(page - 1)}
                disabled={page === 1}
                className="mr-2 bg-green-500"
            >
                Previous
            </Button>
            {renderPagination()}
            <Button
                variant="secondary"
                onClick={() => handlePageClick(page + 1)}
                disabled={page === 20}
                className="ml-2"
            >
                Next
            </Button>
        </div>
    );
};

export default Pagination;