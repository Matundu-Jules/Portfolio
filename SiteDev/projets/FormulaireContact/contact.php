<?php 
  // Au début on initialise des variables vides :
  $array = array("firstname" => "", "firstnameError" => "", "name" => "", "nameError" => "", "email" => "", "emailError" => "", "phone" => "", "phoneError" => "", "message" => "", "messageError" => "", "isSuccess" => false);
      
  $emailTo = "matundu.jl@gmail.com"; // Email destinataire.


  // L'UTILISATEUR A APPUYER SUR LE BOUTON ENVOYER :
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $array["firstname"] = verifyInput($_POST["firstname"]); // Récupère l'information avec les propietés name des inputs du form.
    $array["name"] = verifyInput($_POST["name"]);
    $array["email"] = verifyInput($_POST["email"]);
    $array["phone"] = verifyInput($_POST["phone"]);
    $array["message"] = verifyInput($_POST["message"]);
    $array["isSuccess"] = true;
    $emailText = ""; // Initialiser contenu de l'email.

    /*  VALIDATION DES DONNEES - COTE SERVEUR  */
    if (empty($array["firstname"])) {
      $array["firstnameError"] = "Je veux connaitre ton prénom !";
      $array["isSuccess"] = false;
    } else {
      $emailText .= "Firstname : {$array['firstname']}\n"; // .= : concatenation de string, \n : saut de ligne, {variable} : inserer variable dans string.
    }

    if (empty($array["name"])) {
      $array["nameError"] = "Et oui je veux tout savoir, même ton nom !";
      $array["isSuccess"] = false;
    } else {
      $emailText .= "Name : {$array['name']}\n"; 
    }

    // Si ce n'est pas un email valide :
    if (!isEmail($array["email"])) {
      $array["emailError"] = "Ohhrr c'est pas un email ça !";
      $array["isSuccess"] = false;
    } else {
      $emailText .= "Email : {$array['email']}\n"; 
    }

    // Si ce n'est pas un numéro de téléphone :
    if (!isPhone($array["phone"])) {
      $array["phoneError"] = "Que des chiffres et des espaces stp...";
      $array["isSuccess"] = false;
    } else {
      $emailText .= "Phone : {$array['phone']}\n"; 
    }

    if (empty($array["message"])) {
      $array["messageError"] = "Qu'est-ce que tu veux me dire ?";
      $array["isSuccess"] = false;
    } else {
      $emailText .= "Message : {$array['message']}\n"; 
    }

    /* MESSAGE DE REMERCIEMENT */
    // Si $isSuccess est true alors :
    if ($array["isSuccess"]) {
      // ENVOI DE L'EMAIL : 
      $headers = "From: {$array['firstname']} {$array['name']} <{$array['email']}>\r\nReply-To: {$array['email']}"; // \r\n : retour à la ligne.
      mail($emailTo, "Sujet de l'email", $emailText, $headers); // mail(destinataire, "sujet mail", contenu mail, entete email(de qui vient lemail, a qui repondre...)).
    }

    // Renvoyer le travail du PHP :
    echo json_encode($array); // Converti le array en objet json.

  }

  /*  VALIDATION DES DONNEES - COTE SERVEUR  */
  /* EMAIL */
  /* 
      filter_var() : 
      Prend la variable et la compare avec un filtre de validation d'email.
      La fonction renvoie true si l'email est valide et false s'il n'est pas valide. 
    */
    function isEmail($var) {
    return filter_var($var, FILTER_VALIDATE_EMAIL);
  }

  /* TELEPHONE */
  /* 
    preg_match() :

    Il est possible de tout vérifier sur notre formulaire, pour cela on va creer des Expression réguliere.

    /^[0-9 ]*$/ :

    Expression réguliere. 
    [0-9 ] = Accepte les numeros entre 0 et 9 + les espaces.
    *$ = Prend ce qu'il y a entre les crochet et tu peux le répéter de 0 fois à autant de fois que tu le souhaite.

    Il est aussi possible de remplacer le * par un + : /^[0-9 ]+$/

  */
  function isPhone($var) {
    return preg_match("/^[0-9 ]*$/", $var); // On compare l'expression réguliere à la variable.
  }


  /* SECURITE FORMULAIRE */
  // Creer une fonction pour vérifier le input :
  function verifyInput($var) {
    $var = trim($var); // trim() : Enleve les espaces, tabs, retour à la ligne.
    $var = stripslashes($var); // stripslashes : Enleve les anti slash \.
    $var = htmlspecialchars($var); // htmlspacialchars() : 
    return $var;
  }
?>