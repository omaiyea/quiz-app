/////this file contains all the functions that will be used in the quiz app/////

//displays the initial welcome message prompt for user to start quiz 
function renderQuizStart(){
    console.log('renderQuizStart ran');
    //start user's score and question count at 0
    QUESTION_COUNT = 1;
    QUESTIONS_RIGHT = 0;
    $('.js-question').html(HEADER_IMAGE);
    $('.js-question').append(WELCOME_MESSAGE);
    $('.js-question').append(START_BUTTON);
}

//iterates through the questions & answers based on the number of the question (QUESTION_COUNT) that the user is on
//question = QUESTIONS_AND_ANSWERS[QUESTION_COUNT - 1] since the array is 0 index
//includes logic covering last question
function handleNextQuestion(){
    $('.questions-and-answers').on('submit', '.js-next-question', (function(event) {
        event.preventDefault();
        console.log('handleNextQuestion ran');
        if(QUESTION_COUNT <= MAX_QUESTIONS){
            $('.js-question').html(`
                <h3>Question ${QUESTION_COUNT}</h3>
                <h2>${(QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].question)}</h2>`);
            $('.js-answer').html(generateFormHTML());
            handleQuizStatus();
        }else{
            $('.quiz-status').html(''); //remove question status header
            $('.js-question').html(`<h2>You got ${QUESTIONS_RIGHT}/${MAX_QUESTIONS} right!</h2>`);
            $('.js-answer').html(`<p>Want to try again?</p>`);
            $('.js-answer').append(REDO_BUTTON); //onclick in button reloads page
        }
    }));
}

//header letting user know what question they're on, how many questions are left, and how many they've gotten right
function handleQuizStatus(){
    $('.quiz-status').html(`<sub>You're on question ${QUESTION_COUNT} out of ${MAX_QUESTIONS}</sub>
    <sub>You've got ${QUESTIONS_RIGHT} out of ${MAX_QUESTIONS} correct</sub>`);
}

//returns HTML form containing the list of answers for that question 
function generateFormHTML(){
    console.log('Generating form with answers');
    let answersHTML = '<form class="js-answer-options">';
    for(ansIterator = 0; ansIterator < MAX_ANSWERS; ansIterator++){
       answersHTML += `
        <label><input type="radio" name="${QUESTION_COUNT}" value="${ansIterator}" required="required">
            ${QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].potentialAnswers[ansIterator]}
        </label><br>`;
    }
    answersHTML += '<input type="submit" value="Submit Answer"></form>';
    return answersHTML;
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
        $('.js-answer').html(`<i class="fas fa-check-circle fa-2x" alt="correct icon"> ${QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].potentialAnswers[userAnswer]}</i>
        <br><h3>Correct!</h3>`);
    }else{
        $('.js-answer').html(`<i class="fas fa-times-circle fa-2x"> ${QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].potentialAnswers[userAnswer]}</i>
        <br><h3>Wrong!</h3>`);
    }
        
    //why correct answer is correct
    $('.js-answer').append(`${QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].explanation}`);

    $('.js-answer').append(NEXT_BUTTON);

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
