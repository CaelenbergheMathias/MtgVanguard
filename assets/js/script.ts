let cards:object[];

function selectXRandomCards(x:number)
{
    let chosenCards:object[]= [];

    for(let i:number = 0; i<x; i++)
    {
        let index = Math.floor((Math.random() * 10) );
        if(chosenCards.indexOf(cards[index])<0)
        {
            chosenCards.push(cards[index]);
        }
        else{
            i--;
        }

    }

    return chosenCards;
}

function addXCardsToScreen(x:number)
{
    let chosenCards:object[] = selectXRandomCards(x);
    let ul = document.createElement("ul");

    chosenCards.forEach(function (card) {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = `${card.image_uris.normal}`;
        li.appendChild(img);
        ul.appendChild(li);



    });
    document.getElementById("vanguards").appendChild(ul);
}

function registerSW()
{
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js').then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
}

function fetchVanguards()
{
    fetch("https://api.scryfall.com/cards/search?q=t:vanguard",{method:"Get"}).then(function (data) {
        return data.json();
    }).then(function (json) {
        cards = json.data;
        console.log(cards)
    }).then(function () {
        document.getElementById("1").addEventListener("click",function () {
            document.getElementById("vanguards").innerHTML="";

            addXCardsToScreen(1);
        });
        document.getElementById("2").addEventListener("click",function () {
            document.getElementById("vanguards").innerHTML="";
            addXCardsToScreen(3);
        });
        document.getElementById("3").addEventListener("click",function () {
            document.getElementById("vanguards").innerHTML="";

            let ul = document.createElement("ul");
            cards.forEach(function (card) {
                let li = document.createElement("li");
                let img = document.createElement("img");
                img.src = `${card.image_uris.normal}`;
                li.appendChild(img);
                ul.appendChild(li);
            });
            document.getElementById("vanguards").appendChild(ul);
        });
    }).catch(function (err) {
        let p = document.createElement("p");
        p.innerText = "Could Not Fetch The Cards Scryfall Could be Offline ATM";
        document.getElementById("vanguards").appendChild(p);

    })
}

document.addEventListener('DOMContentLoaded', function () {
    registerSW();
    console.log('loaded');
    fetchVanguards();


});