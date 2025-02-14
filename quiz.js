const correctAnswers = {
  q1: "A",
  q2: "B",
  q3: "B",
  q4: "B",
  q5: "B",
  q6: "C",
  q7: "C",
  q8: "B",
  q9: "C",
  q10: "A",
  q11: "B",
  q12: "B",
  q13: "C",
  q14: "B",
  q15: "A",
  q16: "A",
  q17: "B",
  q18: "B",
  q19: "A",
  q20: "B",
  q21: "A",
  q22: "A",
  q23: "A",
  q24: "B",
  q25: "B",
  q26: "B",
  q27: "A",
  q28: "B",
  q29: "A",
  q30: "D",
};

function submitQuiz() {
  let score = 0;
  const totalQuestions = 30;

  for (let i = 1; i <= totalQuestions; i++) {
    const qName = "q" + i;
    const questionDiv = document.getElementById("question" + i);
    const existingFeedback = questionDiv.querySelector(".feedback");
    if (existingFeedback) {
      existingFeedback.remove();
    }
    const selectedOption = document.querySelector(
      'input[name="' + qName + '"]:checked'
    );
    const userAnswer = selectedOption ? selectedOption.value : "No Answer";
    const correctAnswer = correctAnswers[qName];

    const feedbackDiv = document.createElement("div");
    feedbackDiv.classList.add("feedback");

    if (selectedOption && userAnswer === correctAnswer) {
      feedbackDiv.classList.add("correct");
      feedbackDiv.innerText = "Correct! Your Answer: " + userAnswer;
      score++;
    } else {
      feedbackDiv.classList.add("incorrect");
      feedbackDiv.innerText =
        "Incorrect. Your Answer: " +
        userAnswer +
        ". Correct Answer: " +
        correctAnswer;
    }
    questionDiv.appendChild(feedbackDiv);
  }

  const finalScoreDiv = document.getElementById("finalScore");
  finalScoreDiv.innerHTML =
    "Your total score is " + score + " out of " + totalQuestions;
}
