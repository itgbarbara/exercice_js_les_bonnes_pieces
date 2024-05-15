export function ajoutListenersAvis() {
    const btnAvisPiece = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < btnAvisPiece.length; i++) { // On parcourt tous les boutons d'avis
        btnAvisPiece[i].addEventListener("click", async function (event) { // On ajoute un écouteur d'évnt sur le click
            const id = event.target.dataset.id // On récupère l'id du bouton qui a déclenché l'évènement

            const reponse = await fetch (`http://localhost:8081/pieces/${id}/avis`) // On envoie la requête au serveur pour récupérer les avis de la pièce concernée (GET par défaut) et on stock la réponse dans une variable
            const avis = await reponse.json() // On désérialise la réponse reçue au format JSON, pour reconstruire les données

            window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis)) // Stockage des informations désérialisées dans le localStorage (2 étapes en 1)
        
            const parentBtnAvis = event.target.parentElement // On récupère l'élément parent du bouton qui a déclenché l'évènement
            afficherAvis(parentBtnAvis, avis)
        });
    }
}

// Refactoriser le code de génération du DOM des avis
export function afficherAvis(parentBtnAvis, avis) {
    const avisPiece = document.createElement("p") // On crée une balise pour accueillir les commentaires
    for (let i=0; i < avis.length; i++) {
        avisPiece.innerHTML += `${avis[i].utilisateur} : ${avis[i].commentaire} <br>` // On ajoute du contenu de la balise
        parentBtnAvis.appendChild(avisPiece) // On ajoute la balise à l'élément parent sélectionné plus tôt
    }
}

export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis")
    formulaireAvis.addEventListener("submit", (event) => {
        event.preventDefault() // Pour empêcher le rechargement par défaut de la page lors de l'envoi du formulaire

        // Création de l'objet du nouvel avis
        const avis = { // Création d'un objet reprennant les champs du formulaire et crée une propriété pour chacun d'entre eux
            pieceId: parseInt(event.target.querySelector("[name=piece-id]").value), // on sélectionne la valeur choisie dans le champ ID et on la convertit en nombre entier
            utilisateur: event.target.querySelector("[name=utilisateur]").value, // On séléctionne la valeur tapée dans le champ utilisateur
            commentaire: event.target.querySelector("[name=commentaire]").value, // On sélectionne le commentaire tapé dans le champ textarea
            nbEtoiles: parseInt(event.target.querySelector("[name=nb-etoiles]").value) // On sélectionne le nombre d'éoile et on le convertit en nombre entier
        }

        // Création de la charge utile contenant l'objet au format JSON
        const chargeUtile = JSON.stringify(avis)

        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: chargeUtile
        })

    })
}