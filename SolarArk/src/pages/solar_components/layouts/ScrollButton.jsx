// src/components/ScrollButton.js
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(window.scrollY > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button 
            className={`scroll-button ${isVisible ? 'show' : ''}`} 
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <FaArrowUp className="scroll-icon" />
        </button>
    );
};

export default ScrollButton;
