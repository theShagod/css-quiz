if (document.getElementById("start-button")){
  document.getElementById("start-button").addEventListener("click", ()=>{
    console.log("The game starting...")
    window.location.href = "./question.html";
  })
}


function toGameUI(){

}

function toStartUI(){

}

function toScoreUI(){
/*Adds score and the time it was accomplished*/
}

function toScoreBoardUI(){

}

function generateQuestionUI(selected){
  document.getElementById("question").innerText = Object.keys(qna)[selected];

}
function scrambleAnswers(selected){
  /*
  scrambleAnswers(0) => an array of length 4, with different positions
  */
  qSelected = Object.keys(qna)[selected];
  scrambled = []
  let wAnswers = [...qna[qSelected].wrongAnswers];
  let rAnswer = qna[qSelected].rightAnswer;
  wAnswers.unshift(rAnswer);
  answers = wAnswers
  for(let i = 1; i < randomNum(5); i++){ //for 1 to 4
    lastItem = answers.pop()
    answers.unshift(lastItem)
  }
  return answers
}
function randomNum(range){
  //picks random number based on the number of questions remaining
  //randomNum(6) =>generates random number because 0 to 5
  return Math.floor(Math.random()*(range))
}
function generateAnswersUI(selected){
  let answers = scrambleAnswers(selected);
  let answerSection = document.getElementById("answers");
  let container1 = generate2Choices(0,1,answers,selected);
  container1.setAttribute("id","container-1");
  let container2 = generate2Choices(2,3,answers,selected);
  container2.setAttribute("id","container-2");
  answerSection.replaceChild(container1, document.getElementById("container-1"))
  answerSection.replaceChild(container2, document.getElementById("container-2"))

}
function generate2Choices(choice1, choice2, answers, selected){
  let qSelected = Object.keys(qna)[selected];
  let container = document.createElement("div");
  container.classList.add("container", "d-flex", "justify-content-center", "py-2");
  let button1 = generateButton(choice1, answers, selected);
  let button2 = generateButton(choice2, answers, selected);
  container.append(button1);
  container.append(button2);
  return container;
}
function generateButton(choice, answers, selected){
  let button = document.createElement("button");
  button.setAttribute("id","answer-"+choice);
  button.setAttribute("type","button");
  button.addEventListener("click", ()=>{
    if(button.innerText == qna[qSelected].rightAnswer && !shouldEndGame()){
      correctAnswerFound = true;
      console.log("Correct!")
      button.classList.remove("btn-secondary")
      button.classList.add("btn-success")
      addScore();
    } else if (!correctAnswerFound && !shouldEndGame()){
        console.log("Wrong!")
        button.classList.remove("btn-secondary")
        button.classList.add("btn-danger")
        timerTick(10)
      } else if (shouldEndGame()){
        endGame();
      }
  })
  button.classList.add("btn","col-6","col-md-4","btn-secondary","mx-2");
  button.innerText = answers[choice];
  console.log(button.innerText)
  return button
}
function generateQnAUI(){
  let selected = randomNum(10);
  generateQuestionUI(selected);
  generateAnswersUI(selected);
  updateQuestion();
}
function shouldEndGame(){ //checks if the game should end and ends the game if so
  var timer = document.getElementById("timer");
  if (parseInt(timer.innerText) <= 0) {
    return true;
  }
  return false;
}
function updateQuestion(){
  questionNum+= 1;
  document.getElementById("question-num").innerText = "Question " + questionNum;
}
function timerTick(amount=1){
  if (!shouldEndGame()){
    var timer = document.getElementById("timer");
    timer.innerText = parseInt(timer.innerText) - amount
  }else{
    endGame();
  }
}
function saveScore(){
  //put score in localStorage
  var newscore = document.getElementById("score").innerText
  var oldscores = JSON.parse(localStorage.getItem("scores"))
  if(oldscores){
    localStorage.setItem("scores", JSON.stringify([newscore,...oldscores]));
  } else {
    localStorage.setItem("scores",JSON.stringify([newscore]))
  }
}
function addScore(){
  var score = document.getElementById("score");
  score.innerText = parseInt(score.innerText) + 1
}

const qna = {
  "Which of the following selector matches the name of any element type?": {
    wrongAnswers: ["The Type Selector","The Descendant Selector","The Class Selector"],
    rightAnswer: "The Universal Selector"
  },
  "Which of the following defines a relative measurement for the height of a font in em spaces?": {
    wrongAnswers: ["%","cm","ex"],
    rightAnswer: "em"
  },
  "Which of the following defines 1% of viewport width?": {
    wrongAnswers: ["px","vh","vmin"],
    rightAnswer: "vw"
  },
  "Which of the following property is used to control the repetition of an image in the background?": {
    wrongAnswers: ["background-color","background-image","background-position"],
    rightAnswer: "background-repeat"
  },
  "Which of the following property is used to underline, overline, and strikethrough text?": {
    wrongAnswers: ["text-indent","text-align","text-transform"],
    rightAnswer: "text-decoration"
  },
  "Which of the following property of a anchor element signifies unvisited hyperlinks?": {
    wrongAnswers: [":visited",":hover",":active"],
    rightAnswer: ":link"
  },
  "Which of the following property of a anchor element signifies an element on which the user is currently clicking?": {
    wrongAnswers: [":visited",":hover","link"],
    rightAnswer: ":active"
  },
  "Which of the following property changes the color of left border?": {
    wrongAnswers: [":border-top-color",":border-right-color",":border-bottom-color"],
    rightAnswer: "border-left-color"
  },
  "Which of the following property specifies whether a long point that wraps to a second line should align with the first line or start underneath the start of the marker of a list?": {
    wrongAnswers: ["list-style-type","list-style-image","list-style"],
    rightAnswer: "list-style-position"
  },
  "Which of the following value of cursor shows it as an arrow?": {
    wrongAnswers: ["crosshair","pointer","move"],
    rightAnswer: "default"
  },

}
var correctAnswerFound = false;
var questionNum = 0;

if (document.getElementById("question")){
  generateQnAUI()
  self.addEventListener("click",()=>{
    if (correctAnswerFound){
      document.getElementById("answer-1").classList.add("disabled")
      document.getElementById("answer-2").classList.add("disabled")
      document.getElementById("answer-3").classList.add("disabled")
      document.getElementById("answer-0").classList.add("disabled")
      document.getElementById("nextbutton").classList.remove("disabled")

    }
  })
  document.getElementById("nextbutton").addEventListener("click", ()=>{
    if (correctAnswerFound && !shouldEndGame()){
      generateQnAUI();
      correctAnswerFound = false;
      document.getElementById("nextbutton").classList.add("disabled")
    }
  })
  var isSaveScore = false;
  var interval = setInterval(()=>{
    if(!shouldEndGame()){
      timerTick();
    }else{
      endGame();
    }
  }, 1000);
}
function endGame(){
  if(!isSaveScore){
    saveScore();
    isSaveScore = true;
  }
  window.location.href = "./endGame.html";
}
if (document.getElementById("latestscore")){
  console.log(JSON.parse(localStorage.getItem("scores"))[0])
  document.getElementById("latestscore").innerText = JSON.parse(localStorage.getItem("scores"))[0]
}

if (document.getElementById("scoreboard-score")){
  var scoreboardVals = document.getElementById("scoreboard-score");
  var p = scoreboardVals.getElementsByTagName("p");
  var div = scoreboardVals.getElementsByTagName("div");
  for (let i = p.length-1; i >= 0; i--){
    p[i].remove();
  }
  var scores = JSON.parse(localStorage.getItem("scores"));
  if (scores){
    let sorted_scores =scores.sort((a, b)=> (b - a));
    for (let i = 0; i < scores.length; i++){
      let ele = document.createElement("p");
      ele.innerText = scores[i];
      scoreboardVals.append(ele);
    }

  }
}
