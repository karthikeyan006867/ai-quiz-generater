import { Question, QuizStats } from '../types';

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get random questions from the question bank
 */
export const getRandomQuestions = (questions: Question[], count: number = 10): Question[] => {
  if (questions.length === 0) {
    return [];
  }
  const shuffled = shuffleArray(questions);
  const actualCount = Math.min(count, questions.length);
  return shuffled.slice(0, actualCount);
};

/**
 * Calculate quiz statistics
 */
export const calculateStats = (
  questions: Question[],
  userAnswers: (number | null)[],
  timeTaken: number
): QuizStats => {
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let skippedAnswers = 0;
  const categoryBreakdown: { [key: string]: { correct: number; total: number } } = {};

  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const category = question.category;

    // Initialize category if not exists
    if (!categoryBreakdown[category]) {
      categoryBreakdown[category] = { correct: 0, total: 0 };
    }
    categoryBreakdown[category].total++;

    if (userAnswer === null) {
      skippedAnswers++;
    } else if (userAnswer === question.correctAnswer) {
      correctAnswers++;
      categoryBreakdown[category].correct++;
    } else {
      wrongAnswers++;
    }
  });

  const totalQuestions = questions.length;
  const score = correctAnswers * 10;
  const percentage = (correctAnswers / totalQuestions) * 100;

  return {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    skippedAnswers,
    score,
    percentage,
    timeTaken,
    categoryBreakdown,
  };
};

/**
 * Format time in mm:ss format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get performance message based on percentage
 */
export const getPerformanceMessage = (percentage: number): string => {
  if (percentage >= 90) return "Outstanding! You're a quiz master! 🏆";
  if (percentage >= 80) return "Excellent work! Great performance! 🌟";
  if (percentage >= 70) return "Good job! Keep it up! 👍";
  if (percentage >= 60) return "Not bad! Room for improvement! 💪";
  if (percentage >= 50) return "Fair attempt! Practice more! 📚";
  return "Keep learning! You'll do better next time! 🎯";
};

/**
 * Get grade based on percentage
 */
export const getGrade = (percentage: number): string => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
};

/**
 * Filter questions by category
 */
export const filterByCategory = (questions: Question[], category: string): Question[] => {
  return questions.filter(q => q.category === category);
};

/**
 * Filter questions by difficulty
 */
export const filterByDifficulty = (questions: Question[], difficulty: string): Question[] => {
  return questions.filter(q => q.difficulty === difficulty);
};

/**
 * Get unique categories from questions
 */
export const getCategories = (questions: Question[]): string[] => {
  const categories = questions.map(q => q.category);
  return Array.from(new Set(categories));
};
