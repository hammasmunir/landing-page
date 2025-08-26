const track = document.querySelector('.slider ul');
const prev = document.querySelector('.fa-chevron-left');
const next = document.querySelector('.fa-chevron-right');
let slides = track.querySelectorAll('li');
const dotsContainer = document.querySelector('.dots-container');

let slideWidth = slides[0].offsetWidth + 60;
let activeIndex = Array.from(slides).findIndex((slide) => slide.classList.contains('active'));

// DOTS generate
function generateDots() {
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === activeIndex) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
}
generateDots();

function updateDots() {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
    dot.innerHTML = ''; // reset progress
  });
}

/* -------------
   Slide System
------------- */
function setActive(index) {
  slides.forEach((s) => s.classList.remove('active'));
  slides[index].classList.add('active');
  updateDots();
  attachVideoControls();
}

function goToSlide(index) {
  activeIndex = (index + slides.length) % slides.length;
  setActive(activeIndex);
}

// NEXT → pehli slide ko last me bhej do
next.addEventListener('click', () => {
  track.style.transition = 'transform 0.5s ease';
  track.style.transform = `translateX(-${slideWidth}px)`;

  track.addEventListener('transitionend', function shift() {
    // first slide ko last pe bhejo
    track.appendChild(track.firstElementChild);

    // transform reset
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';

    // slides ko dobara nikal lo (update NodeList)
    slides = track.querySelectorAll('li');

    // activeIndex ko update karo (next slide ab active)
    activeIndex = activeIndex % slides.length;
    setActive(activeIndex);

    track.removeEventListener('transitionend', shift);
  });
});

// PREV → last slide ko start me lao
prev.addEventListener('click', () => {
  track.insertBefore(track.lastElementChild, track.firstElementChild);
  slides = track.querySelectorAll('li');
  activeIndex = (activeIndex - 1 + slides.length) % slides.length;
  setActive(activeIndex);
});

/* ----------------
   Video Controls
---------------- */
let progressInterval;

function attachVideoControls() {
  clearInterval(progressInterval);

  // sabhi buttons hide karo pehle
  slides.forEach((s) => {
    const btn = s.querySelector('.playPauseBtn');
    if (btn) btn.style.display = 'none';
  });

  const activeSlide = slides[activeIndex];
  const video = activeSlide.querySelector('video');
  const btn = activeSlide.querySelector('.playPauseBtn');

  if (!video || !btn) return;

  // sirf active slide ka button dikhaye
  btn.style.display = 'block';

  // purane listener remove karne ke liye clone replace
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);

  newBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      newBtn.innerHTML = '<i id="play-button" class="fa-solid fa-pause"></i>';
      startDotProgress(video);
    } else {
      video.pause();
      newBtn.innerHTML = '<i id="play-button" class="fa-solid fa-play"></i>';
      clearInterval(progressInterval);
    }
  });

  video.addEventListener('ended', () => {
    clearInterval(progressInterval);
    newBtn.innerHTML = '<i id="play-button" class="fa-solid fa-play"></i>';
    resetDot();
  });
}

function startDotProgress(video) {
  const dot = document.querySelectorAll('.dot')[activeIndex];

  // Dot ke andar ek inner bar banana
  if (!dot.querySelector('.progress-bar')) {
    dot.style.width = '50px';
    dot.style.height = '12px';
    dot.style.borderRadius = '19px';
    const inner = document.createElement('div');
    inner.classList.add('progress-bar');
    inner.style.height = '100%';
    inner.style.width = '0%';
    inner.style.background = '#06594D';
    inner.style.borderRadius = '6px';
    inner.style.transition = 'width 0.2s linear';
    dot.appendChild(inner);
  }

  const innerBar = dot.querySelector('.progress-bar');

  progressInterval = setInterval(() => {
    if (video.duration) {
      const percent = (video.currentTime / video.duration) * 100;
      innerBar.style.width = `${percent}%`;
    }
  }, 200);
}

function resetDot() {
  const dot = document.querySelectorAll('.dot')[activeIndex];
  dot.innerHTML = '';
}

// Init
attachVideoControls();
