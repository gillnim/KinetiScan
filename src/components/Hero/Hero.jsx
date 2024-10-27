import React, { useEffect, useState } from "react";
import './Hero.scss';
import hero1 from '../../assets/images/Hero1.jpg';
import hero2 from '../../assets/images/Hero2.png';
import hero3 from '../../assets/images/hero-3.jpg';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [lastScrollTime, setLastScrollTime] = useState(0);
    const [isLocked, setIsLocked] = useState(true); 
    const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false); 
    const navigate = useNavigate(); 

    const slides = [
        {
            title: "What is KinetiScan?",
            description: "Discover a tool designed to enhance joint mobility tracking for anyone focused on improving movement and joint health.",
            buttonLabel: "Learn More",
            link: "/#about", 
            image: hero1,
        },
        {
            title: "Get Started with KinetiScan",
            description: "Upload an image and begin analyzing joint angles with precision – start tracking your mobility journey today.",
            buttonLabel: "Get Started",
            link: "/login", 
            image: hero2,
        },
        {
            title: "Need Help? View Our Tutorial",
            description: "Learn how to make the most of KinetiScan’s features with our step-by-step guide.",
            buttonLabel: "Learn Now",
            link: "/tutorial", 
            image: hero3,
        }
    ];

    const handleScroll = (event) => {
        event.preventDefault();

        const currentTime = new Date().getTime();
        if (currentTime - lastScrollTime < 1000) return; 

        setLastScrollTime(currentTime);

        if (event.deltaY > 0) {
            if (activeIndex < slides.length - 1) {
                setActiveIndex((prevIndex) => prevIndex + 1);
                setHasScrolledToEnd(false); 
            } else {
                setHasScrolledToEnd(true);
                setIsLocked(false); 
            }
        } else {
            if (hasScrolledToEnd) {
                setIsLocked(true); 
            }

            if (activeIndex > 0) {
                setActiveIndex((prevIndex) => prevIndex - 1);
            } else {
                setIsLocked(false); 
            }
        }
    };

    const handleButtonClick = (link) => {
        navigate(link); 
    };

    useEffect(() => {
        const scrollHandler = (event) => {
            if (isLocked) {
                handleScroll(event);
            }
        };

        window.addEventListener("wheel", scrollHandler, { passive: false });

        return () => {
            window.removeEventListener("wheel", scrollHandler);
        };
    }, [lastScrollTime, isLocked, hasScrolledToEnd]);

    return (
        <div className="hero-carousel">
            <div className="hero-carousel__container">
                {slides.map((slide, index) => (
                    <div
                        className={`hero-carousel__item ${index === activeIndex ? "active" : ""}`}
                        key={index}
                    >
                        <div className="hero-carousel__text-container">
                            <h2 className="hero-carousel__slide-title">{slide.title}</h2>
                            <p className="hero-carousel__slide-description">{slide.description}</p>
                            <button
                                className="hero-carousel__slide-button"
                                onClick={() => handleButtonClick(slide.link)} 
                            >
                                {slide.buttonLabel}
                            </button>
                        </div>
                        <div className="hero-carousel__image-container">
                            <img src={slide.image} alt={slide.title} className="hero-carousel__slide-image" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;
