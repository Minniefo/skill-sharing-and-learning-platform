import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import { QuizProvider } from "./contexts/QuizContext";
import { AuthProvider } from "./contexts/AuthContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const mockUserId = "user123a";
  return (
    <AuthProvider>
      <QuizProvider userId={mockUserId}>
        <Router>
          <Routes>
            <Route path="/" element={<Quiz />} />
          </Routes>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
