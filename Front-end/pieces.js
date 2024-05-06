// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json")
const pieces  = await reponse.json()

// Génération des fiches produits
for (let i=0; i < pieces.length; i++) {

    const article = pieces[i]

    // Récupération de l'élément du DOM qui accueillera les fiches (parent)
    const sectionFiches = document.querySelector(".fiches") // On récupère la <section> de classe "Fiches"

    // Création des balises et rattachement au DOM
    const pieceElement = document.createElement("article") // Création d'une balise <article> dédiée à une pièce auto
    sectionFiches.appendChild(pieceElement) // On rattache la balise <article> à la <section> de classe "fiches"

    const imageElement = document.createElement("img") // On crée une balise html <img> (image)
    imageElement.src = article.image // On accède à l'indice i de la liste pieces pour configurer la source de l'image
    pieceElement.appendChild(imageElement) // On rattache l'image <img> à la balise <article>

    const nomElement = document.createElement("h2") // On crée une balise html <h2> (titre 2)
    nomElement.innerText = article.nom // On y ajoute le nom de l'article
    pieceElement.appendChild(nomElement) // On rattache le titre <h2> à la balise <article>

    const prixElement = document.createElement("p") // On crée une balise html <p> (paragraphe)
    prixElement.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})` // On y ajoute une chaîne de caractères avec le prix de l'article
    pieceElement.appendChild(prixElement) // On rattache le paragraphe <p> contenant le prix à la balise <article>

    const categorieElement = document.createElement("p") // On crée une balise html <p> (paragraphe)
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)" // On y ajoute la catégorie de l'article
    pieceElement.appendChild(categorieElement) // On rattache le paragraphe <p> contenant la catégorie à la balise <article>

    const descriptionElement = document.createElement("p") // On crée une balise html <p> (paragraphe)
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment" // On y ajoute la description de l'article*
    pieceElement.appendChild(descriptionElement) // On rattache le paragraphe <p> contenant la description à la balise <article>

    const disponibiliteElement = document.createElement("p")
    disponibiliteElement.innerText = article.disponibilite === true ? "En stock" : "Rupture de stock"
    pieceElement.appendChild(disponibiliteElement) // On rattache le paragraphe <p> contenant la disponibilité à la balise <article>

}

// Gestion des boutons
const boutonTrierCroissant = document.querySelector(".btn-trier-croissant") // On récupère le bouton de tri croissant
boutonTrierCroissant.addEventListener("click", () => { // On attache à ce bouton un écouteur d'évènement sur l'évènement "click"

    const piecesOrdonneesCroissant = Array.from(pieces) // On copie le tableau dans une variable pour ne pas perdre l'ordre d'origine
    piecesOrdonneesCroissant.sort(function(a, b) { // On applique la fonction "sort" sur ce nouveau tableau
        return a.prix - b.prix // Retourne un résultat positif, négatif ou nul
    })
    console.log(piecesOrdonneesCroissant) // Affiche la nouvelle liste ordonnée par ordre croissant de prix
})

const boutonFiltrer = document.querySelector(".btn-filtrer") // On récupère le bouton de filtrage
boutonFiltrer.addEventListener("click", () => { // On attache à ce bouton un écouteur d'évènement sur l'évènement "click"

    const piecesFiltrees = pieces.filter(function(piece) { // On appliquer la fonction "filter" sur ce bouton
        return piece.prix <= 35 // Retourne un tableau ne contenant plus que les articles dont le prix est < 35 €
    })
    console.log(piecesFiltrees)
})

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant")
boutonTrierDecroissant.addEventListener("click", () => {

    const piecesOrdonnees = Array.from(pieces) // On copie le tableau dans une variable pour ne pas perdre l'ordre d'origine
    piecesOrdonnees.sort(function(a, b) {
        return b.prix - a.prix
    })
    console.log(piecesOrdonnees)
})

const boutonNoDescription = document.querySelector(".btn-nodesc")
boutonNoDescription.addEventListener("click", () => { 

    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.description // Si la description est présente, l'élément sera dans la nouvelle liste
    })
    console.log(piecesFiltrees)
})

// Exctraction des noms de la liste de pièces
const noms = pieces.map(piece => piece.nom)
console.log(noms)
for (let i=pieces.length-1; i>=0; i--) {
    if(pieces[i].prix > 35) {
        noms.splice(i,1)
    }
}

// Création de la liste en html
const abordablesElements = document.createElement("ul")
// Ajout de chaque nom à la liste
for (let i=0; i < noms.length; i++) {
    const nomElement = document.createElement("li")
    nomElement.innerText = noms[i]
    abordablesElements.appendChild(nomElement)
}

// Ajout de l'entête puis de la liste au bloc résultats filtres
document.querySelector(".abordables")
    .appendChild(abordablesElements)

//
// Exercice //
//
const nomPrixDisponibles = pieces.map(piece => `${piece.nom} - ${piece.prix} €`)
console.log(nomPrixDisponibles)
for (let i=pieces.length-1; i>=0; i--) {
    if (pieces[i].disponibilite === false) {
        nomPrixDisponibles.splice(i,1)
    }
}

// Création de la liste en html
const disponiblesElements = document.createElement("ul")
// Ajout de chaque nom à la liste
for (let i=0; i < nomPrixDisponibles.length; i++) {
    const nomElement = document.createElement("li")
    nomElement.innerText = nomPrixDisponibles[i]
    disponiblesElements.appendChild(nomElement)
}

// Ajout de l'entête puis de la liste au bloc résultats filtres
document.querySelector(".disponibles")
    .appendChild(disponiblesElements)

