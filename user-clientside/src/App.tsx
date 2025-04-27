import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import { QuizProvider } from "./contexts/QuizContext";

const App = () => {
  const mockUserId = "user123a";
  return (
    <QuizProvider userId={mockUserId}>
      <Router>
        <Routes>
          <Route path="/" element={<Quiz />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
};

export default App;
