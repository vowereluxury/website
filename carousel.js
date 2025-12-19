// document.addEventListener("DOMContentLoaded", () => {
//   const carousels = document.querySelectorAll(".carousel-container");

//   carousels.forEach((carousel) => {
//     const track = carousel.querySelector(".carousel-track");
//     const leftArrow = carousel.querySelector(".carousel-arrow.left");
//     const rightArrow = carousel.querySelector(".carousel-arrow.right");

//     if (!track || !leftArrow || !rightArrow) return;

//     const getScrollAmount = () => {
//       const item = track.querySelector(".carousel-item");
//       return item ? item.offsetWidth + 20 : 300; // 20px = gap
//     };

//     leftArrow.addEventListener("click", () => {
//       track.scrollBy({
//         left: -getScrollAmount(),
//         behavior: "smooth",
//       });
//     });

//     rightArrow.addEventListener("click", () => {
//       track.scrollBy({
//         left: getScrollAmount(),
//         behavior: "smooth",
//       });
//     });

//     const updateArrows = () => {
//       leftArrow.disabled = track.scrollLeft <= 0;
//       rightArrow.disabled =
//         track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
//     };

//     track.addEventListener("scroll", updateArrows);
//     window.addEventListener("resize", updateArrows);

//     updateArrows();
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // --- Carousel scroll ---
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const leftArrow = carousel.querySelector(".carousel-arrow.left");
    const rightArrow = carousel.querySelector(".carousel-arrow.right");

    if (!track || !leftArrow || !rightArrow) return;

    const getScrollAmount = () => {
      const item = track.querySelector(".carousel-item");
      return item ? item.offsetWidth + 20 : 300;
    };

    leftArrow.addEventListener("click", () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });

    rightArrow.addEventListener("click", () => {
      track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
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

  // --- Modal setup ---
  let modal, modalImages = [], currentVersion = 0;

  function createModal() {
    modal = document.createElement('div');
    modal.classList.add('look-modal');
    modal.innerHTML = `
      <span class="close-modal">&times;</span>
      <span class="modal-arrow left">‹</span>
      <img src="" alt="Look version">
      <span class="modal-arrow right">›</span>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-modal').addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.querySelector('.modal-arrow.left').addEventListener('click', () => {
      if (modalImages.length === 0) return;
      currentVersion = (currentVersion - 1 + modalImages.length) % modalImages.length;
      updateModalImage();
    });

    modal.querySelector('.modal-arrow.right').addEventListener('click', () => {
      if (modalImages.length === 0) return;
      currentVersion = (currentVersion + 1) % modalImages.length;
      updateModalImage();
    });
  }

  function updateModalImage() {
    const img = modal.querySelector('img');
    img.src = modalImages[currentVersion];
  }

  createModal();

  // --- Open modal only for real looks (skip placeholders) ---
  const carouselItems = document.querySelectorAll('.carousel-item.look-card[data-look][data-versions]');

  carouselItems.forEach(item => {
    item.addEventListener('click', () => {
      const lookNum = item.dataset.look;
      const versions = parseInt(item.dataset.versions);

      // Skip if versions is missing or zero
      if (!versions || versions <= 0) return;

      // Build images array
      modalImages = [];
      for (let i = 1; i <= versions; i++) {
        modalImages.push(`./assets/regal/look${lookNum}-${i}.jpg`);
      }

      currentVersion = 0;
      updateModalImage();
      modal.classList.add('active');
    });
  });
});


