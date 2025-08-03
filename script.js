
const questions = [
  {
    question: "Which of the following is a tributary of the Narmada River?",
    options: ["Tapi", "Mahi", "Tawa", "Sabarmati"],
    answer: "Tawa"
  },
  {
    question: "In which year was the first GPSC exam held?",
    options: ["1960", "1965", "1972", "1980"],
    answer: "1960"
  }
];

let current = 0;

function displayQuestion() {
  const container = document.getElementById('question-container');
  const q = questions[current];
  container.innerHTML = \`
    <h2>Q${current + 1}: ${q.question}</h2>
    <ul>
      \${q.options.map(opt => `<li><label><input type="radio" name="opt" value="\${opt}"> \${opt}</label></li>`).join('')}
    </ul>
  \`;
  document.getElementById('result').innerText = "";
}

function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    displayQuestion();
  }
}

function prevQuestion() {
  if (current > 0) {
    current--;
    displayQuestion();
  }
}

function checkAnswer() {
  const selected = document.querySelector('input[name="opt"]:checked');
  const result = document.getElementById('result');
  if (!selected) {
    result.innerText = "Please select an answer.";
    return;
  }
  result.innerText = selected.value === questions[current].answer ? "✅ Correct!" : "❌ Wrong. Correct answer: " + questions[current].answer;
}

window.onload = displayQuestion;
