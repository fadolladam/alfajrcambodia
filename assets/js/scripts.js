// Component Loader
document.addEventListener('DOMContentLoaded', () => {
  const components = [
    'header',
    'hero',
    'about',
    'packages',
    'umrah-packages',
    'umrah-holiday',
    'ads-banner',
    'recommendations',
    'destinations',
    'umrah-holiday',    
    'footer',
  ];

  components.forEach((component) => {
    fetch(`components/${component}.html`)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${component}`);
        return response.text();
      })
      .then((data) => {
        document.getElementById(component).innerHTML = data;

        // Initialize specific functionality after loading components
        if (component === 'hero') initHeroSlider(); // Hero Slider
        if (component === 'ads-banner') initAdsSlider(); // Ads Banner Slider
        if (component === 'recommendations') initTabs(); // Tabs
        if (component === 'header') initBurgerMenu(); // Burger Menu
      })
      .catch((error) => console.error(`Error loading component: ${component}`, error));
  });
});

// Tabs Functionality
function initTabs() {
  const tabs = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Remove active state from all tabs and hide all content
      tabs.forEach((t) => t.classList.remove('active', 'bg-gray-900', 'text-white'));
      contents.forEach((content) => content.classList.add('hidden'));

      // Activate clicked tab and show corresponding content
      tab.classList.add('active', 'bg-gray-900', 'text-white');
      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.classList.remove('hidden');
      }
    });
  });

  // Show the first tab content by default
  const firstTab = tabs[0];
  const firstContent = document.getElementById(firstTab.getAttribute('data-tab'));
  firstTab.classList.add('active', 'bg-gray-900', 'text-white');
  if (firstContent) {
    firstContent.classList.remove('hidden');
  }
}

// Hero Slider Functionality
function initHeroSlider() {
  const slides = document.querySelectorAll('#slider .slide');
  const sliderDotsContainer = document.querySelector('.slider-dots');
  let currentIndex = 0;

  if (slides.length) {
    // Generate dots dynamically based on the number of slides
    sliderDotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('w-4', 'h-4', 'rounded-full', 'cursor-pointer', 'transition', 'duration-300');
      dot.classList.add(index === 0 ? 'bg-black' : 'bg-gray-500');
      sliderDotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dots div');

    // Function to show the current slide
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('opacity-100', i === index);
        slide.classList.toggle('opacity-0', i !== index);
        slide.classList.toggle('z-10', i === index); // Ensure the active slide is on top
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('bg-black', i === index);
        dot.classList.toggle('bg-gray-500', i !== index);
      });
    }

    // Auto-slide every 5 seconds
    const autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 5000);

    // Add click event to dots for manual navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(autoSlideInterval); // Stop auto-slide on manual interaction
        currentIndex = index;
        showSlide(currentIndex);
      });
    });

    // Add manual navigation buttons
    const prevButton = document.querySelector('#slider-prev');
    const nextButton = document.querySelector('#slider-next');

    prevButton.addEventListener('click', () => {
      clearInterval(autoSlideInterval); // Stop auto-slide on manual interaction
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    nextButton.addEventListener('click', () => {
      clearInterval(autoSlideInterval); // Stop auto-slide on manual interaction
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });

    // Show the first slide initially
    showSlide(currentIndex);
  }
}

// Initialize the slider when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initHeroSlider);


// Ads Banner Sliding Functionality
function initAdsSlider() {
  const scrollingContainer = document.querySelector('.flex.overflow-x-auto'); // Scrolling container
  if (!scrollingContainer) {
    console.error('Scrolling container not found.');
    return;
  }

  const prevButton = document.querySelector('#ads-prev'); // Left arrow
  const nextButton = document.querySelector('#ads-next'); // Right arrow

  const scrollStep = 200; // Number of pixels to scroll
  const scrollInterval = 10000; // Auto-scroll interval in milliseconds

  let autoScrollInterval;

  // Function to start auto-scroll
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (
        scrollingContainer.scrollLeft >=
        scrollingContainer.scrollWidth - scrollingContainer.clientWidth
      ) {
        scrollingContainer.scrollLeft = 0; // Reset to the start
      } else {
        scrollingContainer.scrollLeft += scrollStep; // Scroll right
      }
    }, scrollInterval);
  }

  // Function to stop auto-scroll
  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Manual scroll for previous button
  prevButton?.addEventListener('click', () => {
    stopAutoScroll();
    scrollingContainer.scrollBy({
      left: -scrollStep,
      behavior: 'smooth',
    });
  });

  // Manual scroll for next button
  nextButton?.addEventListener('click', () => {
    stopAutoScroll();
    scrollingContainer.scrollBy({
      left: scrollStep,
      behavior: 'smooth',
    });
  });

  // Start auto-scroll on page load
  startAutoScroll();
}

// Initialize the slider when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initAdsSlider);


// Ads Slideshow (Manual Slider Logic)
function initAdsSlider() {
  const slideshow = document.getElementById('ads-slideshow');
  if (slideshow) {
    const slides = slideshow.querySelector('.flex');
    const dots = document.querySelectorAll('[data-slide]');
    const totalSlides = dots.length;
    let currentSlide = 0;

    const goToSlide = (index) => {
      const percentage = -(index * 100 / totalSlides);
      slides.style.transform = `translateX(${percentage}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('bg-gray-900', i === index);
        dot.classList.toggle('bg-gray-400', i !== index);
      });

      currentSlide = index;
    };

    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }, 5000);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    goToSlide(currentSlide);
  }
}

// Burger Menu Functionality
function initBurgerMenu() {
  const burgerButton = document.getElementById('burger-button');
  const closeButton = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  // Open mobile menu
  burgerButton.addEventListener('click', () => {
    mobileMenu.classList.remove('-translate-x-full');
  });

  // Close mobile menu
  closeButton.addEventListener('click', () => {
    mobileMenu.classList.add('-translate-x-full');
  });

  // Close the menu when clicking outside (optional)
  document.addEventListener('click', (event) => {
    if (
      !mobileMenu.contains(event.target) &&
      !burgerButton.contains(event.target) &&
      mobileMenu.classList.contains('-translate-x-full') === false
    ) {
      mobileMenu.classList.add('-translate-x-full');
    }
  });
}

function initializeImages(images) {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const closeModal = document.getElementById('close-modal');
  const thumbnails = document.querySelectorAll('#details-container img');
  let currentIndex = 0;

  // Open modal
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modalImage.src = images[index];
      currentIndex = index;
    });
  });

  // Close modal
  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Navigation
  document.getElementById('prev-image').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentIndex];
  });
  document.getElementById('next-image').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    modalImage.src = images[currentIndex];
  });
}
