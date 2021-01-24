const Panel = $("#ContentPlate");
const PartialPageNames = {
  Home: "#",
  Portfolio: "./partialViews/Portfolio.html",
  About: "./partialViews/AboutUs.html",
  ContactForm: "./partialViews/ContactUs.html",
};

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
                InitializeTilt(5, 400);
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
                console.log("init");
                $("#ContentPlate").append(result);
                InitializeTilt(2, 200);
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
    Panel.animate({ left: "10%" }, 600);
  }
};

const LoadPanelFor = (PartilPageName) => {
  return $.ajax({ url: PartilPageName });
};

const InitializeTilt = (_max, _speed) => {
  //It also supports NodeList
  VanillaTilt.init(document.querySelectorAll(".tilt"));
  VanillaTilt.init(document.querySelector(".tilt"), {
    max: _max,
    speed: _speed,
  });

  //It also supports NodeList
  VanillaTilt.init(document.querySelectorAll(".tilt"));
};

// tilt js
$(document).ready(() => {
  InitializeTilt(5, 400);
});
