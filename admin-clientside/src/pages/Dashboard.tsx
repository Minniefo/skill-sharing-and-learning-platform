import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuestions } from '../contexts/QuestionsContext';
import { PlusCircleIcon, ListIcon, EditIcon, AlertTriangleIcon, UsersIcon } from 'lucide-react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const { questions, loading, error } = useQuestions();
  const [users, setUsers] = useState([]);
  const [loadings, setLoadings] = useState(true);

  // Mock user management statistics
  const userStats = {
    totalUsers: 120,
    activeUsers: 95,
    admins: 1,
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8083/api/user'); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoadings(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangleIcon className="h-6 w-6 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="bg-green-100 rounded-full p-4">
            <UsersIcon className="h-8 w-8 text-green-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-900">Total Users</h2>
            <p className="text-3xl font-bold text-gray-700">{users.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="bg-blue-100 rounded-full p-4">
            <UsersIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Users</h2>
            <p className="text-3xl font-bold text-gray-700">{users.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="bg-yellow-100 rounded-full p-4">
            <UsersIcon className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-900">Admins</h2>
            <p className="text-3xl font-bold text-gray-700">{userStats.admins}</p>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="bg-indigo-100 rounded-full p-4">
            <ListIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-900">Total Questions</h2>
            <p className="text-3xl font-bold text-gray-700">{loading ? '...' : questions.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="bg-green-100 rounded-full p-4">
            <PlusCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-900">Create Questions</h2>
            <Link
              to="/create"
              className="mt-2 inline-block px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
            >
              Add New
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="bg-blue-100 rounded-full p-4">
            <EditIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-900">Manage Questions</h2>
            <Link
              to="/questions"
              className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Questions Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Questions</h2>
        </div>
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : questions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No questions available. Create your first question!
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {questions.slice(0, 5).map((question) => (
              <li key={question.id} className="px-6 py-4">
                <p className="font-medium text-gray-800">{question.questionText}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {question.options.length} options • Correct: {question.options[question.correctOptionIndex]}
                </p>
              </li>
            ))}
          </ul>
        )}
        {questions.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 text-right">
            <Link
              to="/questions"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all questions →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;