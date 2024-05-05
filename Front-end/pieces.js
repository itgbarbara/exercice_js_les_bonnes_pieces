// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json")
const pieces  = await reponse.json()

// Création des balises
const article = pieces[0]

const imageElement = document.createElement("img") // On crée une balise html <img> (image)
imageElement.src = article.image // On y ajoute l'attribut src avec comme valeur la propriété "image" de l'article (contient le lien)

const nomElement = document.createElement("h2") // On crée une balise html <h2> (titre 2)
nomElement.innerText = article.nom // On y ajoute le nom de l'article

const prixElement = document.createElement("p") // On crée une balise html <p> (paragraphe)
prixElement.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})` // On y ajoute une chaîne de caractères avec le prix de l'article

const categorieElement = document.createElement("p") // On crée une balise html <p> (paragraphe)
categorieElement.innerText = article.categorie ?? "(aucune catégorie)" // On y ajoute la catégorie de l'article

const descriptionElement = document.createElement("p") // On crée une balise html <p> (paragraphe)
descriptionElement.innerText = article.description ?? "Pas de description pour le moment" // On y ajoute la description de l'article

const disponibiliteElement = document.createElement("p")
disponibiliteElement.innerText = article.disponibilite === true ? "En stock" : "Rupture de stock"

// Rattachement de nos balises au DOM
const sectionFiches = document.querySelector(".fiches")
sectionFiches.appendChild(imageElement) // On appelle la fonction appendChild sur le parent
sectionFiches.appendChild(nomElement)
sectionFiches.appendChild(prixElement)
sectionFiches.appendChild(categorieElement)
sectionFiches.appendChild(descriptionElement)
sectionFiches.appendChild(disponibiliteElement)
