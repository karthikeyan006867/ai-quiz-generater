import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizState } from '../types';
import { formatTime } from '../utils/quizHelper';
import { soundEffects } from '../utils/soundEffects';

interface QuizPageProps {
  quizState: QuizState | null;
  onAnswer: (answerIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onGoToQuestion: (index: number) => void;
  onSubmit: () => void;
}

const QuizPage: React.FC<QuizPageProps> = ({
  quizState,
  onAnswer,
  onNext,
  onPrevious,
  onSkip,
  onGoToQuestion,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [showNavigation, setShowNavigation] = useState<boolean>(false);

  useEffect(() => {
    if (!quizState) {
      navigate('/');
      return;
    }

    if (quizState.isCompleted) {
      navigate('/results');
      return;
    }

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - quizState.startTime) / 1000);
      setTimeElapsed(elapsed);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState, navigate]);

  if (!quizState) {
    return null;
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;
  const answeredCount = quizState.userAnswers.filter(a => a !== null).length;

  const handleAnswerSelect = (answerIndex: number) => {
    soundEffects.playClick();
    onAnswer(answerIndex);
  };

  const handleNext = () => {
    soundEffects.playNavigate();
    if (quizState.currentQuestionIndex === quizState.questions.length - 1) {
      if (window.confirm('This is the last question. Do you want to submit the quiz?')) {
        soundEffects.playComplete();
        onSubmit();
      }
    } else {
      onNext();
    }
  };

  const handleSubmit = () => {
    const unanswered = quizState.questions.length - answeredCount;
    if (unanswered > 0) {
      soundEffects.playWarning();
      if (window.confirm(`You have ${unanswered} unanswered question(s). Do you want to submit anyway?`)) {
        soundEffects.playComplete();
        onSubmit();
      }
    } else {
      soundEffects.playComplete();
      onSubmit();
    }
  };

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <div className="quiz-info">
          <h1>Quiz in Progress</h1>
          <div className="quiz-stats">
            <span className="stat">
              ⏱️ Time: <strong>{formatTime(timeElapsed)}</strong>
            </span>
            <span className="stat">
              📝 Answered: <strong>{answeredCount}/{quizState.questions.length}</strong>
            </span>
            <span className="stat">
              📊 Question: <strong>{quizState.currentQuestionIndex + 1}/{quizState.questions.length}</strong>
            </span>
          </div>
        </div>
        <button className="nav-toggle" onClick={() => setShowNavigation(!showNavigation)}>
          {showNavigation ? '✕ Close' : '☰ Navigation'}
        </button>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {showNavigation && (
        <div className="question-navigation">
          <h3>Question Navigation</h3>
          <div className="nav-grid">
            {quizState.questions.map((_, index) => (
              <button
                key={index}
                className={`nav-btn ${index === quizState.currentQuestionIndex ? 'active' : ''} ${
                  quizState.userAnswers[index] !== null ? 'answered' : ''
                }`}
                onClick={() => { soundEffects.playNavigate(); onGoToQuestion(index); }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="quiz-content">
        <div className="question-card">
          <div className="question-header">
            <span className="category-badge">{currentQuestion.category}</span>
            <span className={`difficulty-badge difficulty-${currentQuestion.difficulty}`}>
              {currentQuestion.difficulty}
            </span>
          </div>

          <h2 className="question-text">{currentQuestion.question}</h2>

          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  quizState.userAnswers[quizState.currentQuestionIndex] === index ? 'selected' : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>

          <div className="question-actions">
            <button
              className="btn btn-secondary"
              onClick={() => { soundEffects.playNavigate(); onPrevious(); }}
              disabled={quizState.currentQuestionIndex === 0}
            >
              ← Previous
            </button>

            <button className="btn btn-skip" onClick={() => { soundEffects.playSkip(); onSkip(); }}>
              Skip
            </button>

            {quizState.currentQuestionIndex === quizState.questions.length - 1 ? (
              <button className="btn btn-submit" onClick={handleSubmit}>
                Submit Quiz ✓
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNext}>
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
