const questions = {
  2023: [
    {
      question: "Which river is known as the lifeline of Gujarat?",
      options: ["Sabarmati", "Tapi", "Mahi", "Narmada"],
      answer: 3
    },
    {
      question: "When was the Constitution of India adopted?",
      options: ["15 August 1947", "26 January 1950", "26 November 1949", "2 October 1947"],
      answer: 2
    }
  ],
  2022: [
    {
      question: "Who was the first Governor General of India?",
      options: ["Lord Canning", "Warren Hastings", "Lord Mountbatten", "Lord Dalhousie"],
      answer: 1
    }
  ]
};

let currentQuestionIndex = 0;
let selectedAnswers = [];
let timer;
let time = 0;

function startTest() {
  const year = document.getElementById("yearSelect").value;
  window.currentYear = year;
  currentQuestionIndex = 0;
  selectedAnswers = Array(questions[year].length).fill(null);

  document.querySelector(".controls").classList.add("hidden");
  document.getElementById("quizContainer").classList.remove("hidden");

  renderQuestion();
  startTimer();
}

function renderQuestion() {
  const q = questions[window.currentYear][currentQuestionIndex];
  document.getElementById("questionText").textContent = `Q${currentQuestionIndex + 1}. ${q.question}`;

  const optionsList = document.getElementById("optionsList");
  optionsList.innerHTML = "";

  q.options.forEach((opt, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="radio" name="option" value="${index}" ${selectedAnswers[currentQuestionIndex] === index ? "checked" : ""}>
        ${opt}
      </label>
    `;
    li.querySelector("input").addEventListener("change", () => {
      selectedAnswers[currentQuestionIndex] = index;
    });
    optionsList.appendChild(li);
  });
}

function nextQuestion() {
  if (currentQuestionIndex < questions[window.currentYear].length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

function submitTest() {
  clearInterval(timer);
  let score = 0;
  const qList = questions[window.currentYear];
  qList.forEach((q, i) => {
    if (selectedAnswers[i] === q.answer) {
      score++;
    } else if (selectedAnswers[i] !== null) {
      score -= 0.33;
    }
  });

  document.getElementById("quizContainer").classList.add("hidden");
  document.getElementById("resultContainer").classList.remove("hidden");
  document.getElementById("scoreDisplay").textContent = `Your score: ${score.toFixed(2)} / ${qList.length}`;
}

function startTimer() {
  time = 0;
  timer = setInterval(() => {
    time++;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById("timer").textContent = `Time: ${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);
}
