$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 20,
  nav: true,
  navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
  center: true,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    1200: {
      items: 3,
    },
  },
});

var playerSettings = {
  controls: ["play-large"],
  fullscreen: { enabled: false },
  resetOnEnd: true,
  hideControls: true,
  clickToPlay: true,
  keyboard: false,
};

const players = Plyr.setup(".js-player", playerSettings);

players.forEach(function (instance) {
  instance.on("play", function () {
    players.forEach(function (other) {
      if (instance !== other) other.pause();
    });
  });
});

$(".video-section").on("translated.owl.carousel", function () {
  players.forEach(function (instance) {
    instance.pause();
  });
});
