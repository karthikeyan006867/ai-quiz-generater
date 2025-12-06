import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizState } from '../types';
import { calculateStats, formatTime, getPerformanceMessage, getGrade } from '../utils/quizHelper';
import { soundEffects } from '../utils/soundEffects';

interface ResultsPageProps {
  quizState: QuizState | null;
  onReset: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ quizState, onReset }) => {
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState<boolean>(false);

  if (!quizState || !quizState.isCompleted) {
    navigate('/');
    return null;
  }

  const timeTaken = quizState.endTime
    ? Math.floor((quizState.endTime - quizState.startTime) / 1000)
    : 0;

  const stats = calculateStats(quizState.questions, quizState.userAnswers, timeTaken);
  const grade = getGrade(stats.percentage);
  const message = getPerformanceMessage(stats.percentage);

  useEffect(() => {
    // Play sound based on score
    if (stats.percentage >= 80) {
      soundEffects.playCelebration();
    } else if (stats.percentage >= 60) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playComplete();
    }
  }, [stats.percentage]);

  const handleRetakeQuiz = () => {
    soundEffects.playClick();
    soundEffects.playNavigate();
    onReset();
    navigate('/');
  };

  return (
    <div className="results-page">
      <div className="results-container">
        <header className="results-header">
          <h1>Quiz Completed! 🎉</h1>
          <p>{message}</p>
        </header>

        <div className="score-card">
          <div className="score-circle">
            <div className="score-value">{stats.percentage.toFixed(1)}%</div>
            <div className="grade">{grade}</div>
          </div>
          <div className="score-details">
            <div className="detail">
              <span className="label">Score:</span>
              <span className="value">{stats.score} / {stats.totalQuestions * 10}</span>
            </div>
            <div className="detail">
              <span className="label">Correct:</span>
              <span className="value correct">{stats.correctAnswers}</span>
            </div>
            <div className="detail">
              <span className="label">Wrong:</span>
              <span className="value wrong">{stats.wrongAnswers}</span>
            </div>
            <div className="detail">
              <span className="label">Skipped:</span>
              <span className="value skipped">{stats.skippedAnswers}</span>
            </div>
            <div className="detail">
              <span className="label">Time:</span>
              <span className="value">{formatTime(timeTaken)}</span>
            </div>
          </div>
        </div>

        <div className="category-breakdown">
          <h2>Performance by Category</h2>
          <div className="category-list">
            {Object.entries(stats.categoryBreakdown).map(([category, data]) => {
              const percentage = (data.correct / data.total) * 100;
              return (
                <div key={category} className="category-item">
                  <div className="category-info">
                    <span className="category-name">{category}</span>
                    <span className="category-score">
                      {data.correct}/{data.total}
                    </span>
                  </div>
                  <div className="category-bar">
                    <div
                      className="category-fill"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: percentage >= 70 ? '#4caf50' : percentage >= 50 ? '#ff9800' : '#f44336',
                      }}
                    ></div>
                  </div>
                  <span className="category-percentage">{percentage.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="results-actions">
          <button className="btn btn-primary" onClick={handleRetakeQuiz}>
            Take Another Quiz 🔄
          </button>
          <button className="btn btn-secondary" onClick={() => { soundEffects.playClick(); setShowReview(!showReview); }}>
            {showReview ? 'Hide Review' : 'Review Answers'} 📝
          </button>
        </div>

        {showReview && (
          <div className="review-section">
            <h2>Answer Review</h2>
            {quizState.questions.map((question, index) => {
              const userAnswer = quizState.userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              const isSkipped = userAnswer === null;

              return (
                <div
                  key={question.id}
                  className={`review-item ${isCorrect ? 'correct' : isSkipped ? 'skipped' : 'wrong'}`}
                >
                  <div className="review-header">
                    <span className="review-number">Question {index + 1}</span>
                    <span className={`review-status ${isCorrect ? 'correct' : isSkipped ? 'skipped' : 'wrong'}`}>
                      {isCorrect ? '✓ Correct' : isSkipped ? '- Skipped' : '✗ Wrong'}
                    </span>
                  </div>

                  <p className="review-question">{question.question}</p>

                  <div className="review-options">
                    {question.options.map((option, optIndex) => {
                      const isUserAnswer = userAnswer === optIndex;
                      const isCorrectAnswer = question.correctAnswer === optIndex;

                      return (
                        <div
                          key={optIndex}
                          className={`review-option ${
                            isCorrectAnswer ? 'correct-answer' : isUserAnswer ? 'user-answer' : ''
                          }`}
                        >
                          <span className="option-letter">{String.fromCharCode(65 + optIndex)}</span>
                          <span className="option-text">{option}</span>
                          {isCorrectAnswer && <span className="badge">✓ Correct</span>}
                          {isUserAnswer && !isCorrectAnswer && <span className="badge wrong">Your Answer</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="review-meta">
                    <span className="category">{question.category}</span>
                    <span className={`difficulty difficulty-${question.difficulty}`}>{question.difficulty}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
