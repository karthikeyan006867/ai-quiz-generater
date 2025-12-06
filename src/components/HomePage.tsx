import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../utils/quizHelper';
import { questionBank } from '../data/questions';
import { soundEffects } from '../utils/soundEffects';

interface HomePageProps {
  onStartQuiz: (questionCount: number, category?: string, difficulty?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartQuiz }) => {
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = getCategories(questionBank);

  const handleStartQuiz = () => {
    soundEffects.playClick();
    soundEffects.playNavigate();
    onStartQuiz(questionCount, selectedCategory, selectedDifficulty);
    navigate('/quiz');
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <header className="home-header">
          <h1 className="title">🎯 AI Quiz Master</h1>
          <p className="subtitle">Test your knowledge with 200+ general questions!</p>
        </header>

        <div className="quiz-setup">
          <div className="setup-card">
            <h2>Configure Your Quiz</h2>

            <div className="setup-option">
              <label htmlFor="question-count">Number of Questions:</label>
              <select
                id="question-count"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
                <option value={25}>25 Questions</option>
              </select>
            </div>

            <div className="setup-option">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="setup-option">
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                id="difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <button className="start-btn" onClick={handleStartQuiz}>
              Start Quiz 🚀
            </button>
          </div>

          <div className="features">
            <h3>Features:</h3>
            <ul>
              <li>✅ 200 Built-in General Knowledge Questions</li>
              <li>✅ Multiple Categories (Science, History, Geography, Sports & More)</li>
              <li>✅ Three Difficulty Levels</li>
              <li>✅ Random Question Selection</li>
              <li>✅ Progress Tracking</li>
              <li>✅ Detailed Results & Statistics</li>
              <li>✅ Timer & Score Calculation</li>
              <li>✅ Review Answers</li>
            </ul>
          </div>
        </div>

        <footer className="home-footer">
          <p>Built with React, TypeScript & Vite</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
