export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  score: number;
  isCompleted: boolean;
  startTime: number;
  endTime: number | null;
}

export interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedAnswers: number;
  score: number;
  percentage: number;
  timeTaken: number;
  categoryBreakdown: {
    [key: string]: {
      correct: number;
      total: number;
    };
  };
}
