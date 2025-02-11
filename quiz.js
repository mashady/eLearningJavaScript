  // Map each question identifier to its correct answer value.
  const correctAnswers = {
    q1: "A",    // HyperText Markup Language
    q2: "B",    // <br>
    q3: "B",    // <header>
    q4: "B",    // Alternative text
    q5: "B",    // <a>
    q6: "C",    // Cascading Style Sheets
    q7: "C",    // color
    q8: "B",    // line-height
    q9: "C",    // /* comment */
    q10: "A",   // background-color
    q11: "B",   // #header
    q12: "B",   // .active
    q13: "C",   // display: flex
    q14: "B",   // padding
    q15: "A",   // z-index
    q16: "A",   // Document Object Model
    q17: "B",   // let
    q18: "B",   // Netscape
    q19: "A",   // A function combined with its lexical scope
    q20: "B",   // The global object (non-strict mode)
    q21: "A",   // var arr = []
    q22: "A",   // push()
    q23: "A",   // == compares value only; === compares value and type
    q24: "B",   // JSON.parse()
    q25: "B",   // =
    q26: "B",   // Catching common coding mistakes
    q27: "A",   // //
    q28: "B",   // onclick
    q29: "A",   // "number"
    q30: "D"    // Float (JavaScript does not have a distinct float type)
  };

  function submitQuiz() {
    let score = 0;
    // Update this count when all questions are added (30 for full quiz)
    const totalQuestions = 30;
    
    // Loop through each question and process feedback within its container
    for (let i = 1; i <= totalQuestions; i++) {
      const qName = "q" + i;
      const questionDiv = document.getElementById("question" + i);
      // Remove any existing feedback if re-submitting
      const existingFeedback = questionDiv.querySelector(".feedback");
      if (existingFeedback) {
        existingFeedback.remove();
      }
      const selectedOption = document.querySelector('input[name="' + qName + '"]:checked');
      const userAnswer = selectedOption ? selectedOption.value : "No Answer";
      const correctAnswer = correctAnswers[qName];
      
      // Create a new feedback element
      const feedbackDiv = document.createElement("div");
      feedbackDiv.classList.add("feedback");
      
      if (selectedOption && userAnswer === correctAnswer) {
        feedbackDiv.classList.add("correct");
        feedbackDiv.innerText = "Correct! Your Answer: " + userAnswer;
        score++;
      } else {
        feedbackDiv.classList.add("incorrect");
        feedbackDiv.innerText = "Incorrect. Your Answer: " + userAnswer + ". Correct Answer: " + correctAnswer;
      }
      // Append feedback inside the same question container
      questionDiv.appendChild(feedbackDiv);
    }
    
    // Display final score summary below the form
    const finalScoreDiv = document.getElementById("finalScore");
    finalScoreDiv.innerHTML = "Your total score is " + score + " out of " + totalQuestions;
  }