document.addEventListener("DOMContentLoaded", async function () {
    // Carousel Variables
    const slidesContainer = document.getElementById("carousel-slides");
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");

    let currentIndex = 0;
    let autoSlideInterval;
    let isDebouncing = false;

    // Fetch JSON data for carousel
    async function fetchCarouselData() {
        try {
            const response = await fetch('datas/carousel.json'); // Adjust path as necessary
            const data = await response.json();
            renderSlides(data.slides);
            startAutoSlide();
        } catch (error) {
            console.error("Error fetching carousel data:", error);
            renderFallbackSlides();
        }
    }

    // Render fallback slides in case of an error
    function renderFallbackSlides() {
        slidesContainer.innerHTML = `
            <div class="min-w-full h-96 flex items-center justify-center bg-gray-400">
                <p class="text-white text-xl">Error loading slides. Please try again later.</p>
            </div>
        `;
    }

    // Render carousel slides dynamically
    function renderSlides(slides) {
        slidesContainer.innerHTML = ''; // Clear any existing slides
        slides.forEach((slide) => {
            const slideElement = document.createElement("div");
            slideElement.className = `min-w-full h-96 flex items-center justify-center bg-cover bg-center relative`;
            slideElement.style.backgroundImage = `url(${slide.image})`;

            slideElement.innerHTML = `
                <a href="${slide.link}" class="block w-full h-full" target="_blank" rel="noopener noreferrer">
                    <div class="absolute inset-0 bg-black opacity-30"></div>
                    <div class="relative flex flex-col items-center justify-center text-center z-10 h-full">
                        <h1 class="text-5xl font-bold">${slide.title}</h1>
                        <p class="text-lg mt-2">${slide.description}</p>
                    </div>
                </a>
            `;
            slidesContainer.appendChild(slideElement);
        });

        updateCarouselPosition();
    }

    // Update carousel position based on index
    function updateCarouselPosition() {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        slidesContainer.style.transition = 'transform 0.7s ease-in-out';
    }

    // Start auto-slide with interval
    function startAutoSlide() {
        stopAutoSlide(); // Clear existing interval
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // 5 seconds
    }

    // Stop auto-slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Debounced next slide
    function nextSlide() {
        if (isDebouncing) return;
        isDebouncing = true;
        currentIndex = (currentIndex + 1) % slidesContainer.children.length;
        updateCarouselPosition();
        setTimeout(() => (isDebouncing = false), 700);
    }

    // Debounced previous slide
    function prevSlide() {
        if (isDebouncing) return;
        isDebouncing = true;
        currentIndex = (currentIndex - 1 + slidesContainer.children.length) % slidesContainer.children.length;
        updateCarouselPosition();
        setTimeout(() => (isDebouncing = false), 700);
    }

    // Event Listeners for Buttons
    prevButton.addEventListener("click", () => {
        prevSlide();
        startAutoSlide(); // Reset auto-slide
    });

    nextButton.addEventListener("click", () => {
        nextSlide();
        startAutoSlide(); // Reset auto-slide
    });

    // Pause auto-slide on hover
    slidesContainer.addEventListener("mouseenter", stopAutoSlide);
    slidesContainer.addEventListener("mouseleave", startAutoSlide);

    // Initialize carousel
    fetchCarouselData();
});

// Mobile Navigation Toggle
// Ensure toggle works after header is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Function to initialize menu toggle
    function initMenuToggle() {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileNavMenu = document.getElementById('mobile-nav-menu');

        if (menuToggle && mobileNavMenu) {
            menuToggle.addEventListener('click', () => {
                mobileNavMenu.classList.toggle('hidden'); // Toggle visibility
            });

            // Close menu if clicking outside
            document.addEventListener('click', (event) => {
                if (!mobileNavMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                    mobileNavMenu.classList.add('hidden');
                }
            });
        } else {
            console.error('Menu toggle or mobile nav menu element not found.');
        }
    }

    // Call initMenuToggle once the header is loaded
    async function loadHeader() {
        try {
            const response = await fetch('pages/header.html');
            if (!response.ok) throw new Error('Failed to load header');
            const headerContent = await response.text();
            document.getElementById('header-placeholder').innerHTML = headerContent;

            // Initialize menu toggle after header is loaded
            initMenuToggle();
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    loadHeader(); // Dynamically load header
});
