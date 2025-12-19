document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CAROUSEL SCROLL LOGIC
  ========================== */
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach(carousel => {
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

  /* =========================
     MODAL LOGIC (INSTANT THUMBNAIL + BACKGROUND FULL IMG)
  ========================== */
  const modal = document.createElement('div');
  modal.classList.add('look-modal');
  modal.innerHTML = `
    <span class="close-modal">&times;</span>
    <span class="modal-arrow left">‹</span>
    <img src="" alt="Look version" class="modal-image">
    <span class="modal-arrow right">›</span>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('.modal-image');
  const closeBtn = modal.querySelector('.close-modal');
  const leftArrow = modal.querySelector('.modal-arrow.left');
  const rightArrow = modal.querySelector('.modal-arrow.right');

  let modalImages = [];
  let currentIndex = 0;

  function showImage(index) {
    // Show thumbnail immediately (same JPG resized with CSS)
    modalImg.src = modalImages[index].thumbnail;

    // Load full-res in background
    const fullImg = new Image();
    fullImg.src = modalImages[index].full;
    fullImg.onload = () => {
      // Swap to full-res once loaded
      modalImg.src = fullImg.src;
    };
  }

  const lookCards = document.querySelectorAll('.look-card[data-collection][data-look][data-versions]');

  lookCards.forEach(card => {
    card.addEventListener('click', () => {
      const collection = card.dataset.collection;
      const lookNum = card.dataset.look;
      const versions = parseInt(card.dataset.versions, 10);

      if (!versions || versions <= 0) return;

      modalImages = [];

      for (let i = 1; i <= versions; i++) {
        // Use CSS-resized thumbnail for instant display
        modalImages.push({
          thumbnail: `./assets/${collection}/look${lookNum}/look${lookNum}-${i}.jpg`,
          full: `./assets/${collection}/look${lookNum}/look${lookNum}-${i}.jpg`
        });
      }

      currentIndex = 0;
      showImage(currentIndex);
      modal.classList.add('active');
    });
  });

  rightArrow.addEventListener('click', () => {
    if (!modalImages.length) return;
    currentIndex = (currentIndex + 1) % modalImages.length;
    showImage(currentIndex);
  });

  leftArrow.addEventListener('click', () => {
    if (!modalImages.length) return;
    currentIndex = (currentIndex - 1 + modalImages.length) % modalImages.length;
    showImage(currentIndex);
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modalImg.src = '';
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modalImg.src = '';
    }
  });

});



// document.addEventListener("DOMContentLoaded", () => {

//   /* =========================
//      CAROUSEL SCROLL LOGIC
//   ========================== */
//   const carousels = document.querySelectorAll(".carousel-container");

//   carousels.forEach(carousel => {
//     const track = carousel.querySelector(".carousel-track");
//     const leftArrow = carousel.querySelector(".carousel-arrow.left");
//     const rightArrow = carousel.querySelector(".carousel-arrow.right");

//     if (!track || !leftArrow || !rightArrow) return;

//     const getScrollAmount = () => {
//       const item = track.querySelector(".carousel-item");
//       return item ? item.offsetWidth + 20 : 300;
//     };

//     leftArrow.addEventListener("click", () => {
//       track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
//     });

//     rightArrow.addEventListener("click", () => {
//       track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
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

//   /* =========================
//      MODAL LOGIC (PRELOADED)
//   ========================== */
//   const modal = document.createElement('div');
//   modal.classList.add('look-modal');
//   modal.innerHTML = `
//     <span class="close-modal">&times;</span>
//     <span class="modal-arrow left">‹</span>
//     <img src="" alt="Look version">
//     <span class="modal-arrow right">›</span>
//   `;
//   document.body.appendChild(modal);

//   const modalImg = modal.querySelector('img');
//   const closeBtn = modal.querySelector('.close-modal');
//   const leftArrow = modal.querySelector('.modal-arrow.left');
//   const rightArrow = modal.querySelector('.modal-arrow.right');

//   let modalImages = [];
//   let currentIndex = 0;

//   // Map to store preloaded images per look
//   const preloadedMap = {};

//   // Preload all look images on page load
//   const lookCards = document.querySelectorAll('.look-card[data-collection][data-look][data-versions]');
//   lookCards.forEach(card => {
//     const collection = card.dataset.collection;
//     const lookNum = card.dataset.look;
//     const versions = parseInt(card.dataset.versions, 10);

//     if (!versions || versions <= 0) return;

//     const key = `${collection}-${lookNum}`;
//     preloadedMap[key] = [];

//     for (let i = 1; i <= versions; i++) {
//       const path = `./assets/${collection}/look${lookNum}/look${lookNum}-${i}.jpg`;
//       const img = new Image();
//       img.src = path; // browser starts downloading immediately
//       preloadedMap[key].push(img);
//     }
//   });

//   function updateModalImage() {
//     modalImg.src = modalImages[currentIndex].src; // get preloaded image src
//   }

//   lookCards.forEach(card => {
//     card.addEventListener('click', () => {
//       const collection = card.dataset.collection;
//       const lookNum = card.dataset.look;
//       const key = `${collection}-${lookNum}`;

//       if (!preloadedMap[key]) return;

//       modalImages = preloadedMap[key]; // use preloaded images
//       currentIndex = 0;
//       updateModalImage();
//       modal.classList.add('active');
//     });
//   });

//   rightArrow.addEventListener('click', () => {
//     if (!modalImages.length) return;
//     currentIndex = (currentIndex + 1) % modalImages.length;
//     updateModalImage();
//   });

//   leftArrow.addEventListener('click', () => {
//     if (!modalImages.length) return;
//     currentIndex = (currentIndex - 1 + modalImages.length) % modalImages.length;
//     updateModalImage();
//   });

//   closeBtn.addEventListener('click', () => {
//     modal.classList.remove('active');
//     modalImg.src = '';
//   });

//   modal.addEventListener('click', e => {
//     if (e.target === modal) {
//       modal.classList.remove('active');
//       modalImg.src = '';
//     }
//   });

// });




