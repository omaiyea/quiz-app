//this file contains all the functions that will be used in the quiz app

//displays the initial welcome message and ability for user to start quiz 
function renderQuizStart(){
    console.log('renderQuizStart ran');
    $('.js-question').html(HEADER_IMAGE);
    $('.js-question').append(WELCOME_MESSAGE);
    $('.js-question').append(START_BUTTON);
}

//iterates through the questions based on users QUESTION_COUNT
//returns the question that corresponds to QUESTION_COUNT and its potential answers

//QUESTION_COUNT - 1 since array starts at 0
function handleNextQuestion(){
    $('.questions-and-answers').on('submit', '.js-next-question', (function(event) {
        event.preventDefault();
        console.log('handleNextQuestion ran');
        if(QUESTION_COUNT <= MAX_QUESTIONS){
            $('.js-question').html(`
                <h3>Question ${QUESTION_COUNT}</h3>
                <h2>${(QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].question)}</h2>`);
            $('.js-answer').html(generateFormHTML());
        }else{
            $('.js-question').html(`<h2>You got 5/10 right!</h2>
                <p>You remembered some stuff, but not all. Hey, there’s a lot out there!</p><br>
                <p>Want to try again?</p>`);
        }
        $('.js-quiz-status').html(`<sub>${QUESTION_COUNT} out of ${MAX_QUESTIONS} questions</sub>
        <sub>${QUESTIONS_RIGHT} out of ${MAX_QUESTIONS} correct</sub>`);
    }));
    //if user is at the last question, instead go to the end screen
}

//returns HTML form containing the list of answers for that question 
function generateFormHTML(){
    console.log('Generating form with answers');
    //harding 4 since requirement is 4 options per question
    let answersHTML = '<form class="js-answer-options">';
    for(ansIterator = 0; ansIterator < 4; ansIterator++){
       answersHTML += `
        <label><input type="radio" name="${QUESTION_COUNT}" value="${ansIterator}" required="required">
            ${QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].potentialAnswers[ansIterator]}
        </label><br>`;
    }
    answersHTML += '<input type="submit" value="Submit Answer"></form>';
    return answersHTML;
}

//tell user if they're right or wrong and display correct answer and explanation
//also update the question count and user's score
//handle last question here? 
function handleAnswer(){
   // $('.questions-and-answers').on('submit', '.js-answer-options', (function(event) {
       $('.questions-and-answers').on('submit', '.js-answer-options', function(event){
        event.preventDefault();
        console.log('Generating answer screen');
      //  let userAnswer = $('input[name="0"]:checked', '.js-answer-options').val();
        //need to make sure they entered a value first
        const userAnswer = $('input[type="radio"]:checked').val();

        //== not === since differebt data type
        if(userAnswer == QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].correctAnswerIndex){
            QUESTIONS_RIGHT++; 
            $('.js-quiz-status').html(`<sub>${QUESTION_COUNT} out of ${MAX_QUESTIONS} questions</sub>
            <sub>${QUESTIONS_RIGHT} out of ${MAX_QUESTIONS} correct</sub>`);
            $('.js-answer').html(`<i class="fas fa-check-circle fa-2x" alt="correct icon">${QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].potentialAnswers[userAnswer]}</i>
            <br><h3>Correct!</h3>`);
        }else{
            $('.js-answer').html(`<i class="fas fa-times-circle fa-2x">${QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].potentialAnswers[userAnswer]}</i>
            <br><h3>Wrong!</h3>`);
        }
        
        //why correct answer is correct
        $('.js-answer').append(`${QUESTIONS_AND_ANSWERS[QUESTION_COUNT-1].explanation}`);

        $('.js-answer').append(NEXT_BUTTON);
        QUESTION_COUNT++;
    });
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
