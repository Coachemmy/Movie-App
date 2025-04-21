import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NavbarComponent = ({ query, searchMovie, changeHandler, selectedMoviesCount }) => {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem('language') || 'en'
    );

    useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem('language', selectedLanguage);
    }, [selectedLanguage, i18n]);

    const handleLanguageToggle = () => {
        const newLanguage = selectedLanguage === 'en' ? 'zh' : 'en';
        setSelectedLanguage(newLanguage);
    };

    const renderTooltip = (props) => (
        <Tooltip id="movie-list-tooltip" {...props}>
            {/* View your movie list */}
        </Tooltip>
    );

    return (
        <>
            <Navbar className='bg-black h-20'>
                <Container fluid>
                    <Navbar.Brand className="text-white">MOVIE<span className="text-red-500">ERS</span></Navbar.Brand>
                    <Navbar.Brand href="/home" className="text-white">Trending</Navbar.Brand>
                    <Nav className="me-auto my-2 my-lg-3" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                    <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                        <Button
                            variant="outline-light"
                            className="me-2"
                            onClick={handleLanguageToggle}
                        >
                            {selectedLanguage === 'en' ? 'cn' : 'en'}
                        </Button>
                    </OverlayTrigger>
                    <div className="flex border border-gray-300">
                        <Form className="flex-1 flex" onSubmit={searchMovie}>
                            <FormControl
                                type="search"
                                placeholder={t('navbar.searchPlaceholder')}
                                className="!flex-1 !border-none !rounded-none !focus:ring-0 !focus:border-none"
                                aria-label="search"
                                name="query"
                                value={query}
                                onChange={changeHandler}
                            />
                            <Button
                                type="submit"
                                className="!bg-transparent !hover:bg-transparent !border-none !rounded-none"
                            >
                                🔍
                            </Button>
                        </Form>
                    </div>
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarComponent;