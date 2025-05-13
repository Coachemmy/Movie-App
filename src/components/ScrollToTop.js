import React, { useEffect, useState } from 'react'
import { BsArrowUp } from 'react-icons/bs'
import { useLocation } from 'react-router-dom';


const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const toggleVisibility = () =>
      window.pageYOffset > 500 ? setIsVisible(true) : setIsVisible(false)

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return isVisible ? (
    <div style={{ position: 'fixed', bottom: '20px', right: '18px', padding: '4px', zIndex: 1000 }}>
      <a href='#top' aria-label='top'>
        <BsArrowUp fontSize='small' className='text-5xl bg-white p-2 rounded-full' />
      </a>
    </div>
  ) : null
}

export default ScrollToTop
