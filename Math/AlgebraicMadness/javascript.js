var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
var swap;
questions = ["log(1000)=x","Factor: x^2-625","Given that in 1950 there were 40 cows and in 2000, there were 531 cows, what equation can model this exponential function?","If you have 5 green blocks, 17 blue blocks, and 3 red blocks, what is the percent chance you will chose a red and a green block without replacement?", "(5/3)x+7=12", "Which subset of real numbers does -63829 not fall under?", "Find the amount of time that has passed given the half life of a new substance called Gabonium is 567 years and that it started with 40 mg and it now has 32mg. Round your answer to the nearest hundredth.", "[4  5  56] - [2  3 17]", "Create a polynomial with roots 3, 8, and -1", "What is the most specific subset of real numbers that -5 belongs in?", "Find the y-intercept of the given equation: Y - 4 = ½(X + 2)", "Find CD if C = [2 7] and D = [5].", "Classify the given polynomial based off number of terms and degree: X^5 + 2X^3 + 6X - X^5", "Find the solution to the system of equations: X = 2Y - 4. Y = 5X + 7.", "Solve: log576", "9 of the Latin students had quiz scores lower than a 90 when the mean of the class is 100 and the scores were normally distributed. How many students are in the class if the standard deviation is 5?", "Factor completely: X^3 - 216", "There are 250 students that go to Oklahoma High, and 100 of them take Algebra 2. At its rival school, Dilla Academy, there are 400 students, and 200 of them take Algebra 2. What is the probability that a random student goes to Oklahoma High given that they take algebra 2?", "A website is requesting a 4 character password made of either capital letters or numbers 0-9, assuming no character can repeat, how many unique passwords can be created?", "Solve the following system of equations: 10x + 13y = 26. y = 10x - 10.", "Maximize the equation given the following constraints: y - 1/3x = 25. y>/=2. x</=13. x + y >/= 36", "Classify the following function as continuous, discontinuous, or discrete: F(x)= 9x + 2. x != -3", "What subset of real numbers is the following contained in?(Cube root of -3)", "Solve the following for x, use logarithms: 3(b^x + c)=2a", "Identify the roots in the following equation: X^3 - 27"];
answers = [["3", "4", "36", "1/3", "5"], ["(X-25)(X+25)", "(X-5)(X+5)", "(X-25)(X-25)", "(X-5)(X-5)", "(X-625)(X+5)"], ["y=(40)(1.05)^x", "y=(40)(x)^1.05t", "y=(40)(.05)^x", "y=(40)(.95)^x", "y=(4)(1.05)^x"], ["2.5%", "2.4%", "3.2%", "14.2%", "25%"], ["3", "9", "5", "2", "7"],["Whole", "Real", "Integers", "Rational", "None"], ["182.53", "182.5", "170", "182.54", "170.54"], ["[2  2  39]", "[6 8 73]", "[2 8 39]", "[2 2 38]", "[8 2 39]"], ["X^3 - 10X^2 + 13X + 24", "X^3 + 10X^2 + 13X - 24", "X^3 + 10X^2 + 13X + 24", "X^3 - 10X^2 + 16X + 24", "X^3 - 10X^2 - 13X + 24"], ["Integers", "Whole", "Rational", "Natural", "Irrational"], ["5", "1", "4", "3", "6"], ["Invalid", "[24]", "[10 14]", "[10]", "[35]"], ["Cubic Binomial", "Quartic Trinomial", "Quadratic Binomial", "Quintic Binomial", "Quintic Monomial"], ["(-10/9, 13/9)", "(6/5, 13/5)", "(-24/19, -107/19)", "No Solution", "Infinite Solutions"], ["2.76", "3", "1", "-1", "2"], ["360", "120", "450", "400", "130"], ["(X - 3)(X^2 + 3X + 9)", "(X + 3)(X + 3X + 9)", "(X - 3)(X^2 - 3X + 9)", "(X - 3)(X^2 - 3X - 9)", "(X + 3)(X^2 - 3X - 9)"], ["1/3", "1/2", "5/6", "2/3", "1/6"], ["1413720", "4.03x10^26", "358800", "1256640", "1335180"], ["(39/35, 8/7)", "(1, 3/2)","(6, 13)", "(24, 7)", "(39, 1)"], ["(13, 88/3)", "(14, 30)", "(88/3, 13)", "(13, 30)", "(14, 88/3)"], ["Discontinuous", "Continuous", "Discrete", "Undiscrete", "No Answer"], ["Irrational", "Rational", "Integers", "Whole", "Natural"], ["x=logb(2a/3 - c)", "x=logb(3a/2 - c)", "x=logc (2b/3 -a)", "x=ln(2a/3 - c)", "x=log(2a-3c)"], ["3, (-3 +- sqrt (-3))/2", "0, 3, -9", "0, -3, 9", "0, -3, -9", "3, (-3 +- sqrt(-3))/9"]];
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
                timeremaining -= 10;
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
        questions = ["log(1000)=x","Factor: x^2-625","Given that in 1950 there were 40 cows and in 2000, there were 531 cows, what equation can model this exponential function?","If you have 5 green blocks, 17 blue blocks, and 3 red blocks, what is the percent chance you will chose a red and a green block without replacement?", "(5/3)x+7=12", "Which subset of real numbers does -63829 not fall under?", "Find the amount of time that has passed given the half life of a new substance called Gabonium is 567 years and that it started with 40 mg and it now has 32mg. Round your answer to the nearest hundredth.", "[4  5  56] - [2  3 17]", "Create a polynomial with roots 3, 8, and -1", "What is the most specific subset of real numbers that -5 belongs in?", "Find the y-intercept of the given equation: Y - 4 = ½(X + 2)", "Find CD if C = [2 7] and D = [5].", "Classify the given polynomial based off number of terms and degree: X^5 + 2X^3 + 6X - X^5", "Find the solution to the system of equations: X = 2Y - 4. Y = 5X + 7.", "Solve: log576", "9 of the Latin students had quiz scores lower than a 90 when the mean of the class is 100 and the scores were normally distributed. How many students are in the class if the standard deviation is 5?", "Factor completely: X^3 - 216", "There are 250 students that go to Oklahoma High, and 100 of them take Algebra 2. At its rival school, Dilla Academy, there are 400 students, and 200 of them take Algebra 2. What is the probability that a random student goes to Oklahoma High given that they take algebra 2?", "A website is requesting a 4 character password made of either capital letters or numbers 0-9, assuming no character can repeat, how many unique passwords can be created?", "Solve the following system of equations: 10x + 13y = 26. y = 10x - 10.", "Maximize the equation given the following constraints: y - 1/3x = 25. y>=2. x<=13. x + y >= 36", "Classify the following function as continuous, discontinuous, or discrete: F(x)= 9x + 2. x != -3", "What subset of real numbers is the following contained in?(Cube root of -3)", "Solve the following for x, use logarithms: 3(b^x + c)=2a", "Identify the roots in the following equation: X^3 - 27"];
        answers = [["3", "4", "36", "1/3", "5"], ["(X-25)(X+25)", "(X-5)(X+5)", "(X-25)(X-25)", "(X-5)(X-5)", "(X-625)(X+5)"], ["y=(40)(1.05)^x", "y=(40)(x)^1.05t", "y=(40)(.05)^x", "y=(40)(.95)^x", "y=(4)(1.05)^x"], ["2.5%", "2.4%", "3.2%", "14.2%", "25%"], ["3", "9", "5", "2", "7"],["Whole", "Real", "Integers", "Rational", "None"], ["182.53", "182.5", "170", "182.54", "170.54"], ["[2  2  39]", "[6 8 73]", "[2 8 39]", "[2 2 38]", "[8 2 39]"], ["X^3 - 10X^2 + 13X + 24", "X^3 + 10X^2 + 13X - 24", "X^3 + 10X^2 + 13X + 24", "X^3 - 10X^2 + 16X + 24", "X^3 - 10X^2 - 13X + 24"], ["Integers", "Whole", "Rational", "Natural", "Irrational"], ["5", "1", "4", "3", "6"], ["Invalid", "[24]", "[10 14]", "[10]", "[35]"], ["Cubic Binomial", "Quartic Trinomial", "Quadratic Binomial", "Quintic Binomial", "Quintic Monomial"], ["(-10/9, 13/9)", "(6/5, 13/5)", "(-24/19, -107/19)", "No Solution", "Infinite Solutions"], ["2.76", "3", "1", "-1", "2"], ["360", "120", "450", "400", "130"], ["(X - 3)(X^2 + 3X + 9)", "(X + 3)(X + 3X + 9)", "(X - 3)(X^2 - 3X + 9)", "(X - 3)(X^2 - 3X - 9)", "(X + 3)(X^2 - 3X - 9)"], ["1/3", "1/2", "5/6", "2/3", "1/6"], ["1413720", "4.03x10^26", "358800", "1256640", "1335180"], ["(39/35, 8/7)", "(1, 3/2)","(6, 13)", "(24, 7)", "(39, 1)"], ["(13, 88/3)", "(14, 30)", "(88/3, 13)", "(13, 30)", "(14, 88/3)"], ["Discontinuous", "Continuous", "Discrete", "Undiscrete", "No Answer"], ["Irrational", "Rational", "Integers", "Whole", "Natural"], ["x=logb(2a/3 - c)", "x=logb(3a/2 - c)", "x=logc (2b/3 -a)", "x=ln(2a/3 - c)", "x=log(2a-3c)"], ["3, (-3 +- sqrt (-3))/2", "0, 3, -9", "0, -3, 9", "0, -3, -9", "3, (-3 +- sqrt(-3))/9"]];
        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
       
       //remove gameover screen
        hide("gameover");
       //show countdown box 
        show("timeremaining");
        timeremaining = 240;
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