const questions = [
  {
    question: "Яка криптовалюта є найпопулярнішою (🥇)?",
    image: "https://blog.whitebit.com/wp-content/uploads/2021/09/coins-btc.png" ,
    answers: [
      { text: "Ethereum", correct: false },
      { text: "Bitcoin", correct: true },
      { text: "Dogecoin", correct: false },
      { text: "Cardano", correct: false }
    ]
  },
  {
    question: "Хто є творцем Bitcoin?",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Satoshi_Nakamoto.jpg",
    answers: [
      { text: "Vitalik Buterin", correct: false },
      { text: "Satoshi Nakamoto", correct: true },
      { text: "Changpeng Zhao", correct: false },
      { text: "Elon Musk", correct: false }
    ]
  },
  {
    question: "Що таке Altcoin?",
    image: "",
    answers: [
      { text: "Будь-яка криптовалюта, крім Bitcoin", correct: true },
      { text: "Стейблкоїн", correct: false },
      { text: "Програма для трейдингу", correct: false },
      { text: "Крипто-гаманець", correct: false }
    ]
  },
  {
    question: "Що таке FOMO?",
    image: "",
    answers: [
      { text: "Страх пропустити можливість", correct: true },
      { text: "Комісія за транзакцію", correct: false },
      { text: "Новий альткоїн", correct: false },
      { text: "Вид майнінгу", correct: false }
    ]
  },
  {
    question: "Яка криптовалюта є платформою для смарт-контрактів?",
    image: "https://stormgain.com/sites/default/files/2024-03/ethereum-price-predction-main.jpg",
    answers: [
      { text: "Bitcoin", correct: false },
      { text: "Solana", correct: false },
      { text: "Ethereum", correct: true },
      { text: "Tether", correct: false }
    ]
  },
  {
    question: "Хто заснував біржу Binance?",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/26/CZ_Binance_2019.jpg",
    answers: [
      { text: "Michael Saylor", correct: false },
      { text: "Changpeng Zhao", correct: true },
      { text: "Charles Hoskinson", correct: false },
      { text: "Gavin Wood", correct: false }
    ]
  },
  {
    question: "Що означає Tokenomics?",
    image: "",
    answers: [
      { text: "Технічна швидкість транзакцій", correct: false },
      { text: "Майнінг криптовалют", correct: false },
      { text: "Економіка токена або криптовалюти", correct: true },
      { text: "Сторінка новин про крипту", correct: false }
    ]
  },
  {
    question: "Хто впливає на ринок криптовалют через свої публічні заяви та підтримку Dogecoin?",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society_%28crop2%29.jpg",
    answers: [
      { text: "Brian Armstrong", correct: false },
      { text: "Elon Musk", correct: true },
      { text: "Vitalik Buterin", correct: false },
      { text: "Satoshi Nakamoto", correct: false }
    ]
  },
  {
    question: "Яка криптовалюта відома як стабільна монета (Stablecoin)?",
    image: "https://cryptonews.com/news/images/stories/usdt-1.jpg",
    answers: [
      { text: "Tether (USDT)", correct: true },
      { text: "Bitcoin", correct: false },
      { text: "Dogecoin", correct: false },
      { text: "Ethereum", correct: false }
    ]
  },
  {
    question: "Який Altcoin використовує смарт-контракти та масштабованість через Cardano?",
    image: "https://cryptoslate.com/wp-content/uploads/2021/02/cardano-ada.jpg",
    answers: [
      { text: "Cardano (ADA)", correct: true },
      { text: "Polkadot (DOT)", correct: false },
      { text: "Solana (SOL)", correct: false },
      { text: "BNB (Binance Coin)", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const body = document.body;
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const questionText = document.getElementById('question-text');
const questionImage = document.getElementById('question-image');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const scoreText = document.getElementById('score-text');
const progressBar = document.getElementById('progress-bar');
const themeToggleButton = document.getElementById('theme-toggle');

function updateProgressBar() {
  const progress = (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function showQuestion() {
  resetState();
  updateProgressBar();

  const currentQuestion = questions[currentQuestionIndex];
  questionText.innerText = currentQuestion.question;

  if(currentQuestion.image){
    questionImage.src = currentQuestion.image;
    questionImage.style.display = 'block';
  } else {
    questionImage.style.display = 'none';
  }

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('answer-btn');
    if(answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState(){
  nextButton.disabled = true;
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if(isCorrect){
    selectedButton.classList.add('correct');
    score++;
  } else {
    selectedButton.classList.add('incorrect');
  }

  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true") button.classList.add('correct');
    button.disabled = true;
  });

  nextButton.disabled = false;
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  } else {
    showResult();
  }
}

function showResult(){
  updateProgressBar();
  quizBox.style.display = 'none';
  resultBox.style.display = 'block';
  scoreText.innerHTML = `Ви відповіли правильно на <strong>${score}</strong> з <strong>${questions.length}</strong> питань! 🎉`;
}

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  resultBox.style.display = 'none';
  quizBox.style.display = 'block';
  showQuestion();
}

function toggleTheme(){
  if(body.classList.contains('light-theme')){
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeToggleButton.innerText = "💡 Light Mode";
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeToggleButton.innerText = "🌙 Dark Mode";
  }
}

nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', startQuiz);
themeToggleButton.addEventListener('click', toggleTheme);


startQuiz();


























// --- Функції логіки вікторини ---


function updateProgressBar() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}


function showQuestion() {
    resetState();
    updateProgressBar(); // Оновлення прогресу


    const currentQuestion = questions[currentQuestionIndex];
   
    questionText.innerText = currentQuestion.question;


    // Додавання зображення (Фото музиканта/гурту)
    if (currentQuestion.image) {
        questionImage.src = currentQuestion.image;
        questionImage.style.display = 'block';
    } else {
        questionImage.style.display = 'none';
        questionImage.src = '';
    }


    // Створення кнопок для відповідей
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}


function resetState() {
    nextButton.disabled = true;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";


    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }


    // Блокування всіх кнопок і підсвітка правильної
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });


    nextButton.disabled = false;
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}


function showResult() {
    updateProgressBar(); // Фінальне оновлення прогрес-бару до 100%
    quizBox.style.display = 'none';
    resultBox.style.display = 'block';
    scoreText.innerHTML = `Ви вгадали **${score}** з **${questions.length}** музикантів! <br> Це чудовий результат!`;
}


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.style.display = 'none';
    quizBox.style.display = 'block';
    showQuestion();
}


// --- Функція зміни теми ---


function toggleTheme() {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleButton.innerText = "💡 Light Mode";
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleButton.innerText = "🌙 Dark Mode";
    }
}


// --- Обробники подій ---


nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', startQuiz);
themeToggleButton.addEventListener('click', toggleTheme);


// Початковий запуск
startQuiz();
