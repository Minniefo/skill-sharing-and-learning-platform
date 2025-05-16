import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../services/api"; 
import { BookOpenIcon, CheckCircleIcon, UsersIcon } from "lucide-react";
//import { usePost } from '../contexts/PostContext';
import { useQuiz } from "../contexts/QuizContext";
//import PostCard from '../components/PostCard';
import QuizCard from "../components/QuizCard";
import Button from "../components/Button";
import { Post } from "../types";

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
];

const Home = () => {
  const mockPosts = [];
  //   const {
  //     posts,
  //     loading: postsLoading
  //   } = usePost();
  const { questions, loading: quizzesLoading } = useQuiz();
  const [posts, setPosts] = useState<Post[]>([]);
  

  const featuredQuizzes = mockQuizzes;

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAndSetPosts();
  }, []);

  const getRandomPosts = (posts: Post[], count: number): Post[] => {
    const shuffled = [...posts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const featuredPosts = getRandomPosts(posts, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Share Knowledge, Grow Together
              </h1>
              <p className="text-lg mb-8 text-indigo-100">
                Join our community of learners and experts to share skills,
                knowledge, and experiences. Create posts, take quizzes, and
                connect with like-minded individuals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button variant="primary" size="lg">
                    Join Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="People collaborating"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Join Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpenIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Share Your Knowledge</h3>
              <p className="text-gray-600">
                Create posts to share your expertise with the community. Help
                others learn and grow while establishing yourself as an expert.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Test Your Skills</h3>
              <p className="text-gray-600">
                Challenge yourself with quizzes on various topics. Track your
                progress and identify areas for improvement.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <UsersIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Connect with Others</h3>
              <p className="text-gray-600">
                Join a community of learners and experts. Collaborate, discuss,
                and build connections with like-minded individuals.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Posts Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Posts</h2>
            <Link
              to="/dashboard"
              className="text-indigo-600 font-medium hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border rounded-lg shadow-md p-4"
              >
                <div className="flex items-center mb-4">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://t4.ftcdn.net/jpg/08/23/95/89/360_F_823958944_1c9covIC7Tl7eyJtWoTiXc0L4vP6f43q.jpg"
                    alt={post.userName}
                  />
                  <div className="ml-3">
                    <span className="text-sm font-semibold block">
                      {post.userName}
                    </span>
                    <span className="text-gray-600 text-xs">
                      {post.createdDate.toString().split("T")[0]}
                    </span>
                  </div>
                </div>
                <img
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  src={post.postImage}
                  alt={post.postName}
                />
                <h3 className="text-lg font-bold mb-2">{post.postName}</h3>
                <p className="text-gray-600 text-sm">{post.postDescription}</p>
                <div className="flex items-center justify-between mt-3 mb-2">
              <div className="flex gap-5">
                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
              </div>
              <div className="flex">
                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
              </div>
            </div>
            <div className="font-semibold text-sm mt-2 mb-4">92,372 likes</div>
              </div>
             
            ))}
          </div>
          
        </div>
      </section>
      {/* Featured Quizzes Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Quizzes</h2>
            <Link
              to="/dashboard"
              className="text-indigo-600 font-medium hover:underline"
            >
              View All
            </Link>
          </div>
          {quizzesLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  id={quiz.id}
                  title={quiz.title}
                  description={quiz.description}
                  questionsCount={quiz.questions.length}
                  timeInMinutes={quiz.timeInMinutes}
                  difficulty={quiz.difficulty}
                  participants={quiz.participants}
                  category={quiz.category}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 px-4 bg-indigo-700 text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Sharing Your Knowledge?
          </h2>
          <p className="text-lg mb-8 text-indigo-100">
            Join our community today and start sharing your expertise, learning
            new skills, and connecting with others.
          </p>
          <Link to="/signup">
            <Button variant="primary" size="lg">
              Create an Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
export default Home;
