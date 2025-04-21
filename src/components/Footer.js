import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const {t} = useTranslation();
    return (
        <footer className="bg-black text-white text-center py-3">
             <p>{t('footer.text')}</p>
        </footer>
    );
};

export default Footer;
