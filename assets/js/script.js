var cards;
function selectXRandomCards(x) {
    var chosenCards = [];
    for (var i = 0; i < x; i++) {
        var index = Math.floor((Math.random() * 10));
        chosenCards.push(cards[index]);
    }
    return chosenCards;
}
function registerSW() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('sw.js').then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
}
function fetchVanguards() {
    fetch("https://api.scryfall.com/cards/search?q=t:vanguard", { method: "Get" }).then(function (data) {
        return data.json();
    }).then(function (json) {
        cards = json.data;
        console.log(cards);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    registerSW();
    console.log('loaded');
    fetchVanguards();
});
