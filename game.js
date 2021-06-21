var gamePattern = []; //will contain computer generated pattern

var buttonColours = ["red", "blue", "green", "yellow"]; //available colors/buttons

var userClickedPattern = []; //will contain the user clicked pattern

var level = 0;

var started = false;

//starts the game by making the user press a key
$(document).keypress(function(){
  if(started !== true){
    started = true;
    nextSequence();
  }
});

//creates a randomly generated pattern and adds it to the gamePattern array.
function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //animation for the button pressed by the computer
  playSound(randomChosenColour);

  $("h1").text("Level " + ++level); //increases the game level
}

//behavior for clicking on button
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id"); //return the id of clicked button
  userClickedPattern.push(userChosenColour); //add the id/name of the button to the userClickedPattern array;

  playSound(userChosenColour);//sends clicked button to playSound function
  animatePress(userChosenColour);//sends clicked button to animatePress function
  checkAnswer(userClickedPattern.length-1); //sends the array length of UserClickedPattern to checkAnswer()
});

//function to check the user answers to the computer generated pattern
function checkAnswer(currentLevel){
  //checks the last index color in the array clicked by the user and by the computer are the same
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
        //checks if the user has finished inputing a pattern.
        if (gamePattern.length === userClickedPattern.length){
          setTimeout(function () {
          nextSequence(); //moves on to the next sequence
          }, 1000);
          userClickedPattern = []; //resets user pattern
        }
  }
  //if the user gets the pattern wrong, the following code will run.
  else {
    console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");

    //adds and removes the class game-over to apply the css effect
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key To Restart");

    startOver();
  }
}

//switch function to play the sounds of the buttons pressed by user and by the computer pattern.
function playSound(name){
switch (name)
  {
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();

    break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();

    break;

    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();

    break;

    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();

    break;

  default: console.log(randomChosenColour);
  }
}

//animates the button when pressed by the user
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
  $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//restarts the game once the user has lost by recalibrating things to their starting values.
function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
