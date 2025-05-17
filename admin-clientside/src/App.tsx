import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuestionsProvider } from "./contexts/QuestionsContext";
import Dashboard from "./pages/Dashboard";
import CreateQuestion from "./pages/CreateQuestion";
import UpdateQuestion from "./pages/UpdateQuestion";
import ViewQuestions from "./pages/ViewQuestion";
import Layout from "./components/Layout";
import ProfilePage from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import { AuthProvider } from "./contexts/AuthContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <QuestionsProvider>
        <Router>
          
            <Routes>
              <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
              <Route path="/usermng" element={<Layout><UserManagement /></Layout>} />
              <Route path="/create" element={<Layout><CreateQuestion /></Layout>} />
              <Route path="/questions/:id" element={<Layout><UpdateQuestion /></Layout>} />
              <Route path="/questions" element={<Layout><ViewQuestions /></Layout>} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          
        </Router>
      </QuestionsProvider>
    </AuthProvider>
  );
};

export default App;
