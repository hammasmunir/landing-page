// // Initialize AOS
// AOS.init({
//   duration: 1200,
//   once: false,
// });

// // Hamburger menu
// const hamburger = document.querySelector('.hamburger');
// const nav = document.querySelector('nav');

// hamburger.addEventListener('click', () => {
//   nav.classList.toggle('active');
// });

// // Carousel setup
// const track = document.querySelector('.carousel-track');
// const slides = Array.from(track.children);
// const nextButton = document.querySelector('.next');
// const prevButton = document.querySelector('.prev');

// const visibleSlides = 5;
// const totalSlides = slides.length;
// const slideWidth = slides[0].getBoundingClientRect().width + 20;
// let currentIndex = 0;

// // Stop all videos and hide all buttons
// function stopAllVideos() {
//   slides.forEach((slide) => {
//     const video = slide.querySelector('video');
//     const btn = slide.querySelector('.play-btn');
//     video.pause();
//     btn.style.display = 'none';
//   });
// }

// // Update carousel position
// function updateCarousel() {
//   track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
//   updateCenterSlide();
// }

// // Highlight center slide & show button
// function updateCenterSlide() {
//   slides.forEach((slide) => slide.classList.remove('center'));

//   const centerIndex = currentIndex + Math.floor(visibleSlides / 2);
//   const centerSlide = slides[centerIndex];

//   if (centerSlide) {
//     centerSlide.classList.add('center');

//     const video = centerSlide.querySelector('video');
//     const btn = centerSlide.querySelector('.play-btn');

//     // Loop the video
//     video.loop = true;

//     // Show play button only if video is paused
//     btn.style.display = video.paused ? 'flex' : 'none';
//   }
// }

// // Attach click handlers to all buttons
// slides.forEach((slide) => {
//   const btn = slide.querySelector('.play-btn');
//   const video = slide.querySelector('video');

//   btn.addEventListener('click', () => {
//     // Always get the current center slide dynamically
//     const centerIndex = currentIndex + Math.floor(visibleSlides / 2);
//     const centerSlide = slides[centerIndex];

//     // Only play if this button belongs to the current center slide
//     if (slide !== centerSlide) return;

//     stopAllVideos(); // Stop all other videos

//     video.play();
//     btn.style.display = 'none';

//     // Show button again if user pauses manually
//     video.onpause = () => {
//       btn.style.display = 'flex';
//     };
//   });
// });

// // Next / Prev buttons
// nextButton.addEventListener('click', () => {
//   if (currentIndex < totalSlides - visibleSlides) currentIndex++;
//   else currentIndex = 0;

//   stopAllVideos();
//   updateCarousel();
// });

// prevButton.addEventListener('click', () => {
//   if (currentIndex > 0) currentIndex--;
//   else currentIndex = totalSlides - visibleSlides;

//   stopAllVideos();
//   updateCarousel();
// });

// // Swipe / Drag support
// let isDragging = false;
// let startX = 0;
// let currentTranslate = 0;
// let prevTranslate = 0;
// let animationID;

// track.addEventListener('mousedown', dragStart);
// track.addEventListener('mouseup', dragEnd);
// track.addEventListener('mouseleave', dragEnd);
// track.addEventListener('mousemove', dragAction);

// track.addEventListener('touchstart', dragStart);
// track.addEventListener('touchend', dragEnd);
// track.addEventListener('touchmove', dragAction);

// function dragStart(e) {
//   isDragging = true;
//   startX = getPositionX(e);
//   track.style.transition = 'none';
//   animationID = requestAnimationFrame(animation);
// }

// function dragEnd() {
//   isDragging = false;
//   cancelAnimationFrame(animationID);
//   track.style.transition = 'transform 0.5s ease';

//   const movedBy = currentTranslate - prevTranslate;
//   if (movedBy < -50 && currentIndex < totalSlides - visibleSlides) currentIndex++;
//   if (movedBy > 50 && currentIndex > 0) currentIndex--;

//   if (currentIndex > totalSlides - visibleSlides) currentIndex = totalSlides - visibleSlides;
//   if (currentIndex < 0) currentIndex = 0;

//   stopAllVideos();
//   updateCarousel();
//   prevTranslate = currentTranslate = -currentIndex * slideWidth;
// }

// function dragAction(e) {
//   if (!isDragging) return;
//   const currentPosition = getPositionX(e);
//   currentTranslate = prevTranslate + currentPosition - startX;
// }

// function getPositionX(e) {
//   return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
// }

// function animation() {
//   setSliderPosition();
//   if (isDragging) requestAnimationFrame(animation);
// }

// function setSliderPosition() {
//   track.style.transform = `translateX(${currentTranslate}px)`;
// }

// // Initialize carousel
// updateCarousel();

// Initialize AOS
AOS.init({ duration: 1200, once: false });

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
hamburger.addEventListener('click', () => nav.classList.toggle('active'));

// Carousel setup
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

const visibleSlides = 5;
const totalSlides = slides.length;
const slideWidth = slides[0].getBoundingClientRect().width + 20;
let currentIndex = 0;

// Stop all videos and hide buttons
function stopAllVideos(exceptSlide = null) {
  slides.forEach((slide) => {
    if (slide === exceptSlide) return;
    const video = slide.querySelector('video');
    const btn = slide.querySelector('.play-btn');
    video.pause();
    btn.style.display = 'none';
  });
}

// Update carousel position
function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  updateCenterSlide();
}

// Highlight center slide and show play button
function updateCenterSlide() {
  slides.forEach((slide) => slide.classList.remove('center'));

  const centerIndex = currentIndex + Math.floor(visibleSlides / 2);
  const centerSlide = slides[centerIndex];

  if (!centerSlide) return;

  centerSlide.classList.add('center');

  const video = centerSlide.querySelector('video');
  const btn = centerSlide.querySelector('.play-btn');

  // Video should loop
  video.loop = true;

  // Show play button only if paused
  btn.style.display = video.paused ? 'flex' : 'none';
}

// Play button click handler
slides.forEach((slide) => {
  const btn = slide.querySelector('.play-btn');
  const video = slide.querySelector('video');

  btn.addEventListener('click', () => {
    const centerIndex = currentIndex + Math.floor(visibleSlides / 2);
    const centerSlide = slides[centerIndex];

    if (slide !== centerSlide) return; // Only allow center video

    stopAllVideos(centerSlide); // Stop all other videos
    video.play();
    btn.style.display = 'none';
  });

  // Show button again if video paused manually
  video.addEventListener('pause', () => {
    const centerIndex = currentIndex + Math.floor(visibleSlides / 2);
    if (slide === slides[centerIndex]) btn.style.display = 'flex';
  });
});

// Next / Prev buttons
nextButton.addEventListener('click', () => {
  currentIndex = currentIndex < totalSlides - visibleSlides ? currentIndex + 1 : 0;
  stopAllVideos();
  updateCarousel();
  const centerIndex = currentIndex + Math.floor(visibleSlides / 2);
  const centerSlide = slides[centerIndex];
  if (centerSlide) {
    const video = centerSlide.querySelector('video');
    const btn = centerSlide.querySelector('.play-btn');
    video.play();
    if (btn) btn.style.display = 'none';
  }
});

prevButton.addEventListener('click', () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - visibleSlides;
  stopAllVideos();
  updateCarousel();
  const centerIndex = currentIndex + Math.floor(visibleSlides / 2);
  const centerSlide = slides[centerIndex];
  if (centerSlide) {
    const video = centerSlide.querySelector('video');
    const btn = centerSlide.querySelector('.play-btn');
    video.play();
    if (btn) btn.style.display = 'none';
  }
});

// Swipe / Drag support
let isDragging = false,
  startX = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID;

track.addEventListener('mousedown', dragStart);
track.addEventListener('mouseup', dragEnd);
track.addEventListener('mouseleave', dragEnd);
track.addEventListener('mousemove', dragAction);
track.addEventListener('touchstart', dragStart);
track.addEventListener('touchend', dragEnd);
track.addEventListener('touchmove', dragAction);

function dragStart(e) {
  isDragging = true;
  startX = getPositionX(e);
  track.style.transition = 'none';
  animationID = requestAnimationFrame(animation);
}

function dragEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  track.style.transition = 'transform 0.5s ease';
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -50 && currentIndex < totalSlides - visibleSlides) currentIndex++;
  if (movedBy > 50 && currentIndex > 0) currentIndex--;

  if (currentIndex > totalSlides - visibleSlides) currentIndex = totalSlides - visibleSlides;
  if (currentIndex < 0) currentIndex = 0;

  stopAllVideos();
  updateCarousel();
  prevTranslate = currentTranslate = -currentIndex * slideWidth;
}

function dragAction(e) {
  if (!isDragging) return;
  const currentPosition = getPositionX(e);
  currentTranslate = prevTranslate + currentPosition - startX;
}

function getPositionX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  track.style.transform = `translateX(${currentTranslate}px)`;
}

// Initialize carousel
updateCarousel();
