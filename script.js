var foodVocab = ["pomme", "banane", "orange", "raisins", "avocat", "citron", "prune", "pastèque", "mangue", "poire", "framboise", "fraise", "myrtille", "cerise", "ananas", "abricot"]

var foodImages = ["vocab/food/images/apple.jpg", "vocab/food/images/banana.jpg", "vocab/food/images/orange.png", "vocab/food/images/grapes.jpg", "vocab/food/images/avocado.jpg", "vocab/food/images/lemon.jpg", "vocab/food/images/plum.jpg", "vocab/food/images/watermelon.jpg", "vocab/food/images/mango.png", "vocab/food/images/pear.png", "vocab/food/images/raspberry.png", "vocab/food/images/strawberry.jpg", "vocab/food/images/blueberry.gif", "vocab/food/images/cherry.png", "vocab/food/images/pineapple.jpeg", "vocab/food/images/apricot.jpg"]

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
		$("#memory_board").append('<div id="tile_'+i+'" data-food='+food[i]+' class="card"></div>');
	  }
    $("body").on("click", ".card", function(event){
      clickOnTile(event.target,event.target.getAttribute("data-food"));
    });
  }

function clickOnTile(tile,val){
    clickCounter++;
    tile.style.background = 'white';
    console.log(val.substring(0,5));
    if (val.substring(0, 5) == "vocab"){
      tileImage = document.createElement("img");
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
    matchOrNot();
  }

function matchOrNot(tile,val){
    if (clickCounter % 2 === 0) {
      if (((foodVocab.indexOf(clickedTiles[0]) === foodImages.indexOf(clickedTiles[1])) && (foodVocab.indexOf(clickedTiles[0]) !== -1))
      || (foodVocab.indexOf(clickedTiles[1]) === foodImages.indexOf(clickedTiles[0])) && ((foodVocab.indexOf(clickedTiles[1])) !== -1)) {
        clickedTiles = [];
        tileIds = [];
        tilesFlipped +=2;
        $("#flippedtiles").html("Tiles Flipped: " + tilesFlipped);
          if (tilesFlipped == food.length){
					alert("Board cleared... generating new board");
					document.getElementById('memory_board').innerHTML = "";
          $("#flippedtiles").html("Tiles Flipped: 0");
					newGame();
        }
      }
      else {
        function flip2Back(){
				    var tile_1 = document.getElementById(tileIds[0]);
				    var tile_2 = document.getElementById(tileIds[1]);
				    tile_1.style.background = "#AAAAAA";
            	    tile_1.innerHTML = "";
				    tile_2.style.background = "#AAAAAA";
            	    tile_2.innerHTML = "";
				    clickedTiles = [];
            	    tileIds = [];
				}
				setTimeout(flip2Back, 300);
      }
  }
}

newGame()
