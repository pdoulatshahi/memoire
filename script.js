var foodVocab = ["la pomme", "la banane", "l'orange", "les raisins", "l'avocat", "le citron", "le citron vert", "la pastèque", "la mangue", "la poire", "la framboise", "la fraise", "la myrtille", "la cerise", "l'ananas" , "le pamplemousse"]

var foodImages = ["vocab/food/images/apple.jpeg", "vocab/food/images/banana.jpg", "vocab/food/images/orange.png", "vocab/food/images/grapes.jpg", "vocab/food/images/avocado.jpg", "vocab/food/images/lemon.png", "vocab/food/images/lime.png", "vocab/food/images/watermelon.jpg", "vocab/food/images/mango.png", "vocab/food/images/pear.png", "vocab/food/images/raspberry.png", "vocab/food/images/strawberry.png", "vocab/food/images/blueberry.gif", "vocab/food/images/cherry.png", "vocab/food/images/pineapple.jpeg", "vocab/food/images/grapefruit.png"]

var tilesFlipped = 0;
var clickCounter = 0;
var output = [];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function newGame(){
    var tilesFlipped = 0;
    var food = foodVocab.concat(foodImages);
    shuffleArray(food);
    for(var i = 0; i < food.length; i++) {
		output += '<div id="tile_'+i+'" onclick="clickOnTile(this,\''+food[i]+'\')"></div>';
	  }
	  document.getElementById('memory_board').innerHTML = output;
}

function clickOnTile(tile,val){
    clickCounter++;
    tile.style.background = '#DDD';
		tile.innerHTML = val;
    if (clickCounter % 2 === 0) {
      if (foodVocab.indexOf(val) === foodImages.indexOf(val)){
        console.log("test")
      }
    }
}


newGame();
