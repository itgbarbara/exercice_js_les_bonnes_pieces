// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json")
const pieces  = await reponse.json()


for (let i=0; i < pieces.length; i++) {

    // Récupération de l'élément du DOM qui accueillera les fiches (parent)
    const sectionFiches = document.querySelector(".fiches")

    // Création des balises
    const pieceElement = document.createElement("article") // Création d'une balise <article> dédiée à une pièce auto

    const imageElement = document.createElement("img") // On crée une balise html <img> (image)
    imageElement.src = pieces[i].image // On accède à l'indice i de la liste pieces pour configurer la source de l'image

    const nomElement = document.createElement("h2") // On crée une balise html <h2> (titre 2)
    nomElement.innerText = pieces[i].nom // On y ajoute le nom de l'article

    const prixElement = document.createElement("p") // On crée une balise html <p> (paragraphe)
    prixElement.innerText = `Prix : ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})` // On y ajoute une chaîne de caractères avec le prix de l'article

    const categorieElement = document.createElement("p") // On crée une balise html <p> (paragraphe)
    categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)" // On y ajoute la catégorie de l'article

    const descriptionElement = document.createElement("p") // On crée une balise html <p> (paragraphe)
    descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment" // On y ajoute la description de l'article

    const disponibiliteElement = document.createElement("p")
    disponibiliteElement.innerText = pieces[i].disponibilite === true ? "En stock" : "Rupture de stock"

    // Rattachement de nos balises au DOM
    sectionFiches.appendChild(pieceElement) // On rattache la balise <article> à la section de classe fiches
    pieceElement.appendChild(imageElement) // On rattache l'image à la balise <article>
    pieceElement.appendChild(nomElement) // Idem
    pieceElement.appendChild(prixElement) // Idem
    pieceElement.appendChild(categorieElement) // Idem
    pieceElement.appendChild(descriptionElement) // Idem
    pieceElement.appendChild(disponibiliteElement) // Idem

}
