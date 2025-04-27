import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestionsProvider } from './contexts/QuestionsContext';
import Dashboard from './pages/Dashboard';
import CreateQuestion from './pages/CreateQuestion';
import UpdateQuestion from './pages/UpdateQuestion';
import ViewQuestions from './pages/ViewQuestion';
import Layout from './components/Layout';
import ProfilePage from './pages/Profile';
import UserManagement from './pages/UserManagement';


const App = () => {
  return (
    <QuestionsProvider>
      <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/usermng" element={<UserManagement />} />
          <Route path="/create" element={<CreateQuestion />} />
          <Route path="/questions/:id" element={<UpdateQuestion />} />
          <Route path="/questions" element={<ViewQuestions />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        </Layout>
      </Router>
    </QuestionsProvider>
  )
}

export default App
