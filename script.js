$(function () {
  //Animsition : Animation de transition entre les pages :
  $(".animsition").animsition({
    inClass: "fade-in-right",
    outClass: "fade-out-right",
    inDuration: 1500,
    outDuration: 800,
    linkElement: ".animsition-link",
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: "body", //animsition wrapper element
    loadingClass: "animsition-loading",
    loadingInner: "", // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: ["animation-duration", "-webkit-animation-duration"],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay: false,
    overlayClass: "animsition-overlay-slide",
    overlayParentElement: "body",
    transition: function (url) {
      window.location.href = url;
    },
  });

  // Variables :
  let imgCircle = $(".imgCircleAccueil").attr("src", "img/me2.JPG");
  let imgCircleAnim = $(".imgCircleAccueil").attr("src", "img/me3.jpg");
  let imgCircleDev = $(".imgCircleAccueil").attr("src", "img/me2.JPG");

  //Animation changement photo lorsque l'on passe la souris sur un btn de l'accueil:
  function animationImgAnim() {
    $(".imgCircleAccueil").fadeOut(0);
    $(".imgCircleAccueil").attr("src", "img/me3.jpg");
    $(".imgCircleAccueil").fadeIn(1000);
    imgCircle = imgCircleAnim;
  }
  function animationImgDev() {
    imgCircle.fadeOut(0);
    $(".imgCircleAccueil").attr("src", "img/me2.JPG");
    imgCircle.fadeIn(1000);
    imgCircle = imgCircleDev;
  }

  $(".btnAccueilAnim").hover(function () {
    // over
    if (imgCircle != imgCircleAnim) {
      animationImgAnim();
    }
  });

  $(".btnAccueilDev").hover(function () {
    // over
    if (imgCircle != imgCircleDev) {
      animationImgDev();
    }
  });

  // Animation au click d'un lien pour changer de catégorie :
  $(".navbar a, footer a").on("click", function (event) {
    event.preventDefault();
    var hash = this.hash;

    $("body, html").animate(
      { scrollTop: $(hash).offset().top },
      1000,
      function () {
        window.location.hash = hash;
      }
    );
  });
});
