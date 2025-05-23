document.querySelectorAll(".ajouter-panier").forEach(button => {
    button.addEventListener("click", function () {
        let produit = {
            id: this.parentElement.getAttribute("data-id"),
            nom: this.parentElement.getAttribute("data-nom"),
            prix: this.parentElement.getAttribute("data-prix")
        };

        let panier = JSON.parse(localStorage.getItem("panier")) || [];
        panier.push(produit);
        localStorage.setItem("panier", JSON.stringify(panier));

        alert(`${produit.nom} ajouté au panier !`);

        afficherPanier();
    });
});

document.getElementById("search").addEventListener("input", function () {
    let searchValue = this.value.toLowerCase();
    document.querySelectorAll(".produit").forEach(produit => {
        let nomProduit = produit.getAttribute("data-nom").toLowerCase();
        let categorieProduit = produit.getAttribute("data-categorie").toLowerCase();
        produit.style.display = (nomProduit.includes(searchValue) || categorieProduit.includes(searchValue)) 
            ? "block" 
            : "none";
    });
});

function afficherPanier() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let panierDiv = document.getElementById("panier");

    if (panier.length === 0) {
        panierDiv.innerHTML = "<p>Votre panier est vide.</p>";
    } else {
        panierDiv.innerHTML = "<h3>Produits dans le panier :</h3>";
        panier.forEach(produit => {
            panierDiv.innerHTML += `
                <div class="panier-item">
                    <img src="${produit.nom.toLowerCase()}.jpg" alt="${produit.nom}" class="image-panier">
                    <p>${produit.nom} - ${produit.prix}€</p>
                </div>
            `;
        });
    }
}

document.getElementById("filtreAvance").addEventListener("change", function () {
    let produits = document.querySelectorAll(".produit");
    let tri = this.value;

    let produitsArray = Array.from(produits);

    if (tri === "prixAsc") {
        produitsArray.sort((a, b) => a.getAttribute("data-prix") - b.getAttribute("data-prix"));
    } else if (tri === "prixDesc") {
        produitsArray.sort((a, b) => b.getAttribute("data-prix") - a.getAttribute("data-prix"));
    }

    produitsArray.forEach(p => document.querySelector(".produits").appendChild(p));
});


document.getElementById("boutonPaiement").addEventListener("click", function () {
    window.location.href = "paiement.html";
});

document.getElementById("toggleMode").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    document.querySelector("header").classList.toggle("dark-mode");
    document.querySelectorAll(".produits").forEach(el => el.classList.toggle("dark-mode"));
    document.querySelectorAll(".produit").forEach(el => el.classList.toggle("dark-mode"));

    let modeActuel = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("mode", modeActuel);

    this.textContent = modeActuel === "dark" ? "Mode clair" : "Mode sombre";
});

// Vérifie le mode sombre au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
        document.querySelector("header").classList.add("dark-mode");
        document.querySelectorAll(".produits").forEach(el => el.classList.add("dark-mode"));
        document.querySelectorAll(".produit").forEach(el => el.classList.add("dark-mode"));
        document.getElementById("toggleMode").textContent = "Mode clair";
    }
});

document.getElementById("viderPanier").addEventListener("click", function () {
    if (confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
        let produits = document.querySelectorAll("#panier p");
        produits.forEach(produit => produit.classList.add("fade-out"));

        setTimeout(() => {
            localStorage.removeItem("panier");
            document.getElementById("panier").innerHTML = "<p>Votre panier est vide.</p>";

            let totalElement = document.getElementById("total");
            if (totalElement) {
                totalElement.textContent = "Total : 0€";
            }

            alert("Le panier a été vidé !");
        }, 500);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let total = 0;
    let panierDiv = document.getElementById("panier");
    let totalElement = document.getElementById("total");

    if (panier.length === 0) {
        panierDiv.innerHTML = "<p>Votre panier est vide.</p>";
        if (totalElement) totalElement.textContent = "Total : 0€";
    } else {
        panier.forEach(produit => {
            total += parseFloat(produit.prix);
            let item = document.createElement("p");
            item.textContent = `${produit.nom} - ${produit.prix}€`;
            panierDiv.appendChild(item);
        });

        if (totalElement) totalElement.textContent = `Total : ${total}€`;
    }
});

document.querySelectorAll(".produit").forEach(produit => {
    produit.addEventListener("mouseover", () => {
        produit.style.backgroundColor = "#ddd";
    });

    produit.addEventListener("mouseout", () => {
        produit.style.backgroundColor = "#f8f8f8";
    });
});

document.querySelectorAll(".stock-dispo").forEach(stock => {
    let dispo = Math.floor(Math.random() * 10) + 1; // Simule un stock aléatoire
    stock.innerText = `Stock restant : ${dispo}`;
});

document.querySelectorAll(".wishlist").forEach(button => {
    button.addEventListener("click", function () {
        let produit = this.parentElement.getAttribute("data-nom");
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        if (!wishlist.includes(produit)) {
            wishlist.push(produit);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            alert(`${produit} ajouté à votre liste de favoris !`);
        }
    });
});
document.querySelectorAll(".progression-stock").forEach((bar, index) => {
    let stockDispo = Math.floor(Math.random() * 10) + 1; // Simule un stock aléatoire
    bar.style.width = `${stockDispo * 10}%`; // Adapte la barre au stock réel

    // Change la couleur selon la disponibilité
    bar.style.backgroundColor = stockDispo > 5 ? "green" : stockDispo > 2 ? "orange" : "red";
});
