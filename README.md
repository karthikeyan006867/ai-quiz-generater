# AI Quiz Generator

A modern, feature-rich online quiz application built with React, TypeScript, and Vite. Test your knowledge with 200+ built-in general knowledge questions across various categories!

## 🌟 Features

- **200 Built-in Questions**: Diverse general knowledge questions covering multiple topics
- **Multiple Categories**: Science, History, Geography, Sports, Entertainment, and General Knowledge
- **Three Difficulty Levels**: Easy, Medium, and Hard questions
- **Random Question Selection**: Get 10 random questions each time
- **Progress Tracking**: Visual progress bar and question navigation
- **Timer**: Track how long you take to complete the quiz
- **Detailed Results**: See your score, percentage, and grade
- **Category Breakdown**: Performance analysis by category
- **Answer Review**: Review all questions with correct answers highlighted
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-quiz-generater
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎮 How to Use

1. **Configure Your Quiz**: On the home page, select:
   - Number of questions (5, 10, 15, 20, or 25)
   - Category (All or specific category)
   - Difficulty level (All, Easy, Medium, or Hard)

2. **Take the Quiz**:
   - Answer questions by clicking on options
   - Use navigation buttons to move between questions
   - Skip questions if you're unsure
   - View all questions using the navigation panel

3. **View Results**:
   - See your overall score and percentage
   - Check performance by category
   - Review all questions and correct answers
   - Take another quiz to improve your score!

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Navigation
- **CSS3** - Styling with modern features

## 📁 Project Structure

```
ai-quiz-generater/
├── src/
│   ├── components/
│   │   ├── HomePage.tsx
│   │   ├── QuizPage.tsx
│   │   └── ResultsPage.tsx
│   ├── data/
│   │   └── questions.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── quizHelper.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Features Explained

### Question Bank
- 200 carefully curated questions
- Multiple categories for diverse learning
- Three difficulty levels for progressive challenge
- Each question has 4 options with one correct answer

### Quiz Configuration
- Flexible question count selection
- Category filtering
- Difficulty filtering
- Random selection ensures unique quiz each time

### Quiz Interface
- Clean, intuitive design
- Real-time timer
- Progress tracking
- Question navigation panel
- Answer selection with visual feedback

### Results & Analytics
- Comprehensive score breakdown
- Performance grade (A+ to F)
- Category-wise analysis
- Time taken display
- Motivational performance messages

### Answer Review
- Complete question review
- Correct answers highlighted
- Your answers marked
- Category and difficulty tags

## 🎨 Customization

### Adding More Questions

Edit `src/data/questions.ts` and add questions following this format:

```typescript
{
  id: 201,
  question: "Your question here?",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  correctAnswer: 0, // Index of correct answer (0-3)
  category: "Category Name",
  difficulty: "easy" // or "medium" or "hard"
}
```

### Customizing Styles

Edit `src/App.css` to change:
- Color scheme (CSS variables in `:root`)
- Layout and spacing
- Animations and transitions
- Responsive breakpoints

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more questions
- Improve UI/UX
- Add new features
- Fix bugs
- Improve documentation

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

Built with ❤️ using React, TypeScript, and Vite
