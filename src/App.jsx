import { useState } from "react";
import { questions } from "./data";
import "./index.css";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [finished, setFinished] = useState(false);
  const [animatingResult, setAnimatingResult] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (option) => {
    setSelectedOption(option);
    setShowFeedback(true);

    const correctOption = currentQuestion.options[currentQuestion.answer];
    if (option === correctOption) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setShowFeedback(false);
      setSelectedOption(null);
    } else {
      setAnimatingResult(true);
      setTimeout(() => {
        setFinished(true);
        setAnimatingResult(false);
      }, 800);
    }
  };

  if (finished) {
    return (
      <div className={`quiz-container result ${animatingResult ? "fade-in" : ""}`}>
        <h2>🎉 Тест завершён!</h2>
        <p>Вы ответили правильно на {score} из {questions.length} вопросов.</p>
      </div>
    );
  }

  const correctOption = currentQuestion.options[currentQuestion.answer];

  return (
    <div className={`quiz-container ${animatingResult ? "fade-out" : ""}`}>
      <h2>{currentQuestion.question}</h2>

      <div className="options">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={showFeedback}
            className={
              showFeedback
                ? option === correctOption
                  ? "correct"
                  : option === selectedOption
                  ? "wrong"
                  : ""
                : ""
            }
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="feedback">
          {selectedOption === correctOption ? (
            <p className="correct-text">✅ Верно!</p>
          ) : (
            <p className="wrong-text">
              ❌ Неверно. Правильный ответ: <strong>{correctOption}</strong>
            </p>
          )}
          <button onClick={handleNext}>Следующий вопрос</button>
        </div>
      )}

      <p>Вопрос {currentIndex + 1} из {questions.length}</p>
    </div>
  );
}
