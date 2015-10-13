//Three sets of vocabulary including pictures

// Food vocab set
var foodVocab = ["pomme", "banane", "orange", "raisins", "avocat", "citron", "prune", "pastèque", "mangue", "poire", "framboise", "fraise", "myrtille", "cerise", "ananas", "abricot"]

var foodImages = ["vocab/food/images/apple.jpg", "vocab/food/images/banana.jpg", "vocab/food/images/orange.png", "vocab/food/images/grapes.jpg", "vocab/food/images/avocado.jpg", "vocab/food/images/lemon.jpg", "vocab/food/images/plum.jpg", "vocab/food/images/watermelon.jpg", "vocab/food/images/mango.png", "vocab/food/images/pear.png", "vocab/food/images/raspberry.png", "vocab/food/images/strawberry.jpg", "vocab/food/images/blueberry.gif", "vocab/food/images/cherry.png", "vocab/food/images/pineapple.jpeg", "vocab/food/images/apricot.jpg"]

document.getElementById("fruits").addEventListener("click", function (){
  wordArray = foodVocab;
  imageArray = foodImages;
  newGame();
})

// Vegetable vocab set
var vegetableVocab = ["laitue", "céleri", "brocoli", "aubergine", "citrouille", "courgette", "frites", "asperge", "oignon", "ail", "concombre", "piment", "poivron", "champignon", "betterave", "artichaut"]

var vegetableImages = ["vocab/food/images/lettuce.jpg", "vocab/food/images/celery.png", "vocab/food/images/broccoli.png", "vocab/food/images/eggplant.jpg", "vocab/food/images/pumpkin.jpeg", "vocab/food/images/zucchini.jpg", "vocab/food/images/frenchfries.gif", "vocab/food/images/asparagus.jpg", "vocab/food/images/onion.png", "vocab/food/images/garlic.jpg", "vocab/food/images/cucumber.jpg", "vocab/food/images/chilipepper.jpeg", "vocab/food/images/bellpepper.png", "vocab/food/images/mushroom.png", "vocab/food/images/beet.jpg", "vocab/food/images/artichoke.gif"]

document.getElementById("vegetables").addEventListener("click", function (){
  wordArray = vegetableVocab;
  imageArray = vegetableImages;
  newGame();
})

// Men's clothing vocab set
var clothingVocab = ["pantalon", "t-shirt", "chemise", "chapeau", "casquette", "cravate", "chaussures", "chaussettes", "jean", "short", "ceinture", "costume", "sandales", "bottes", "gilet", "lunettes"]

var clothingImages = ["vocab/food/images/pants.png", "vocab/food/images/t-shirt.jpg", "vocab/food/images/shirt.png", "vocab/food/images/hat.gif", "vocab/food/images/cap.gif", "vocab/food/images/tie.png", "vocab/food/images/shoes.png", "vocab/food/images/socks.jpg", "vocab/food/images/jeans.gif", "vocab/food/images/shorts.png", "vocab/food/images/belt.jpg", "vocab/food/images/suit.jpg", "vocab/food/images/sandals.png", "vocab/food/images/boots.gif", "vocab/food/images/vest.gif", "vocab/food/images/glasses.png"]

document.getElementById("mensclothing").addEventListener("click", function (){
  wordArray = clothingVocab;
  imageArray = clothingImages;
  newGame();
})

// Reset button reloads window - effectively restarting game
document.getElementById("reset").addEventListener("click", function (){
  location.reload();
})

// Fisher-Yates shuffle function for word/image array (defined as gameArray below)
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// New game me function - run when any of the vocab buttons are clicked
function newGame(){
    clickCounter = 0;
    clickedTiles = [];
    tileIds = [];
    tilesFlipped = 0;
    gameArray = wordArray.concat(imageArray);
    shuffleArray(gameArray);
    // empty the board
    $("#memory_board").empty();
    // loop through the gameArray and deal the cards on the board
    for(var i = 0; i < gameArray.length; i++) {
		  $("#memory_board").append('<div id="tile_'+i+'" data-card='+gameArray[i]+' class="card"></div>');
	   
    } 
    // event handler for when a tile is clicked - function clickOnTile defined below
    $("body").on("click", ".card", function(event){
      clickOnTile(event.target,event.target.getAttribute("data-card"));
    });
  }

function clickOnTile(tile,val){
    // each time tile is clicked - add 1 to click counter
    clickCounter++;
    // change background color on tile
    tile.style.background = 'white';
    // add data-card attribute of the tile to clickedTiles array
    clickedTiles.push(val);
    // add tile id to tileIds array
    tileIds.push(tile.id);
    // if it's a picture, display the image
    if (val.substring(0, 5) == "vocab"){
      tileImage = document.createElement("img");
      tileImage.src = val;
      tile.appendChild(tileImage);
    }
    // if it's a word, display the word
    else if (val.substring(0, 5) != "vocab"){
      tile.innerHTML = val;
    }
    // run the match function
    matchOrNot();
  }

function matchOrNot(){
    // only check for match if there are an even number of clicks (every 2 clicks)
    if (clickCounter % 2 === 0) {
      // if the index values for word/image or image/word from original word/image arrays match and they aren't both -1
      if (((wordArray.indexOf(clickedTiles[0]) === imageArray.indexOf(clickedTiles[1])) && (wordArray.indexOf(clickedTiles[0]) !== -1))
      || (wordArray.indexOf(clickedTiles[1]) === imageArray.indexOf(clickedTiles[0])) && ((wordArray.indexOf(clickedTiles[1])) !== -1)) {
        // empty these 2 arrays - to recheck for new matches on next 2 clicks
        clickedTiles = [];
        tileIds = [];
        // add 2 to flipped tiles count and display that at the top
        tilesFlipped +=2;
        $("h2").html("Tiles Flipped: " + tilesFlipped);
          // if the amount of tiles flipped is 32 (length of game array) - game over
          if (tilesFlipped == gameArray.length){
					alert("Board cleared...bien joué!");
					document.getElementById('memory_board').innerHTML = "";
          $("#flippedtiles").html("Tiles Flipped: 0");
        }
      }
      else {
        // delay flipback function for non-matches so the second card displays before flipping back
				setTimeout(flip2Back, 400);
      }
  }
}

function flip2Back(){
    // reset the color and remove text/pictures from non-matches
    var tile_1 = document.getElementById(tileIds[0]);
    var tile_2 = document.getElementById(tileIds[1]);
    tile_1.style.background = "#AAAAAA";
          tile_1.innerHTML = "";
    tile_2.style.background = "#AAAAAA";
          tile_2.innerHTML = "";
    clickedTiles = [];
          tileIds = [];
        }