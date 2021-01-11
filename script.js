$(function () {
  //Animation Boutons Page d'accueil :
  $("#about").animate({ opacity: 1.0 }, 2000);

  //Animation lorsque l'on passe la souris sur un btn de l'accueil:
  $("#sectionAnim").hover(
    function () {
      // over
      $("img").fadeOut(1);
      $("img").attr("src", "img/me3.jpg");
      $("img").fadeIn(1000);
    },
    function () {
      // out
    }
  );
  $("#sectionDev").hover(
    function () {
      // over
      $("img").fadeOut(1);
      $("img").attr("src", "img/me2.jpg");
      $("img").fadeIn(1000);
    },
    function () {
      // out
    }
  );
  // Animation au click d'un lien :
  $(".navbar a, footer a").on("click", function (event) {
    event.preventDefault();
    var hash = this.hash;

    $("body, html").animate(
      { scrollTop: $(hash).offset().top },
      900,
      function () {
        window.location.hash = hash;
      }
    );
  });
});
