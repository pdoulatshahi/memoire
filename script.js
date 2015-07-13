var foodVocab = ["la pomme", "la banane", "une orange", "les raisins", "un avocat", "le citron", "le citron vert", "la pastèque", "la mangue", "la poire", "la framboise", "la fraise", "la myrtille", "la cerise", "un ananas", "le pamplemousse"]

var foodImages = ["vocab/food/images/apple.jpeg", "vocab/food/images/banana.jpg", "vocab/food/images/orange.png", "vocab/food/images/grapes.jpg", "vocab/food/images/avocado.jpg", "vocab/food/images/lemon.png", "vocab/food/images/lime.png", "vocab/food/images/watermelon.jpg", "vocab/food/images/mango.png", "vocab/food/images/pear.png", "vocab/food/images/raspberry.png", "vocab/food/images/strawberry.png", "vocab/food/images/blueberry.gif", "vocab/food/images/cherry.png", "vocab/food/images/pineapple.jpeg", "vocab/food/images/grapefruit.png"]

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
    clickCounter = 0;
    output = [];
    clickedTiles = [];
    tileIds = [];
    tilesFlipped = 0;
    food = foodVocab.concat(foodImages);
    shuffleArray(food);
    for(var i = 0; i < food.length; i++) {
		output += '<div id="tile_'+i+'" onclick="clickOnTile(this,\''+food[i]+'\')"></div>'
	  }
	  document.getElementById('memory_board').innerHTML = output;
}

function clickOnTile(tile,val){
    this.clickCounter++;
    tile.style.background = 'green';
    if (val.substring(0, 5) == "vocab"){
      var tileImage = document.createElement("img");
      tileImage.src = val;
      tile.appendChild(tileImage);
      clickedTiles.push(val);
      tileIds.push(tile.id);
    }
    else if (val.substring(0, 5) != "vocab"){
      tile.innerHTML = val;
      clickedTiles.push(val);
      tileIds.push(tile.id);
    }
    if (clickCounter === 2) {
      if (((foodVocab.indexOf(clickedTiles[0]) === foodImages.indexOf(clickedTiles[1])) && (foodVocab.indexOf(clickedTiles[0]) !== -1))
      || (foodVocab.indexOf(clickedTiles[1]) === foodImages.indexOf(clickedTiles[0])) && ((foodVocab.indexOf(clickedTiles[1])) !== -1)) {
      tilesFlipped +=2;
      clickedTiles = [];
      clickCounter = 0;
      $("#"+tileIds[0]).css("background", "blue");
      $("#"+tileIds[1]).css("background", "blue");
      }
      else {
      clickedTiles = [];
      clickCounter = 0;
        if ($("#"+tileIds[0]).find('img').length) {
        $("#"+tileIds[0]).remove()
        }
      else {
        ($("#"+tileIds[0]).text(""))
        }
      if ($("#"+tileIds[1]).find('img').length) {
        $("#"+tileIds[1]).remove()
        }
      else {
        ($("#"+tileIds[1]).text(""))
        }
      tileIds = [];
      }
    }
  }


newGame()
