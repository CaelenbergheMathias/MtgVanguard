var cards;
function selectXRandomCards(x) {
    var chosenCards = [];
    for (var i = 0; i < x; i++) {
        var index = Math.floor((Math.random() * cards.length));
        console.log(cards.length);
        if (chosenCards.indexOf(cards[index]) < 0) {
            chosenCards.push(cards[index]);
        }
        else {
            i--;
        }
    }
    return chosenCards;
}
function addCardsToScreen(cards) {
    document.getElementById("vanguards").innerHTML = "";
    var ul = document.createElement("ul");
    cards.forEach(function (card) {
        var article = document.createElement("article");
        var img = document.createElement("img");
        img.src = "" + card.image_uris.normal;
        article.appendChild(img);
        var h2 = document.createElement("h2");
        h2.innerText = card.name;
        article.appendChild(h2);
        var description = document.createElement("p");
        description.innerText = card.oracle_text;
        article.appendChild(description);
        var handsize = document.createElement("h3");
        handsize.innerText = "Handsize Modifier";
        var hdescr = document.createElement("p");
        hdescr.innerText = card.hand_modifier;
        var life = document.createElement("h3");
        life.innerText = "Life Modifier";
        var lifedescr = document.createElement("p");
        lifedescr.innerText = card.life_modifier;
        article.appendChild(handsize);
        article.appendChild(hdescr);
        article.appendChild(life);
        article.appendChild(lifedescr);
        var li = document.createElement("li");
        li.appendChild(article);
        ul.appendChild(li);
    });
    document.getElementById("vanguards").appendChild(ul);
}
function addXCardsToScreen(x) {
    var chosenCards = selectXRandomCards(x);
    addCardsToScreen(chosenCards);
}
// function registerSW()
// {
//     if ('serviceWorker' in navigator) {
//         window.addEventListener('load', function() {
//             navigator.serviceWorker.register('sw.js').then(function(registration) {
//                 // Registration was successful
//                 console.log('ServiceWorker registration successful with scope: ', registration.scope);
//             }, function(err) {
//                 // registration failed :(
//                 console.log('ServiceWorker registration failed: ', err);
//             });
//         });
//     }
// }
function addEventListeners() {
    document.getElementById("1").addEventListener("click", function () {
        addXCardsToScreen(1);
    });
    document.getElementById("2").addEventListener("click", function () {
        addXCardsToScreen(2);
    });
    document.getElementById("3").addEventListener("click", function () {
        addXCardsToScreen(3);
    });
    document.getElementById("4").addEventListener("click", function () {
        addCardsToScreen(cards);
    });
}
function fetchVanguards() {
    fetch("https://api.scryfall.com/cards/search?q=t:vanguard", { method: "Get" }).then(function (data) {
        return data.json();
    }).then(function (json) {
        cards = json.data;
        console.log(cards);
    }).then(function () {
        addEventListeners();
    }).catch(function (err) {
        var p = document.createElement("p");
        p.innerText = "Could Not Fetch The Cards Scryfall Could be Offline ATM";
        document.getElementById("vanguards").appendChild(p);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    // registerSW();
    console.log('loaded');
    fetchVanguards();
});
