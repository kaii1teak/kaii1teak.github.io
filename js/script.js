const faqs = document.querySelectorAll(".services");

faqs.forEach(services => {
    services.addEventListener("click", () => {
        services.classList.toggle("active");
  })
})

document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  burgerMenu.addEventListener('click', function() {
      burgerMenu.classList.toggle('active');
      mobileMenu.classList.toggle('active');
  });
});

class InfiniteSlider {
    constructor(selector, autoSlideInterval = 3000) {
        this.slider = document.querySelector(selector);
        this.slides = Array.from(this.slider.children);
        this.totalSlides = this.slides.length;
        this.visibleSlides = 4; // Number of visible slides
        this.currentIndex = this.visibleSlides; // Start from the first "real" slide
  
        // Clone slides to create a seamless loop
        this.cloneSlides();
  
        this.allSlides = Array.from(this.slider.children);
        this.slider.style.transition = "none"; // No animation at the start
        this.updateSlider(); // Position the slider correctly
  
        this.startX = 0;
        this.isDragging = false;
  
        // Set autoSlideInterval
        this.autoSlideInterval = autoSlideInterval;
        this.autoSlideTimeout = null;
  
        this.initEventListeners();
        this.startAutoSlide();
    }
  
    cloneSlides() {
        const startClones = this.slides.slice(0, this.visibleSlides).map(slide => slide.cloneNode(true));
        const endClones = this.slides.slice(-this.visibleSlides).map(slide => slide.cloneNode(true));
  
        startClones.forEach(clone => this.slider.appendChild(clone));
        endClones.forEach(clone => this.slider.prepend(clone));
    }
  
    initEventListeners() {
        this.slider.addEventListener('mousedown', this.startDrag.bind(this));
        this.slider.addEventListener('mousemove', this.drag.bind(this));
        this.slider.addEventListener('mouseup', this.endDrag.bind(this));
        this.slider.addEventListener('mouseleave', this.endDrag.bind(this));
        this.slider.addEventListener('touchstart', this.startDrag.bind(this));
        this.slider.addEventListener('touchmove', this.drag.bind(this));
        this.slider.addEventListener('touchend', this.endDrag.bind(this));
    }
  
    startDrag(e) {
        this.isDragging = true;
        this.startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        this.pauseAutoSlide(); // Pause auto sliding when user starts dragging
    }
  
    drag(e) {
        if (!this.isDragging) return;
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const diff = this.startX - currentX;
  
        if (Math.abs(diff) > 50) {
            diff > 0 ? this.next() : this.prev();
            this.isDragging = false;
        }
    }
  
    endDrag() {
        this.isDragging = false;
        // Resume auto slide after a 5 second pause
        setTimeout(() => {
            this.startAutoSlide();
        }, 50); // 5 seconds delay // ПОМЕНЯЛ НА 50 С 50002
    }
  
    pauseAutoSlide() {
        clearInterval(this.autoSlideTimeout);
    }
  
    next() {
        this.currentIndex++;
        this.updateSlider(true);
  
        // Handle looping at the end
        if (this.currentIndex >= this.totalSlides + this.visibleSlides) {
            setTimeout(() => {
                this.slider.style.transition = "none"; // Disable animation
                this.currentIndex = this.visibleSlides; // Jump to the first "real" slide
                this.updateSlider();
                setTimeout(() => {
                    this.slider.style.transition = "transform 0.3s ease"; // Re-enable animation
                });
            }, 300);
        }
    }
  
    prev() {
        this.currentIndex--;
  
        this.updateSlider(true);
  
        // Handle looping at the start
        if (this.currentIndex < this.visibleSlides) {
            setTimeout(() => {
                this.slider.style.transition = "none"; // Disable animation
                this.currentIndex = this.totalSlides; // Jump to the last "real" slide
                this.updateSlider();
                setTimeout(() => {
                    this.slider.style.transition = "transform 0.3s ease"; // Re-enable animation
                });
            }, 300);
        }
    }
  
    updateSlider(animate = false) {
        const offset = -this.currentIndex * (this.allSlides[0].offsetWidth + 10);
        if (animate) this.slider.style.transition = "transform 0.3s ease";
        this.slider.style.transform = `translateX(${offset}px)`;
    }
  
    startAutoSlide() {
        // Prevent starting multiple intervals by clearing previous one
        clearInterval(this.autoSlideTimeout);
  
        // After ensuring the slider position is correct, start auto sliding again
        this.autoSlideTimeout = setInterval(() => {
            this.next();
        }, this.autoSlideInterval);
    }
  }
  
  new InfiniteSlider('#slider');
  

new InfiniteSlider('#slider');
