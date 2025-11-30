# Career Assessment Tool

A comprehensive web-based career assessment tool for students that offers career assessments, personality tests, and skills evaluations. The platform helps students understand their strengths and preferences and provides recommendations for suitable career paths.

## Features

### 1. Login Page
- First page of the application with two options: Sign Up and Login
- Simple and secure login form with validation
- Email and password validation

### 2. Exam Page
- After login, displays an exam page with 15 questions from various subjects for BTech students
- Questions are multiple-choice or objective type
- Students must answer all 15 questions to move to the next page
- Progress indicator showing answered questions

### 3. Subject Selection Page
- Displays a list of 20 subjects
- Students must select exactly 5 subjects to move to the next page
- Visual feedback for selected subjects

### 4. Dashboard Page
- Central hub with 5 main options:
  1. **Subject Course Notes** - Access course materials for selected subjects
  2. **Take an Exam on Completed Subject** - Take quizzes on selected subjects (4 quizzes per subject)
  3. **Interview Selected Students** - View and manage interview schedules
  4. **No. of Companies You're Selected** - View companies where you've been selected
  5. **Marks on the Quiz You Written in Each Subject** - View quiz performance and marks

## Design

- **Background Color**: Medium blue (#4567b7)
- **Color Scheme**: Complementary palette with gradients and modern UI elements
- **Responsiveness**: Fully responsive design accessible on various devices and screen sizes

## Technical Stack

- **Frontend Framework**: React 18.2.0
- **Programming Language**: JavaScript (ES6+)
- **State Management**: Context API
- **Routing**: React Router v6
- **Styling**: CSS3 with modern design patterns

## Installation

1. Clone the repository or extract the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.js
│   │   ├── CourseNotes.js
│   │   ├── QuizSubjectSelection.js
│   │   ├── QuizPage.js
│   │   ├── InterviewPage.js
│   │   ├── CompaniesPage.js
│   │   └── QuizMarksPage.js
│   ├── ExamPage/
│   │   └── ExamPage.js
│   ├── SubjectSelectionPage/
│   │   └── SubjectSelectionPage.js
│   ├── LoginPage/
│   │   └── LoginPage.js
│   ├── Navigation/
│   │   └── Navigation.js
│   └── ProtectedRoute/
│       └── ProtectedRoute.js
├── context/
│   └── AppContext.js
├── App.js
├── App.css
├── index.js
└── index.css
```

## Usage

1. **Login/Sign Up**: Start by creating an account or logging in
2. **Take Initial Exam**: Complete the 15-question assessment
3. **Select Subjects**: Choose 5 subjects from the available list
4. **Access Dashboard**: Use the dashboard to:
   - View course notes for your subjects
   - Take quizzes (4 per subject)
   - Check interview schedules
   - View company selections
   - Review quiz marks and performance

## Navigation

- Users can navigate freely between pages using the navigation bar
- Progress is saved in localStorage
- Users can move back and forth between pages without losing their progress

## State Management

The application uses React Context API for state management, storing:
- User authentication status
- Exam answers
- Selected subjects
- Quiz results
- Interview data
- Company selections

All data is persisted in localStorage for session continuity.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes.





"# ODDSEM-HACKATHON-FEDF" 
"# hackathon-career-assessment-tool" 
