var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
//if we click on the start/reset
if (getCookie("score") == ""){
    document.cookie = "score = 0";
} else{
    document.getElementById("highScoreValue").innerHTML = getCookie("score");
}
for(i=1; i<5; i++){
document.getElementById("box" + i).onclick = function(){
    //check if we are playing
    if(playing){
            if(this.innerHTML == correctAnswer){
                //correct answer
                score++;
document.getElementById("scorevalue").innerHTML = score;
                //show correct box and hide wrong box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");    
                }, 1000);
                
                //generate new Q&A
                generateQA();
                
            }else{
                //wrong answer
                timeremaining -= 5;
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000)
            }
       }
}
}
document.getElementById("startreset").onclick = function(){
    //if we are playing
    if (playing){
        location.reload();
    } else{

        //change mode to playing
        playing = true;
         
        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
       
       //remove gameover screen
        hide("gameover");
       //show countdown box 
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        //change button to reset
        
        document.getElementById("startreset").innerHTML = "Reset Game";
        
                //start countdown
        startCountdown();
        
         //generate new Q&A
        generateQA();
    }
    
}
//clicking on an answer box
document.getElementById("box1").onclick = function(){
    //check if we are playing
    if(playing){
            if(this.innerHTML == correctAnswer){
                //correct answer
                score++;
document.getElementById("scorevalue").innerHTML = score;
                //show correct box and hide wrong box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");    
                }, 1000);
                
                //generate new Q&A
                generateQA();
                
            }else{
                //wrong answer
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000)
            }
       }
}
//if we click on answer box
    //if we are playing
        //correct? 
            //yes
                //increase score 
                //show correct box for 1 sec
                //generate new Q&A
            //no 
                //show try again box for 1 sec
//functions
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1; 
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining <= 0){//game over
           stopCountdown();
           show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your score is " + score + "</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            if (score >  getCookie("score")){
                document.cookie = "score = " + score;
                document.getElementById("highScoreValue").innerHTML = getCookie("score")
            }
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}
function stopCountdown(){
    clearInterval(action);
}
function hide(Id){
    document.getElementById(Id).style.display = "none";
}
function show(Id){
    document.getElementById(Id).style.display = "block";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//generate question and multiple answers

function generateQA(){
    var question = "Factor: x^2-625";
    var answers = ["(X-25)(X+25)", "(X-5)(X+5)", "(X-25)(X-25)", "(X-5)(X-5)", "(X-625)(X+5)"];
    correctAnswer = [answers[0]];
    document.getElementById("question").innerHTML = question;
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box" + correctPosition).innerHTML = answers[0]; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    
    for(i = 1; i < 5; i++){
        if (i != correctPosition){            
var wrongAnswer = answers[i];
document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}