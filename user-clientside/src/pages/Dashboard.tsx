import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookIcon, BrainIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
//import { usePost } from '../contexts/PostContext';
import { useQuiz } from "../contexts/QuizContext";
//import PostCard from '../components/PostCard';
import QuizCard from "../components/QuizCard";
import Button from "../components/Button";

const mockQuizzes = [
  {
    id: "1",
    title: "Wildlife Photography Basics",
    description: "Learn the basics of Wildlife Photography.",
    questions: [{}, {}, {}], // Mock 3 questions
    timeInMinutes: 10,
    difficulty: "Beginner",
    participants: 120,
    category: "Willife Photography",
  },
  {
    id: "2",
    title: "Landscape Photography Mastery",
    description: "Master Landscape Photography.",
    questions: [{}, {}, {}, {}, {}], // Mock 5 questions
    timeInMinutes: 15,
    difficulty: "Intermediate",
    participants: 80,
    category: "Landscape Photography",
  },
  {
    id: "3",
    title: "Portrait Lighting Techniques",
    description: "Get started with Portrait Photography.",
    questions: [{}, {}, {}, {}], // Mock 4 questions
    timeInMinutes: 12,
    difficulty: "Advanced",
    participants: 100,
    category: "Portrait Photography",
  },
  {
    id: "4",
    title: "Street Photography Essentials",
    description: "Master the art of candid street photography.",
    questions: [{}, {}, {}, {}], // Mock 4 questions
    timeInMinutes: 10,
    difficulty: "Intermediate",
    participants: 85,
    category: "Street Photography",
  },
  {
    id: "5",
    title: "Macro Photography Techniques",
    description: "Explore tiny details through macro photography.",
    questions: [{}, {}, {}, {}], // Mock 4 questions
    timeInMinutes: 14,
    difficulty: "Advanced",
    participants: 70,
    category: "Macro Photography",
  },
  {
    id: "6",
    title: "Travel Documentary Photography",
    description: "Capture compelling travel stories with your camera.",
    questions: [{}, {}, {}, {}], // Mock 4 questions
    timeInMinutes: 16,
    difficulty: "Beginner",
    participants: 120,
    category: "Documentary Photography",
  },
];

const Dashboard = () => {
  const { currentUser } = useAuth();
  //   const {
  //     posts,
  //     loading: postsLoading
  //   } = usePost();
  const { questions, loading: quizzesLoading } = useQuiz();
  const [activeTab, setActiveTab] = useState("posts");
  const [searchTerm, setSearchTerm] = useState("");
  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">
          Please log in to view your dashboard
        </h2>
        <Link to="/login">
          <Button variant="primary">Log In</Button>
        </Link>
      </div>
    );
  }
  // Filter posts based on search term
  //const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.category.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.name.toLowerCase().includes(searchTerm.toLowerCase()));
  // Filter quizzes based on search term
  // Use mock quizzes for filtered quizzes
  const filteredQuizzes = mockQuizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md mb-8 h-48 overflow-hidden">
        {/* Banner image as background */}
        <img
          src="https://zenfolio.com/wp-content/uploads/2022/09/main-landscape-idea-photo.jpg"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-50 rounded-lg"
        />

        {/* Overlay text container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl font-bold">Quiz Dashboard</h1>
          <p className="text-lg text-white mt-2">
            Welcome back, {currentUser.displayName}!
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for posts, quizzes, categories..."
            className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
              activeTab === "quizzes"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <BrainIcon className="h-5 w-5 mr-2" />
            Quizzes
          </button>
        </nav>
      </div>
      {/* {activeTab === 'posts' ? <div>
          {postsLoading ? <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div> : filteredPosts.length === 0 ? <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No posts found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or create a new post
              </p>
              <Link to="/create-post">
                <Button variant="primary">Create Post</Button>
              </Link>
            </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => <PostCard key={post.id} id={post.id} title={post.title} excerpt={post.excerpt} author={post.author} category={post.category} createdAt={new Date(post.createdAt).toLocaleDateString()} likes={post.likes} comments={post.comments.length} image={post.image} />)}
            </div>}
        </div> : <div> */}
      {quizzesLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No quizzes found</h3>
          <p className="text-gray-500">Try adjusting your search</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              description={quiz.description}
              questionsCount={quiz.length}
              timeInMinutes={quiz.timeInMinutes}
              difficulty={quiz.difficulty}
              participants={quiz.participants}
              category={quiz.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
