const questions = [
    { question: "What color is the sky on a clear day?", answers: { a: "Blue", b: "Red", c: "Yellow" }, correctAnswer: "a" },
    { question: "What do bees produce?", answers: { a: "Milk", b: "Honey", c: "Wine" }, correctAnswer: "b" },
    // Add more questions as needed
];
let answeredQuestions = 0;
let score = 0;

function showQuestion() {
    let randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const feedbackEl = document.getElementById('feedback');

    questionEl.innerHTML = `<div class="fade-in">${question.question}</div>`;
    answersEl.innerHTML = '';
    feedbackEl.innerHTML = ''; // Clear feedback text

    for (const [key, value] of Object.entries(question.answers)) {
        answersEl.innerHTML += `
            <input type="radio" id="${key}" name="answer" value="${key}">
            <label for="${key}" onclick="checkAnswer('${key}', '${question.correctAnswer}')">${key}: ${value}</label>
        `;
    }

    // Re-apply fade-in animation
    questionEl.classList.remove("fade-in");
    setTimeout(() => questionEl.classList.add("fade-in"), 10);
}

function checkAnswer(selected, correct) {
    const feedbackEl = document.getElementById('feedback');
    const percentageEl = document.getElementById('percentage');
    answeredQuestions++;

    if (selected === correct) {
        score++;
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "#28a745";
    } else {
        feedbackEl.textContent = "Wrong!";
        feedbackEl.style.color = "#dc3545";
    }

    let percentage = Math.round((score / answeredQuestions) * 100);
    percentageEl.textContent = `Correct Answers: ${percentage}%`;

    // Show next question button
    document.getElementById('next').style.display = 'block';
}

document.getElementById('next').addEventListener('click', () => {
    showQuestion();
    document.getElementById('next').style.display = 'none'; // Hide next question button until next selection
});

showQuestion(); // Initialize the first question
