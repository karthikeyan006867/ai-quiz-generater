import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import { Question, QuizState } from './types';
import { questionBank } from './data/questions';
import { getRandomQuestions } from './utils/quizHelper';
import './App.css';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState | null>(null);

  const startQuiz = (questionCount: number = 10, category?: string, difficulty?: string) => {
    let filteredQuestions = [...questionBank];

    // Filter by category if specified
    if (category && category !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.category === category);
    }

    // Filter by difficulty if specified
    if (difficulty && difficulty !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
    }

    const selectedQuestions = getRandomQuestions(filteredQuestions, questionCount);

    const newQuizState: QuizState = {
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      userAnswers: new Array(selectedQuestions.length).fill(null),
      score: 0,
      isCompleted: false,
      startTime: Date.now(),
      endTime: null,
    };

    setQuizState(newQuizState);
  };

  const answerQuestion = (answerIndex: number) => {
    if (!quizState) return;

    const newAnswers = [...quizState.userAnswers];
    newAnswers[quizState.currentQuestionIndex] = answerIndex;

    setQuizState({
      ...quizState,
      userAnswers: newAnswers,
    });
  };

  const nextQuestion = () => {
    if (!quizState) return;

    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestionIndex: quizState.currentQuestionIndex + 1,
      });
    }
  };

  const previousQuestion = () => {
    if (!quizState) return;

    if (quizState.currentQuestionIndex > 0) {
      setQuizState({
        ...quizState,
        currentQuestionIndex: quizState.currentQuestionIndex - 1,
      });
    }
  };

  const skipQuestion = () => {
    nextQuestion();
  };

  const goToQuestion = (index: number) => {
    if (!quizState) return;

    setQuizState({
      ...quizState,
      currentQuestionIndex: index,
    });
  };

  const submitQuiz = () => {
    if (!quizState) return;

    setQuizState({
      ...quizState,
      isCompleted: true,
      endTime: Date.now(),
    });
  };

  const resetQuiz = () => {
    setQuizState(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage onStartQuiz={startQuiz} />} />
          <Route
            path="/quiz"
            element={
              <QuizPage
                quizState={quizState}
                onAnswer={answerQuestion}
                onNext={nextQuestion}
                onPrevious={previousQuestion}
                onSkip={skipQuestion}
                onGoToQuestion={goToQuestion}
                onSubmit={submitQuiz}
              />
            }
          />
          <Route
            path="/results"
            element={<ResultsPage quizState={quizState} onReset={resetQuiz} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
