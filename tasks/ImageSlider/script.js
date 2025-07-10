
document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'https://placehold.co/800x450/FF5733/FFFFFF?text=Image+1',
        'https://placehold.co/800x450/33FF57/FFFFFF?text=Image+2',
        'https://placehold.co/800x450/3357FF/FFFFFF?text=Image+3',
        'https://placehold.co/800x450/FF33A1/FFFFFF?text=Image+4',
        'https://placehold.co/800x450/A133FF/FFFFFF?text=Image+5'
    ];

    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 3000;

    const sliderImage = document.getElementById('slider-image');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const dotsContainer = document.getElementById('dots-container');
    const sliderContainer = document.getElementById('slider');

    const showImage = (index) => {
        currentIndex = (index + images.length) % images.length;
        sliderImage.src = images[currentIndex];
        updateDots();
    };

    const nextImage = () => {
        showImage(currentIndex + 1);
    };

    const prevImage = () => {
        showImage(currentIndex - 1);
    };

    const createDots = () => {
        dotsContainer.innerHTML = '';
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                showImage(index);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });
    };

    const updateDots = () => {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextImage, autoPlayDelay);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };

    prevButton.addEventListener('click', () => {
        prevImage();
        resetAutoPlay();
    });

    nextButton.addEventListener('click', () => {
        nextImage();
        resetAutoPlay();
    });

    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);

    createDots();
    showImage(currentIndex);
    startAutoPlay();
});