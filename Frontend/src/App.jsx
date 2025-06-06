import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Courses from './pages/Courses/Courses';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import UpdateProfile from './pages/UpdateProfile/UpdateProfile';
import CourseCard from './pages/Courses/CourseCard/CourseCard';
import NotFound from './pages/NotFound/NotFound';
import Course from './pages/Course/Course';
import Payment from './pages/Payment/Payment';
import MyCourses from './pages/MyCourses/MyCourses';
import ResetPassword from './pages/Reset/ResetPassword';
import Forgot from './pages/Forgot/Forgot';
import RegCourse from './pages/MyCourses/Course/RegCourse';
import Leader from './pages/LeaderBoard/Leader';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseCard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<UpdateProfile />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/my-courses/course/:courseId" element={<RegCourse />} />
        <Route path="/leaderboard" element={<Leader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />

      <Footer />
    </BrowserRouter>
  );
}

export default App;
