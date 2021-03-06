const Panel = $("#ContentPlate");
const PartialPageNames = {
  Home: "#",
  Portfolio: "./partialViews/Portfolio.html",
  About: "./partialViews/AboutUs.html",
  ContactForm: "./partialViews/ContactUs.html",
};
var swiper;
const PanelSlideUp = (buttonClicked) => {
  let navItems = $(".nav-item");
  if (!$(buttonClicked).hasClass("active")) {
    // Removing active class from other buttons
    for (let i = 0; i < navItems.length; i++) {
      $(navItems[i]).removeClass("active");
    }

    // Home button is restricted to active class
    if (!$(buttonClicked).hasClass("logo")) $(buttonClicked).addClass("active");
    else $(".home").addClass("active");

    switch ($($(buttonClicked).children()[1]).html()) {
      case "Portfolio":
        $.when(new Promise(PanelShrink))
          .then(
            $.get(PartialPageNames.Portfolio, (result) => {
              setTimeout(() => {
                $("#ContentPlate").append(result);
              }, 400);
            })
          )
          .done(PanelGrow());
        break;
      case "About Us":
        $.when(new Promise(PanelShrink))
          .then(
            $.get(PartialPageNames.About, (result) => {
              setTimeout(() => {
                swiper = null;
                $("#ContentPlate").append(result);
                swiper = new Swiper('.swiper-container', SwiperJsConfig.AboutUs);
              }, 400);
            })
          )
          .done(PanelGrow());
        break;
      case "Contact Us":
        $.when(new Promise(PanelShrink))
          .then(
            $.get(PartialPageNames.ContactForm, (result) => {
              setTimeout(() => {
                $("#ContentPlate").append(result);
              }, 400);
            })
          )
          .done(PanelGrow());
        break;
      default:
        PanelShrink();
        break;
    }
  } else {
    $(buttonClicked).removeClass("active");
    $(".home").addClass("active");
    PanelShrink();
  }
};

const PanelShrink = () => {
  if ($("#ContentPlate").position().top < 0) {
    return;
  }
  if (window.innerWidth >= 767) {
    Panel.animate({ top: "-100%" }, 600);
  } else {
    Panel.animate({ left: "100%" }, 600);
  }
  setTimeout(() => {
    $("#ContentPlate").empty();
  }, 400);
};

const PanelGrow = () => {
  if (window.innerWidth >= 767) {
    Panel.css({ left: "0%" });
    Panel.animate({ top: "0%" }, 600);
  } else {
    Panel.animate({ left: "20%" }, 600);
  }
};

const LoadPanelFor = (PartilPageName) => {
  return $.ajax({ url: PartilPageName });
};

$(document).ready(() => {
  $(".tilt-home").css("height", "100vh");
  $(".tilt").css("height", "100vh");

  particlesJS.load(
    "particles-js",
    "assets/particlesjs-config.json",
    VanillaTiltInit
  );
});

let VanillaTiltInit = () => {
  VanillaTilt.init(document.querySelector(".tilt"), {
    max: 5,
    speed: 400,
    reverse: false,
    perspective: 1500,
    glare: true,
    "max-glare": 0.2,
    gyroscope: true,
  });
};

// Swiper JS
const SwiperJsConfig = {
  singlePageSingleCardView: {
    grabCursor: true,
    slidesPerView: "auto",
    slidesPerView: 1,
    spaceBetween: 5,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  },
  Coverflow: {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  },
  AboutUs: {
    direction: 'vertical',
    freeMode: false,
    mousewheel: true,
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },      
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  },
};
