$(function () {
  //Animation Boutons Page d'accueil :
  $("#about").animate({ opacity: 1.0 }, 2000);

  //Animation lorsque l'on passe la souris sur un btn de l'accueil:
  $(".btnAccueilAnim").hover(
    function () {
      // over
      $(".imgCircleAccueil").fadeOut(1);
      $(".imgCircleAccueil").attr("src", "img/me3.jpg");
      $(".imgCircleAccueil").fadeIn(1000);
    },
    function () {
      // out
    }
  );
  $(".btnAccueilDev").hover(
    function () {
      // over
      $(".imgCircleAccueil").fadeOut(1);
      $(".imgCircleAccueil").attr("src", "img/me2.jpg");
      $(".imgCircleAccueil").fadeIn(1000);
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
