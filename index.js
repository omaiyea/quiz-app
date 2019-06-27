/////this file contains all the functions that will be used in the quiz app/////

//displays the initial welcome message prompt for user to start quiz 
function renderQuizStart(){
    console.log('renderQuizStart ran');
    //start user's score and question count at 0
    QUESTION_COUNT = 1;
    QUESTIONS_RIGHT = 0;
    $('.js-icon').html(HEADER_IMAGE);
    $('.js-question-and-answer').html(WELCOME_HEADER);
    $('.js-question-and-answer').append(WELCOME_MESSAGE);
    $('.js-question-and-answer').append(START_BUTTON);
}

//iterates through the questions & answers based on the number of the question (QUESTION_COUNT) that the user is on
//question = QUESTIONS_AND_ANSWERS[QUESTION_COUNT - 1] since the array is 0 index
//includes logic covering last question
function handleNextQuestion(){
    $('.questions-and-answers').on('submit', '.js-next-question', (function(event) {
        event.preventDefault();
        console.log('handleNextQuestion ran');
        if(QUESTION_COUNT <= MAX_QUESTIONS){
            $('.js-icon').html(`${(QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].icon)}`);
            $('.js-question-and-answer').html(generateFormHTML());
            handleQuizStatus();
        }else{
            $('.quiz-status').html(''); //remove question status header
            $('.js-icon').html(FINAL_IMAGE);
            $('.js-question-and-answer').html(`<h2>You got ${QUESTIONS_RIGHT}/${MAX_QUESTIONS} right!</h2>`);
            if(QUESTIONS_RIGHT == MAX_QUESTIONS){
                $('.js-question-and-answer').append(ALL_RIGHT);
            }else if(QUESTIONS_RIGHT >= Math.round(MAX_QUESTIONS)/2){ //if over half of answers are right
                $('.js-question-and-answer').append(MOST_RIGHT);
            }else{
                $('.js-question-and-answer').append(MOST_WRONG); //if most answers were wrong
            }
            $('.js-question-and-answer').append(REDO); //onclick in button reloads page
        }
    }));
}

//header letting user know what question they're on, how many questions are left, and how many they've gotten right
function handleQuizStatus(){
    $('.quiz-status').html(`<p class="status"><span>Question: </span>${QUESTION_COUNT} out of ${MAX_QUESTIONS}</p>
    <p class="status"><span>Score: </span>${QUESTIONS_RIGHT} out of ${MAX_QUESTIONS}</p>`);
}

//returns HTML form containing the list of answers for that question 
function generateFormHTML(){
    console.log('Generating form with answers');
    let questionAndAndswerHTML = `<form class="js-answer-options">
    <legend>${(QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].question)}</legend>`;
    for(ansIterator = 0; ansIterator < MAX_ANSWERS; ansIterator++){
        questionAndAndswerHTML += `
        <label><input type="radio" name="${QUESTION_COUNT}" value="${ansIterator}" required="required"> ${QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].potentialAnswers[ansIterator]}</label>`;
    }
    questionAndAndswerHTML += '<input type="submit" value="Submit Answer"></form>';
    return questionAndAndswerHTML;
}

//tells user if they're right or wrong after they've answered the question
//displays correct answer and explanation
//updates the question count and user's score
function handleAnswer(){
    $('.questions-and-answers').on('submit', '.js-answer-options', function(event){
    event.preventDefault();
    console.log('Generating answer screen');
    const userAnswer = $('input[type="radio"]:checked').val();
    //== not === since differebt data type
    if(userAnswer == QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].correctAnswerIndex){
        QUESTIONS_RIGHT++; 
        handleQuizStatus(); //rerun this to update the number of questions user has answered correctly
        $('.js-question-and-answer').html(`<h2>"${QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].potentialAnswers[userAnswer]}" is CORRECT!</h2>`);
    }else{
        $('.js-question-and-answer').html(`<h2>"${QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].potentialAnswers[userAnswer]}" is WRONG!</h2>`);
    }
        
    //why correct answer is correct
    $('.js-question-and-answer').append(`${QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].explanation}`);

    $('.js-question-and-answer').append(NEXT_BUTTON);

    //currently this can go over the max number of questions to help with iteration logic but there are steps above so that this gets reset and overage isn't displayed to user
    QUESTION_COUNT++;
    });
}

function reloadPage(){
    location.reload(true);
}
//end screen to display users results and allow them to retake quiz. also set the QUESTION_COUNT to 0

//callback function when the page loads
//initially renders the quiz app and activates the indivdual functions that handle quiz actions
function handleQuizApp(){
    renderQuizStart();
    handleNextQuestion();
    handleAnswer();
}

//when the page loads, call the callback function
$(handleQuizApp);
