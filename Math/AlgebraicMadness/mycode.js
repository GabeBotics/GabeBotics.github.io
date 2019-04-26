//if we click on start/reset
var gamePlay = false;
var correctBox = "null";
var incorrectBoxes = ["null"];
var allBoxes = ["box1", "box2", "box3", "box4"];
var randomInt;
var score
document.getElementById("startreset").onclick = function(){

    //if we are playing
    if (gamePlay){
        //reload page
        location.reload();
    } else{
        //if we are not playing
            //set score to 0
        gamePlay = true; 
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
            //change from start to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
            //show countdown box
        document.getElementById("timeremaining").style.display = "block";
            //reduce time by 1sec every sec in loops
        var t = 60;
        var time = setInterval(function(){
        t--;
        time = t;
        document.getElementById("timeremainingvalue").innerHTML = t;  
        if (t == 0){
            clearInterval(time);
            document.getElementById("timeremaining").style.display = "none";
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p> <p>Your Score is " + score + "</p>"
            document.getElementById("gameover").style.display = "block";
        }    
        }, 1000);
        //generate new Q&A
        newQuestion();
    }
}
function newQuestion(){
    var random1 = Math.round(1 + 9*Math.random());
    var random2 = Math.round(1 + 9*Math.random());
    var answer = random1*random2;
    var randomInt = Math.round(4*Math.random());
    document.getElementById("question").innerHTML = random1 + "x" + random2;
    if (randomInt == 1){
        correctBox = "box1";
        incorrectBoxes = ["box2", "box3", "box4"];
        document.getElementById("box1").innerHTML = answer;
        document.getElementById("box2").innerHTML = Math.round(90*Math.random() + 1);
        document.getElementById("box3").innerHTML = Math.round(90*Math.random() + 1);
        document.getElementById("box4").innerHTML = Math.round(90*Math.random() + 1);
    } else if (randomInt == 2){
        correctBox = "box2";
        incorrectBoxes = ["box1", "box3", "box4"];
        document.getElementById("box2").innerHTML = answer;
        document.getElementById("box1").innerHTML = Math.round(90*Math.random() + 1);
        document.getElementById("box3").innerHTML = Math.round(90*Math.random() + 1);
        document.getElementById("box4").innerHTML = Math.round(90*Math.random() + 1);
    } else if (randomInt == 3){
        correctBox = "box3";
        incorrectBoxes = ["box1", "box2", "box4"];
        document.getElementById("box3").innerHTML = answer;
        document.getElementById("box2").innerHTML = Math.round(90*Math.random() + 1);
        document.getElementById("box1").innerHTML = Math.round(90*Math.random() + 1);
        document.getElementById("box4").innerHTML = Math.round(90*Math.random() + 1);
    } else {
        correctBox = "box4";
        incorrectBoxes = ["box1", "box2", "box3"];
        document.getElementById("box4").innerHTML = answer;
        document.getElementById("box2").innerHTML = Math.round(90*Math.random() + 1);
        document.getElementById("box3").innerHTML = Math.round(90*Math.random() + 1);
        document.getElementById("box1").innerHTML = Math.round(90*Math.random() + 1);
    }
            document.getElementById(correctBox).onclick = function(){
            if (gamePlay){
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                document.getElementById("correct").style.display = "block";
                var correctDelay = setTimeout(function(){
                    document.getElementById("correct").style.display = "none";
                }, 1000);
                newQuestion();
            }
            document.getElementById(incorrectBoxes[0]).onclick = function(){
             document.getElementById("wrong").style.display = "block";
            var wrongDelay = setTimeout(function(){
                document.getElementById("wrong").style.display = "none";
                }, 1000);     
            }
         document.getElementById(incorrectBoxes[1]).onclick = function(){
             document.getElementById("wrong").style.display = "block";
            var wrongDelay = setTimeout(function(){
                document.getElementById("wrong").style.display = "none";
                }, 1000);     
            }
          document.getElementById(incorrectBoxes[2]).onclick = function(){
             document.getElementById("wrong").style.display = "block";
            var wrongDelay = setTimeout(function(){
                document.getElementById("wrong").style.display = "none";
                }, 1000);     
            }    
        }
}

