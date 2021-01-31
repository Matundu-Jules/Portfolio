// Etape 1 - Sélectionner nos éléments
let input       = document.querySelector('#prix');
let error       = document.querySelector('small');
let formulaire  = document.querySelector('#formulaire');


// Etape 2 - Cacher l'erreur
error.style.display = 'none';


// Etape 3 - Générer un nombre aléatoire
let nombreAleatoire = Math.floor(Math.random() * 1001);
let coups           = 0;
let nombreChoisi;


// Etape 6 - Créer la fonction vérifier
function verifier(nombre) {
    
    let instruction = document.createElement('div');

    if (nombre < nombreAleatoire) {
        // C'est plus.
        // Ajouter un contenu '#1 (4) c'est plus !'
        instruction.textContent = "#" + coups + " (" + nombre + ") C'est plus !";
        // Ajouter les classe instruction et plus.
        instruction.classList.add('instruction', 'plus');
        //instruction.className = 'instruction plus';

    }
    else if (nombre > nombreAleatoire) {
        // C'est moins.
        // Ajouter un contenu '#1 (4) c'est moins !'
        instruction.textContent = "#" + coups + " (" + nombre + ") C'est moins !";
        // Ajouter les classe instruction et moins.
        instruction.classList.add('instruction', 'moins');

    } else {
        // Félicitation.
        // Ajouter un contenu '#1 (4) Félicitation !'
        instruction.textContent = "#" + coups + " (" + nombre + ") Félicitations ! Vous avez trouver le juste prix !";
        // Ajouter les classe instruction et fini.
        instruction.classList.add('instruction', 'fini');
        input.disabled = true;      // Desactiver le formulaire quand le juste prix a ete trouver.
    }

    // Ajouter l'élément devant les autres
    document.querySelector('#instructions').prepend(instruction);

}


// Etape 4 - Vérifier que l'utilisateur donne bien un nombre
input.addEventListener('keyup', () => {
    if (isNaN(input.value)) {   // Si la variable n'est pas un nombre 
        // Afficher le message d'erreur 
        error.style.display = 'inline';
    } else {
        // Cacher le msg d'erreur
        error.style.display = 'none';
    }
});


// Etape 5 - Agir à l'envoi du formulaire
formulaire.addEventListener('submit', (e) => {
    e.preventDefault();     // Annuler un évènement par défaut.

    if (isNaN(input.value) || input.value == "") {
        input.style.borderColor = 'red';        // Mettre la bordure de formulaire en rouge.
    } else {
        coups++;
        input.style.borderColor = 'silver';     // Mettre la bordure de formulaire en gris.
        nombreChoisi = input.value;             // Enregistrer la valeur entrer par l'user.
        input.value = '';                       // Reinitialiser le formulaire.
        verifier(nombreChoisi);
    }
});

