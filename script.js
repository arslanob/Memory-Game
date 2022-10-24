const gameContainer = document.getElementById("game");
const startbutton = document.getElementById('StartGameButton');
//const score = document.getElementById("score")
let card1=false;
let card2=false;
let selectcard1=null;
let selectcard2=null;
let noClicking=false
let totalscore=0;
let totalgame=5;
let playing=false;


if (playing===false){
  gameContainer.style.display = "none"; 
}

startbutton.addEventListener('click', () => {
  startbutton.style.display = 'none';
  playing=true
  gameContainer.style.display = "initial"
})

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];


// a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  console.log("SHUFFLEDD!")
  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  const scoreboard = document.createElement('p');
  scoreboard.setAttribute('id', 'score')
  scoreboard.innerText='Your Score: ' +totalscore;
  gameContainer.appendChild(scoreboard)

  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  console.log('TotalScore: '+totalscore)
  console.log('TotalRoundsLeft: '+totalgame)
  if (noClicking){
    return;
  }
  if (e.target.classList.contains("flipped")) return;

  e.target.style.backgroundColor = e.target.classList[0]
  
  if (!card1) {
    console.log('card1 selected')
    e.target.classList.add("flipped");
    selectcard1 = e.target
    card1 =true;
  }
  else if (card1 & !card2){
    console.log('card2 selected')
    selectcard2 = e.target
    if (selectcard2.classList.contains('flipped')){
      console.log('This card has been chosen before')
    }
    else {
      selectcard2.classList.add("flipped")
      card2 =true;
    }
  }
  if (card1 & card2){
    noClicking = true;
    if (selectcard1.className===selectcard2.className){
      console.log('Match!!')
      selectcard1.removeEventListener("click", handleCardClick);
      selectcard2.removeEventListener("click", handleCardClick);
      card1=false;
      card2=false;
      totalgame-=1;
      noClicking = false;
    }
    else if (selectcard1.className!==selectcard2.className){
      setTimeout(function() {
      console.log('Not A Match :( ')
      selectcard1.style.backgroundColor = "";
      selectcard2.style.backgroundColor = "";
      selectcard1.classList.remove("flipped")
      selectcard2.classList.remove("flipped")
      card1=false;
      card2=false;
      totalscore+=1;
      score.innerText = 'Your Score: '+totalscore;
      noClicking = false;
      },1000)
    }
    if (totalgame==0) {
      //game ends.
      noClicking=true;
      setTimeout(function(){
        alert('Game Over! Your score is ' + totalscore)
        playing=false;
        gameContainer.style.display = "none";
        startbutton.style.display = 'initial';
        //reset score and colors.
        totalgame = 5;
        score.innerText = 0;
        let divs = document.querySelector('div[id="game"]');
        console.log(gameContainer);
        //returning div back to what it was before.
        divs.innerText='';
        totalscore = 0;
        shuffledColors = shuffle(COLORS);
        createDivsForColors(shuffledColors);
        noClicking=false;
      }, 1100)
    }
  }
  // you can use event.target to see which element was clicked
  console.log("you just clicked", e.target);
}
// when the DOM loads
createDivsForColors(shuffledColors);
