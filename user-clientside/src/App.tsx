import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Quiz from "./pages/Quiz";
import { QuizProvider } from "./contexts/QuizContext";
import { AuthProvider } from "./contexts/AuthContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { Posts } from "./pages/Posts";
import ProtectedRoute from "./components/ProtectedRoute";
import PostPage from "./pages/PostPage";


const App = () => {
  
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
        
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
          
            <Route path="/signup" element={<SignupPage />} />
          
            <Route path="/login" element={<LoginPage />} />
          
            <Route path="/dashboard" element={<ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>} />

            <Route path="/quiz" element={<ProtectedRoute><Layout><Quiz /></Layout></ProtectedRoute>} />

            <Route path="/testing" element={<ProtectedRoute><Layout><Posts /></Layout></ProtectedRoute>} />

            <Route path="/posts" element={<ProtectedRoute><Layout><PostPage /></Layout></ProtectedRoute>} />

          </Routes>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
