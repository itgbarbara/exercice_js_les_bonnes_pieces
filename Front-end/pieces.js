// Import des fonctions du fichier avis.js
import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherAvis } from "./avis.js"

// Récupération des pièces éventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem("pieces")
if (pieces === null) {
    // Code de récupération des pièces depuis l'API HTTP
    const reponse = await fetch("http://localhost:8081/pieces") // On envoie une requête pour récupérer les données du fichier pieces-auto.json
    pieces = await reponse.json() // On désérialise le JSON et on stocke la liste d'objets obtenue dans la variable "pieces"

    // Transformation des pièces en JSON pour les stocker dans le localStorage
    const valeurPieces = JSON.stringify(pieces)

    // Stockage des informations dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces)
} else {
    pieces = JSON.parse(pieces) // On reconstruit les données en mémoire
}

// Déclaration de la fonction qui génère tout le contenu de la section "Fiches"
// Pour ne pas avoir à répérer le code de la boucle FOR à chaque fois qu'on regénère la page
function genererPieces(pieces) {
    for (let i=0; i < pieces.length; i++) {

        const article = pieces[i];

        // Création des balises et rattachement au DOM

        const fichePiece = document.createElement("article") //Création d'une balise <article> dédiée à une fiche pour une pièce auto

        const imagePiece = document.createElement("img") // On crée l'élément html image <img>
        imagePiece.src = article.image //On accède à l'indice i de la liste de pièces pour configurer la source de l'image
        fichePiece.appendChild(imagePiece) // On rattache l'image <img> à la balise <article>

        const nomPiece = document.createElement("h2") // On crée une balise html <h2> (titre 2)
        nomPiece.innerText = article.nom // On y ajoute le nom de l'article
        fichePiece.appendChild(nomPiece) // On rattache le titre <h2> à la balise <article>

        const prixPiece = document.createElement("p") // On crée une balise html <p> (paragraphe)
        prixPiece.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})` // On y ajoute une chaîne de caractères avec le prix de l'article
        fichePiece.appendChild(prixPiece) // On rattache le paragraphe <p> contenant le prix à la balise <article>

        const categoriePiece = document.createElement("p") // On crée une balise html <p> (paragraphe)
        categoriePiece.innerText = article.categorie ?? "(aucune catégorie)" // On y ajoute la catégorie de l'article
        fichePiece.appendChild(categoriePiece) // On rattache le paragraphe <p> contenant la catégorie à la balise <article>

        const descriptionPiece = document.createElement("p") // On crée une balise html <p> (paragraphe)
        descriptionPiece.innerText = article.description ?? "Pas de description pour le moment" // On y ajoute la description de l'article*
        fichePiece.appendChild(descriptionPiece) // On rattache le paragraphe <p> contenant la description à la balise <article>
    
        const disponibilitePiece = document.createElement("p")
        disponibilitePiece.innerText = article.disponibilite === true ? "En stock" : "Rupture de stock"
        fichePiece.appendChild(disponibilitePiece) // On rattache le paragraphe <p> contenant la disponibilité à la balise <article>

        const avisBouton = document.createElement("button"); // Création du boutons pour afficher les avis
        avisBouton.dataset.id = article.id; // rattachement du bouton à la fiche produit correspondante

        avisBouton.textContent = "Afficher les avis"; // Texte à l'intérieur du bouton
        fichePiece.appendChild(avisBouton); // Rattachement du bouton au DOM (élément parent : fiche article)


        // Récupération de l'élément du DOM qui accueillera les fiches (parent)
        const sectionFiches = document.querySelector(".fiches") // On récupère la <section> de classe "Fiches"
        sectionFiches.appendChild(fichePiece) // On rattache la balise <article> créée au début à la <section> de classe "fiches"

    }

    ajoutListenersAvis()
    ajoutListenerEnvoyerAvis()
}

// Premier affichage de la page
genererPieces(pieces)


//
for (let i=0; i < pieces.length; i++) {
    const id = pieces[i].id
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`)
    const avis = JSON.parse(avisJSON) // On reconstruit les données en mémoire
    
    if (avis !== null) {
        const fichePiece = document.querySelector(`article[data-id="${id}]`)
        afficherAvis(fichePiece, avis)
    }
}


// Gestion des boutons
// Tri par ordre croissant
const boutonTrierCroissant = document.querySelector(".btn-trier-croissant") // On récupère le bouton de tri croissant
boutonTrierCroissant.addEventListener("click", () => { // On attache à ce bouton un écouteur d'évènement sur l'évènement "click"

    const piecesOrdonneesCroissant = Array.from(pieces) // On copie le tableau dans une variable pour ne pas perdre l'ordre d'origine
    piecesOrdonneesCroissant.sort(function(a, b) { // On applique la fonction "sort" sur ce nouveau tableau
        return a.prix - b.prix // Retourne un résultat positif, négatif ou nul
    })
    document.querySelector(".fiches").innerHTML = "" // On efface le contenu de la section "Fiches"
    genererPieces(piecesOrdonneesCroissant) // On regénère la page avec les fiches triées par ordre de prix croissant
})

// On filtre les pièces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer") // On récupère le bouton de filtrage
boutonFiltrer.addEventListener("click", () => { // On attache à ce bouton un écouteur d'évènement sur l'évènement "click"

    const piecesFiltrees = pieces.filter(function(piece) { // On appliquer la fonction "filter" sur ce bouton
        return piece.prix <= 35 // Retourne un tableau ne contenant plus que les articles dont le prix est < 35 €
    })
    document.querySelector(".fiches").innerHTML = "" // On efface le contenu de la section "Fiches"
    genererPieces(piecesFiltrees) // On regénère la page avec les fiches filtrées
})

//Tri par ordre décroissant
const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant")
boutonTrierDecroissant.addEventListener("click", () => {

    const piecesOrdonnees = Array.from(pieces) // On copie le tableau dans une variable pour ne pas perdre l'ordre d'origine
    piecesOrdonnees.sort(function(a, b) {
        return b.prix - a.prix
    })
    document.querySelector(".fiches").innerHTML = "" // On efface le contenu de la section "Fiches"
    genererPieces(piecesOrdonnees) // On regénère la page avec les fiches triées par ordre de prix décroissant
})

// On filtre les pièces non disponibles
const boutonNoDescription = document.querySelector(".btn-nodesc")
boutonNoDescription.addEventListener("click", () => { 

    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.description // Si la description est présente, l'élément sera dans la nouvelle liste
    })
    document.querySelector(".fiches").innerHTML = "" // On efface le contenu de la section "Fiches"
    genererPieces(piecesFiltrees) // On regénère la page avec les fiches filtrées
})

const inputPrixMax = document.getElementById("prix-max")
inputPrixMax.addEventListener("input", () =>{

    const piecesFiltrees = pieces.filter(piece => piece.prix <= inputPrixMax.value)
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
})

// Ajout du listener pour mettre à jour les données du localStorage
const boutonMettreAJour = document.querySelector(".btn-maj")
boutonMettreAJour.addEventListener("click", () => {
    window.localStorage.removeItem("pieces")
})


// Code devenu inutile

// // Exctraction des noms de la liste de pièces
// const noms = pieces.map(piece => piece.nom)
// console.log(noms)
// for (let i=pieces.length-1; i>=0; i--) {
//     if(pieces[i].prix > 35) {
//         noms.splice(i,1)
//     }
// }

// // Création de la liste en html
// const abordablesElements = document.createElement("ul")
// // Ajout de chaque nom à la liste
// for (let i=0; i < noms.length; i++) {
//     const nomElement = document.createElement("li")
//     nomElement.innerText = noms[i]
//     abordablesElements.appendChild(nomElement)
// }

// // Ajout de l'entête puis de la liste au bloc résultats filtres
// document.querySelector(".abordables")
//     .appendChild(abordablesElements)

// //
// // Exercice //
// //
// const nomPrixDisponibles = pieces.map(piece => `${piece.nom} - ${piece.prix} €`)
// console.log(nomPrixDisponibles)
// for (let i=pieces.length-1; i>=0; i--) {
//     if (pieces[i].disponibilite === false) {
//         nomPrixDisponibles.splice(i,1)
//     }
// }

// // Création de la liste en html
// const disponiblesElements = document.createElement("ul")
// // Ajout de chaque nom à la liste
// for (let i=0; i < nomPrixDisponibles.length; i++) {
//     const nomElement = document.createElement("li")
//     nomElement.innerText = nomPrixDisponibles[i]
//     disponiblesElements.appendChild(nomElement)
// }

// // Ajout de l'entête puis de la liste au bloc résultats filtres
// document.querySelector(".disponibles")
//     .appendChild(disponiblesElements)

