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
      MODAL LOGIC (PRELOADED)
  ========================== */
  const modal = document.createElement('div');
  modal.classList.add('look-modal');
  modal.innerHTML = `
    <span class="close-modal">&times;</span>
    <span class="modal-arrow left">‹</span>
    <img src="" alt="Look version">
    <span class="modal-arrow right">›</span>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.close-modal');
  const modalLeft = modal.querySelector('.modal-arrow.left');
  const modalRight = modal.querySelector('.modal-arrow.right');

  let modalImages = [];
  let currentIndex = 0;
  const preloadedMap = {};

  // Preload all look images
  const lookCards = document.querySelectorAll('.look-card');
  lookCards.forEach(card => {
    const collection = card.dataset.collection;
    const lookNum = card.dataset.look;
    const versions = parseInt(card.dataset.versions, 10);

    if (!versions || versions <= 0) return;

    const key = `${collection}-${lookNum}`;
    preloadedMap[key] = [];

    for (let i = 1; i <= versions; i++) {
      const path = `./assets/${collection}/look${lookNum}/look${lookNum}-${i}.jpg`;
      const img = new Image();
      img.src = path;
      preloadedMap[key].push(img);
    }
  });

  function updateModalImage() {
    modalImg.src = modalImages[currentIndex].src;
  }

  /* =========================
      CLICK INTERACTIONS
  ========================== */
  
  lookCards.forEach(card => {
    // 1. CLICKING THE CARD (opens the modal)
    card.addEventListener('click', () => {
      const collection = card.dataset.collection;
      const lookNum = card.dataset.look;
      const key = `${collection}-${lookNum}`;

      if (!preloadedMap[key]) return;

      modalImages = preloadedMap[key];
      currentIndex = 0;
      updateModalImage();
      modal.classList.add('active');
    });

    // 2. THE FIX: PROTECT THE "ORDER NOW" BUTTON
    const buyButton = card.querySelector('.product-cta');
    if (buyButton) {
      buyButton.addEventListener('click', (e) => {
        // This is the magic line that prevents the modal from opening
        e.stopPropagation(); 
      });
    }
  });

  /* =========================
      MODAL NAVIGATION
  ========================== */
  modalRight.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing modal when clicking arrows
    if (!modalImages.length) return;
    currentIndex = (currentIndex + 1) % modalImages.length;
    updateModalImage();
  });

  modalLeft.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing modal when clicking arrows
    if (!modalImages.length) return;
    currentIndex = (currentIndex - 1 + modalImages.length) % modalImages.length;
    updateModalImage();
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




