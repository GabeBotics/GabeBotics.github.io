var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
var swap;
var questions = ["log(1000)=x","Factor: x^2-625","Given that in 1950 there were 40 cows and in 2000, there were 531 cows, what equation can model this exponential function?","If you have 5 green blocks, 17 blue blocks, and 3 red blocks, what is the percent chance you will chose a red and a green block without replacement?"];
var answers = [["3", "4", "36", "1/3", "5"], ["(X-25)(X+25)", "(X-5)(X+5)", "(X-25)(X-25)", "(X-5)(X-5)", "(X-625)(X+5)"], ["y=(40)(1.05)^x", "y=(40)(x)^1.05t", "y=(40)(.05)^x", "y=(40)(.95)^x", "y=(4)(1.05)^x"], ["2.5%", "2.4%", "3.2%", "14.2%", "25%"]];
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
                if (questions.length < 1){
                    document.getElementById('gameover').innerHTML = "<p>You Win!</p><p>Your Score is " + score + "</p>";
                    show("gameover");
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
        questions = ["log(1000)=x","Factor: x^2-625","Given that in 1950 there were 40 cows and in 2000, there were 531 cows, what equation can model this exponential function?","If you have 5 green blocks, 17 blue blocks, and 3 red blocks, what is the percent chance you will chose a red and a green block without replacement?"];
        answers = [["3", "4", "36", "1/3", "5"], ["(X-25)(X+25)", "(X-5)(X+5)", "(X-25)(X-25)", "(X-5)(X-5)", "(X-625)(X+5)"], ["y=(40)(1.05)^x", "y=(40)(x)^1.05t", "y=(40)(.05)^x", "y=(40)(.95)^x", "y=(4)(1.05)^x"], ["2.5%", "2.4%", "3.2%", "14.2%", "25%"]];
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
    var random = Math.ceil(Math.random()*questions.length) - 1;
    var question = questions[random];
    correctAnswer = answers[random][0];
    document.getElementById("question").innerHTML = question;
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box" + correctPosition).innerHTML = answers[random][0]; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    
    for(i = 1; i < 5; i++){
        if (i != correctPosition){
            var wrongAnswer = answers[random][i];
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            //answers.push(wrongAnswer);
        }
    }
    answers.splice(random, 1)
    questions.splice(random, 1)
}