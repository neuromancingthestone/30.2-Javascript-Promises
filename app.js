let $numDiv = $('#num');
let $cardDiv = $('#card-box')
const $drawBtn = $('#drawBtn')
const $cardImg = $('#cardImg')

// 1 ////////////////////////////////
let url = "http://numbersapi.com/42"
let ourFirstPromise = axios.get(url);
ourFirstPromise.then(data => console.log(data));
ourFirstPromise.catch(err => console.log("REJECTED!!!", err));

// 2 ////////////////////////////////
let fourNumberFacts = [];

for (let i=1; i<5; i++) {
  fourNumberFacts.push(
    axios.get(url)
  );
}

$numDiv.append("<ul>")
Promise.all(fourNumberFacts)
  .then(numberArr => {
    for (res of numberArr) {
      $numDiv.append(`<li>${res.data}</li>`)
    }
  })
  .catch(err => console.log(err));
$numDiv.append("</ul>")

// 3 ////////////////////////////////
let cardPromise = axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
cardPromise
.then(res => {
console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
})
.catch(err => console.log("REJECTED!!", err));

// 4 ////////////////////////////////
let cardPromise2 = axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=2")
cardPromise2
.then(res => {
console.log(`Card 1: ${res.data.cards[0].value} of ${res.data.cards[0].suit}\n`)
console.log(`Card 2: ${res.data.cards[1].value} of ${res.data.cards[1].suit}\n`)
})
.catch(err => console.log("REJECTED!!", err));

// 5 ///////////////////////////////
let deckId = 0;
let shuffle = axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(res => {
    deckId = res.data.deck_id;
    return res.data
  })
  .catch(err => console.log(err))

function drawCard() {
//  console.log(deckId)
  let cProm = axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
  .then(res => {
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;    
    $cardDiv.append(
      $('<img>', {
        src: res.data.cards[0].image,
        css: {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }        
      })
    );

    if (res.data.remaining === 0) $drawBtn.remove();
    return res.data    
  })
  .catch(err => console.log(err));
}


$drawBtn.on('click', function(e) {
  drawCard()
})