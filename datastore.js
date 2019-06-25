//this file stores the variables that will be used for this quiz app

const MAX_QUESTIONS = 10;

//variables for home screen
const HEADER_IMAGE = `<i class="fas fa-flask fa-5x" id="headerImg" alt="flask icon"></i>`;
const WELCOME_MESSAGE = `
<p>Whether you're taking an intro level science class now or 
haven't taken a science class for years-- let's see if you remember 
some key basic facts with this quiz! We'll take you through 
biology, chemistry, physics, environmental science, and general science in 10
questions.<br><br>When you're ready, click the button to start!</p>`;
const START_BUTTON = `<form class="js-next-question"> 
<input type="submit" value="Start Quiz"/>
</form>`;

//variables for quiz status counts 
let QUESTION_COUNT = 1;  // what question user is on
let QUESTIONS_RIGHT = 0; // how many questions user got right

//variables for questions and answers
const NEXT_BUTTON = `<form class="js-next-question"><input type="submit" value="Next Question"></form>`;

/*//NOTE: any change to a question or answer may require a change in all three data structures below
//is it better to use one data structure for both questions and answers or separate them like this? 
//

//array of objects for questions
const QUESTIONS = [
    {qid: 1, question: "Which of the following is a step in the scientific method?"},
    {qid: 2, question: "Name one of the main rock classifications."}
  //  {qid: 2, question: "Which of the following are carbohydrates?", correctAnswer: "C"}
]

//array of objects to store potential answers
//qid corresponds to question
const POSSIBLE_ANSWERS = [
    {qid: 1, aid: "A", answer: "Make an observation"}, 
    {qid: 1, aid: "B", answer: "Form a hypothesis"},
    {qid: 1, aid: "C", answer: "Iterate on your hypothesis based on the results of a reproducible experiment"},
    {qid: 1, aid: "D", answer: "All of the above"}, 
    {qid: 2, aid: "A", answer: "The Beatles"}, 
    {qid: 2, aid: "B", answer: "Sedimentary"},
    {qid: 2, aid: "C", answer: "Sedentary"},
    {qid: 2, aid: "D", answer: "Geodude"}, 
]

const CORRECT_ANSWER = [
    {qid: 1, aid: "A", 
    explanation: `<p>All of these steps (and more) are involved in the scientific method. 
    As a refresher, the scientific method is "[a] method to collect measurable, 
    empirical evidence in an experiment related to a hypothesis... 
    the results aiming to support or contradict a theory" (<a href="https://www.livescience.com/20896-science-scientific-method.html" target="_blank">source</a>).</p>`}, 
    {qid: 2, aid: "B",
    explanation: `<p>There are three major rock classifications, and sedimentary is one 
    of them. Sedimentary rocks are formed by four main processes "by the deposition of the weathered 
    remains of other rocks (known as 'clastic' sedimentary rocks); by the accumulation and 
    the consolidation of sediments; by the deposition of the results of biogenic activity; 
    and by precipitation from solution". <a href="https://www.sciencedaily.com/terms/sedimentary_rock.htm" target="_blank">source</a>).</p>`}
]*/

//array of objects to store questions and answers

//the database lessons in me want to separate this into separate data structures for questions,
//possbile answers, and correct answers, but this makes the code to load questoins and answers harder to read. 
//since that will likely viewed more than the variables, made this more complex so the functions are easier to parse1
//also keeping them together makes it easier to maintain changes

const QUESTIONS_AND_ANSWERS = [
    {question: "Which of the following is a step in the scientific method?",
    potentialAnswers: ["Make an observation", "Form a hypothesis", "Iterate on your hypothesis based on the results of a reproducible experiment", "All of the above"],
    correctAnswerIndex: 3, explanation: `<p>The most correct answer is that all of these steps (and more) are involved in the scientific method. 
As a refresher, the scientific method is "[a] method to collect measurable, 
empirical evidence in an experiment related to a hypothesis... 
the results aiming to support or contradict a theory" (<a href="https://www.livescience.com/20896-science-scientific-method.html" target="_blank">source</a>).</p>`},
    {question: "Name one of the main rock classifications.",
    potentialAnswers: ["Misslieness", "Sedimentary", "Alysm", "Geodude"],
    correctAnswerIndex: 1, explanation: `<p>There are three major rock classifications, and sedimentary is one 
    of them. Sedimentary rocks are formed by four main processes: "by the deposition of the weathered 
    remains of other rocks (known as 'clastic' sedimentary rocks); by the accumulation and 
    the consolidation of sediments; by the deposition of the results of biogenic activity; 
    and by precipitation from solution" (<a href="https://www.sciencedaily.com/terms/sedimentary_rock.htm" target="_blank">source</a>).</p>`},
    {question: "Which of the following are carbohydrates?",
    potentialAnswers: ["Monosaccharides", "Disaccharides", "Both monosaccharides and disaccharides", "Neither monosaccharides nor disaccharides"],
    correctAnswerIndex: 2, explanation: `<p>update.</p>`},
    {question: "What is photosynthesis?",
    potentialAnswers: ["The process in which plants die", "The process in which plants synthesize food", "How pictures were processed before camera phones", "The process in which plants reproduce"],
    correctAnswerIndex: 1, explanation: `<p>https://www.bbc.com/bitesize/articles/zn4sv9q</p>`},
    {question: "Which organ is responsible for detoxifying chemicals?",
    potentialAnswers: ["Liver", "Large Intestine", "Heart", "None - you need a detox tea"],
    correctAnswerIndex: 0, explanation: `<p>It's the liver. And the liver does even more than your every day detox! In fact, 
    "the liver's main job is to filter the blood coming from the digestive tract, before passing it to the 
    rest of the body. The liver also detoxifies chemicals and metabolizes drugs... The liver also makes proteins important for blood 
    clotting and other functions." (<a href=”https://www.webmd.com/digestive-disorders/picture-of-the-liver#1”>source</a>)</p>`},
    {question: "Which elements are in the chemical formula H2O?",
    potentialAnswers: ["Helium and oxygen", "Hydrogen and oxygen", "Helium and Oganesson", "Hydrogen and Oganesson"],
    correctAnswerIndex: 1, explanation: `<p>https://en.wikipedia.org/wiki/H2O_(disambiguation)</p>`},
    {question: "In physics, which form of energy describes an object in motion?",
    potentialAnswers: ["Motion Energy", "Potential Energy", "Kinetic Energy", "Active Energy"],
    correctAnswerIndex: 2, explanation: `<p>https://www.britannica.com/science/kinetic-energy</p>`},
    {question: "Which is NOT a result of deforestation?",
    potentialAnswers: ["Soil erosion", "Negative impact to carbon cycle", "An increase in trees", "Displacement of people"],
    correctAnswerIndex: 2, explanation: `<p>Deforestation actually means cutting down trees. https://www.livescience.com/27692-deforestation.html</p>`},
    {question: "Which of the following are lab safety rules you'll find in a chemistry lab?",
    potentialAnswers: ["Use safety goggles", "Wear gloves", "Avoid open toed shoes", "All of the above"],
    correctAnswerIndex: 3, explanation: `<p>https://ehs.stonybrook.edu/programs/laboratory-safety/lab-safety-guide</p>`},
    {question: "Which of the following would be the most basic pH?",
    potentialAnswers: ["3", "7", "10", "Me"],
    correctAnswerIndex: 2, explanation: `<p></p>`},
]

//variables when quiz is complete

