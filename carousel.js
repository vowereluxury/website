// const track = document.getElementById('carouselTrack');
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');
// const items = track.querySelectorAll('.carousel-item');
// let currentIndex = 0;
// let isLocked = false;  // 🔒 swipe lock

// function getVisibleItems() {
//   if (window.innerWidth <= 768) return 1;   // mobile
//   if (window.innerWidth <= 1024) return 2;  // tablet
//   return 3;                                 // desktop
// }

// function updateCarousel() {
//   const itemWidth = items[0].offsetWidth + 20; // include gap
//   const visibleItems = getVisibleItems();
  
//   // apply transition
//   track.style.transition = "transform 0.4s ease-in-out";
//   track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

//   // disable buttons when at edges
//   prevBtn.disabled = currentIndex === 0;
//   nextBtn.disabled = currentIndex >= items.length - visibleItems;

//   // lock until transition ends
//   isLocked = true;
//   track.addEventListener("transitionend", () => {
//     isLocked = false;
//   }, { once: true });
// }

// prevBtn.addEventListener('click', () => {
//   if (isLocked) return; // ⛔ don’t allow spamming
//   currentIndex = Math.max(currentIndex - getVisibleItems(), 0);
//   updateCarousel();
// });

// nextBtn.addEventListener('click', () => {
//   if (isLocked) return; // ⛔ don’t allow spamming
//   currentIndex = Math.min(currentIndex + getVisibleItems(), items.length - getVisibleItems());
//   updateCarousel();
// });

// window.addEventListener('resize', updateCarousel);
// updateCarousel();

document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const leftArrow = carousel.querySelector(".carousel-arrow.left");
    const rightArrow = carousel.querySelector(".carousel-arrow.right");

    if (!track || !leftArrow || !rightArrow) return;

    const getScrollAmount = () => {
      const item = track.querySelector(".carousel-item");
      return item ? item.offsetWidth + 20 : 300; // 20px = gap
    };

    leftArrow.addEventListener("click", () => {
      track.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    });

    rightArrow.addEventListener("click", () => {
      track.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    });

    const updateArrows = () => {
      leftArrow.disabled = track.scrollLeft <= 0;
      rightArrow.disabled =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    };

    track.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    updateArrows();
  });
});

