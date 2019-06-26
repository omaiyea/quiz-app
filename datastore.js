/////this file stores the variables that won't change and will be used for this quiz app/////

//business rules of number of questions and answers available in quiz
const MAX_QUESTIONS = 10; //could also set this based on the number of elements in array of QUESTIONS_AND_ANSWERS in case questions are added/removed
const MAX_ANSWERS = 4;

//home screen
const HEADER_IMAGE = `<i class="fas fa-flask fa-5x" id="headerImg" alt="flask icon"></i>`;
const WELCOME_HEADER = `
<h2>Do you remember basic science?</h2>`;
const WELCOME_MESSAGE = `<p>Whether you're taking an intro level science class now or 
haven't taken a science class for years-- let's see if you remember 
some key basic facts with this quiz! We'll take you through 
biology, chemistry, physics, environmental science, and general science in 10
questions.<br><br>When you're ready, click the button to start!</p>`;
const START_BUTTON = `<form class="js-next-question"> 
<input type="submit" value="Start Quiz"/>
</form>`;

//quiz status counts 
//defined here but set in index.js to keep counts accurate
let QUESTION_COUNT;  // what question user is on
let QUESTIONS_RIGHT; // how many questions user got right

//button to iterate through next question and land on final screen
const NEXT_BUTTON = `<form class="js-next-question"><input type="submit" value="Next Question"></form>`;

//button and text for end of quiz
//button to redo quiz
const REDO = `<p>Want to try again?</p><form class="js-redo-quiz"><input type="submit" value="Redo Quiz" onclick="reloadPage();"></form>`;
const FINAL_IMAGE = `<i class="fas fa-glass-cheers fa-10x"></i>`;
const ALL_RIGHT = `<p>Sure, this was a super basic quiz, but you still aced it!</p>`;
const MOST_RIGHT = `<p>You remember some of the basics! Go you!</p>`;
const MOST_WRONG = `<p>Hey, at least seeing the right answers was useful?</p>`;

//array of objects to store questions and answers

//the database lessons in me want to separate this into separate data structures for questions,
//possbile answers, and correct answers, but this makes the code to load questoins and answers harder to read. 
//since that will likely viewed more than the variables, made this more complex so the functions are easier to parse1
//also keeping them together makes it easier to maintain changes

const QUESTIONS_AND_ANSWERS = [
    {question: "Which of the following is a step in the scientific method?", icon: `<i class="fas fa-5x fa-clipboard-list"></i>`,
    potentialAnswers: ["Make an observation", "Form a hypothesis", "Iterate on your hypothesis based on the results of a reproducible experiment", "All of the above"],
    correctAnswerIndex: 3, explanation: `<p>The most correct answer is that all of these steps (and more) are involved in the scientific method. 
As a refresher, the scientific method is "[a] method to collect measurable, 
empirical evidence in an experiment related to a hypothesis... 
the results aiming to support or contradict a theory" (<a href="https://www.livescience.com/20896-science-scientific-method.html" target="_blank">source</a>).</p>`},
    {question: "Name one of the main rock classifications.", icon: `<i class="fas fa-globe-africa fa-5x"></i>`,
    potentialAnswers: ["Misslieness", "Sedimentary", "Alysm", "Geodude"],
    correctAnswerIndex: 1, explanation: `<p>There are three major rock classifications, and sedimentary is one 
    of them. Sedimentary rocks are formed by four main processes: "by the deposition of the weathered 
    remains of other rocks (known as 'clastic' sedimentary rocks); by the accumulation and 
    the consolidation of sediments; by the deposition of the results of biogenic activity; 
    and by precipitation from solution" (<a href="https://www.sciencedaily.com/terms/sedimentary_rock.htm" target="_blank">source</a>).</p>`},
    {question: "Which of the following are carbohydrates?", icon: `<i class="fas fa-bread-slice fa-5x"></i>`,
    potentialAnswers: ["Monosaccharides", "Disaccharides", "Both monosaccharides and disaccharides", "Neither monosaccharides nor disaccharides"],
    correctAnswerIndex: 2, explanation: `<p>Monosaccharides and disaccharides are examples of carbohydrates. Carbohydrates are an energy source
    for your body. These two are some of the smaller examples of carbohydrates (<a href="https://www.rsc.org/Education/Teachers/Resources/cfb/carbohydrates.htm" target="_blank">source</a>).</p>`},
    {question: "What is photosynthesis?", icon: `<i class="fas fa-leaf fa-5x"></i>`,
    potentialAnswers: ["The process in which plants die", "The process in which plants synthesize food", "How pictures were processed before camera phones", "The process in which plants reproduce"],
    correctAnswerIndex: 1, explanation: `<p>Plants are able to make their own food using photosynthesis. 
    This chemical process requires light, carbon dioxide, and water and takes place in the leaves of a plant (<a href="https://www.bbc.com/bitesize/articles/zn4sv9q">source</a>).</p>`},
    {question: "Which organ is responsible for detoxifying chemicals?", icon: `<i class="fas fa-child fa-5x"></i>`,
    potentialAnswers: ["Liver", "Large Intestine", "Heart", "None - you need a detox tea"],
    correctAnswerIndex: 0, explanation: `<p>It's the liver. And the liver does even more than your every day detox! In fact, 
    "the liver's main job is to filter the blood coming from the digestive tract, before passing it to the 
    rest of the body. The liver also detoxifies chemicals and metabolizes drugs... The liver also makes proteins important for blood 
    clotting and other functions." (<a href=”https://www.webmd.com/digestive-disorders/picture-of-the-liver#1” target="_blank">source</a>).</p>`},
    {question: "Which elements are in the chemical formula H2O?", icon: `<i class="fas fa-atom fa-5x"></i>`,
    potentialAnswers: ["Helium and oxygen", "Hydrogen and oxygen", "Helium and Oganesson", "Hydrogen and Oganesson"],
    correctAnswerIndex: 1, explanation: `<p>"H2O is the chemical formula for water, ice, or steam which consists of 
    two atoms of hydrogen and one atom of oxygen" (<a href="https://en.wikipedia.org/wiki/H2O_(disambiguation) target="_blank">source</a>).</p>`},
    {question: "In physics, which form of energy describes an object in motion?", icon: `<i class="fas fa-rocket fa-5x"></i>`,
    potentialAnswers: ["Motion Energy", "Potential Energy", "Kinetic Energy", "Electrical Energy"],
    correctAnswerIndex: 2, explanation: `<p>Kinetic energy describes the energy an object has while it's in motion. 
    "If work, which transfers energy, is done on an object by applying a net force, the object speeds up and 
    thereby gains kinetic energy" (<a href="https://www.britannica.com/science/kinetic-energy" target="_blank">source</a>).</p>`},
    {question: "Which is NOT a result of deforestation?", icon: `<i class="fas fa-tree fa-5x"></i>`,
    potentialAnswers: ["Soil erosion", "Negative impact to carbon cycle", "An increase in trees", "Displacement of people"],
    correctAnswerIndex: 2, explanation: `<p>The definition of deforestation is "the permanent desctruction of forests in order to make the
    land available for other uses." Its negative impacts are not just environmental (tree roots prevent soil from blowing away, 
    trees contain carbon dioxide which is released when they die, among others) but also social since communities may live in the areas 
    deforestation happens (<a href="https://www.livescience.com/27692-deforestation.html" target="_blank">source</a>).</p>`},
    {question: "Which of the following are lab safety rules you'll find in a chemistry lab?", icon: `<i class="fas fa-eye-dropper fa-5x"></i>`,
    potentialAnswers: ["Use safety goggles", "Wear gloves", "Avoid open toed shoes", "All of the above"],
    correctAnswerIndex: 3, explanation: `<p>The most correct answer is that all of these rules (and more) are important to keep in 
    mind in a chemistry lab, depending on the experiment taking place (<a href="https://ehs.stonybrook.edu/programs/laboratory-safety/lab-safety-guide" target="_blank">source</a>).</p>`},
    {question: "Which of the following would be the most basic pH?", icon: `<i class="fas fa-vials fa-5x"></i>`,
    potentialAnswers: ["3", "7", "10", "Me"],
    correctAnswerIndex: 2, explanation: `<p>pH describes how acidic or basic a solution is. More acidic solutions have a lower
    pH and more basic or alkaline solutions have a higher pH. A pH of 7 indicate a neutral solution (<a href="https://simple.wikipedia.org/wiki/PH" target="_blank">source</a>).</p>`},
]

