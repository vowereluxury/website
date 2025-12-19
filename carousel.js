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
     MODAL LOGIC (UNIVERSAL)
  ========================== */
  // const modal = document.querySelector(".look-modal");
  // const modalImg = modal.querySelector("img");
  // const closeBtn = modal.querySelector(".close-modal");
  // const leftArrow = modal.querySelector(".modal-arrow.left");
  // const rightArrow = modal.querySelector(".modal-arrow.right");

  // const lookCards = document.querySelectorAll(
  //   ".look-card[data-look][data-versions][data-collection]"
  // );

  // let modalImages = [];
  // let currentIndex = 0;

  // function updateModalImage() {
  //   modalImg.src = modalImages[currentIndex];
  // }

  // lookCards.forEach(card => {
  //   card.addEventListener("click", () => {
  //     const collection = card.dataset.collection;
  //     const lookNum = card.dataset.look;
  //     const versions = parseInt(card.dataset.versions, 10);

  //     // ⛔ Skip placeholders / invalid looks
  //     if (!versions || versions <= 0) return;

  //     modalImages = [];

  //     for (let i = 1; i <= versions; i++) {
  //       modalImages.push(
  //         `./assets/${collection}/look${lookNum}/look${lookNum}-${i}.jpg`
  //       );
  //     }

  //     currentIndex = 0;
  //     updateModalImage();
  //     modal.classList.add("active");
  //   });
  // });

  // rightArrow.addEventListener("click", () => {
  //   if (!modalImages.length) return;
  //   currentIndex = (currentIndex + 1) % modalImages.length;
  //   updateModalImage();
  // });

  // leftArrow.addEventListener("click", () => {
  //   if (!modalImages.length) return;
  //   currentIndex =
  //     (currentIndex - 1 + modalImages.length) % modalImages.length;
  //   updateModalImage();
  // });

  // closeBtn.addEventListener("click", () => {
  //   modal.classList.remove("active");
  //   modalImg.src = "";
  // });

  // modal.addEventListener("click", e => {
  //   if (e.target === modal) {
  //     modal.classList.remove("active");
  //     modalImg.src = "";
  //   }
  // });

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
  const leftArrow = modal.querySelector('.modal-arrow.left');
  const rightArrow = modal.querySelector('.modal-arrow.right');

  let modalImages = [];
  let currentIndex = 0;

  function updateModalImage() {
    modalImg.src = modalImages[currentIndex];
  }

  const lookCards = document.querySelectorAll('.look-card[data-collection][data-look][data-versions]');
  lookCards.forEach(card => {
    card.addEventListener('click', () => {
      const collection = card.dataset.collection;
      const lookNum = card.dataset.look;
      const versions = parseInt(card.dataset.versions, 10);

      modalImages = [];
      for (let i = 1; i <= versions; i++) {
        modalImages.push(`./assets/${collection}/look${lookNum}/look${lookNum}-${i}.jpg`);
      }

      currentIndex = 0;
      updateModalImage();
      modal.classList.add('active');
    });
  });

  rightArrow.addEventListener('click', () => {
    if (!modalImages.length) return;
    currentIndex = (currentIndex + 1) % modalImages.length;
    updateModalImage();
  });

  leftArrow.addEventListener('click', () => {
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

