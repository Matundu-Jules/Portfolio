$(function () {
  // Lorsque je soumet le formulaire alors :
  $("#contact-form").submit(function (e) {
    e.preventDefault(); // Enleve le comportement par default du formulaire.

    // Prendre tout les commentaires(msg erreur) et les vider :
    // Pour repartir à zéro à chaque fois que l'on soumet le formulaire.
    $(".comments").empty(); // Si il y a quelque chose dedans alors je les efface.

    /* 
            Aller chercher toutes les infos dans le formulaire et les mettre ('les serializer')
             dans une variable postdata.
        */
    var postdata = $("#contact-form").serialize(); // Serializer les infos du form dans la var postdata.

    $.ajax({
      type: "POST",
      url: "contact.php",
      data: postdata,
      dataType: "json",
      success: function (result) {
        /* 
            Dans le cas ou c'est un succes, que tout c'est bien passer alors tu execute cette fonction.
            Cette fonction reçoit une valeur et c'est sur cette valeur de resultat que l'on fera toutes nos manipulations.
        */
        // Si le resultat du parametre isSuccess est true alors :
        if (result.isSuccess) {
          $("#contact-form").append(
            "<p class='thank-you'>Votre message a bien été envoyé. Merci de m'avoir contacté :)</p>"
          ); // Affiche le msg de remeciement.
          $("#contact-form")[0].reset(); // Remet les éléments à zéro.
        } else {
          /* 
            Le sélécteur $('#firstname + .comments') : L'éléments qui suit l'id #firstname et qui à la classe .comments
          */
          $("#firstname + .comments").html(result.firstnameError);
          $("#name + .comments").html(result.nameError);
          $("#email + .comments").html(result.emailError);
          $("#phone + .comments").html(result.phoneError);
          $("#message + .comments").html(result.messageError);
        }
      },
    });
  });
});
