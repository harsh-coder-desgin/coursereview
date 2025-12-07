import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';


function Home() {
  const [courses, SetCourses] = useState([
    { id: 1, img: "/backendtest.png", des: "At W3Schools you will find complete references about HTML elements, attributes, events, color names,..", title: "Complete Python Programming lanuage ", name: "Chai aur code", star: "⭐⭐⭐⭐⭐ 1.2k", p: "100₹", d: "150" },
    { id: 2, img: "/backendtest.png", des: "At W3Schools you will find complete references about HTML elements, attributes, events, color names,..", title: "Complete Python Programming lanuage ", name: "Chai aur code", star: "⭐⭐⭐⭐⭐ 1.2k", p: "100₹", d: "150" },
    { id: 3, img: "/backendtest.png", des: "At W3Schools you will find complete references about HTML elements, attributes, events, color names,..", title: "Complete Python Programming lanuage ", name: "Chai aur code", star: "⭐⭐⭐⭐⭐ 1.2k", p: "100₹", d: "150" },
    { id: 4, img: "/backendtest.png", des: "At W3Schools you will find complete references about HTML elements, attributes, events, color names,..", title: "Complete Python Programming lanuage ", name: "Chai aur code", star: "⭐⭐⭐⭐⭐ 1.2k", p: "100₹", d: "150" },
  ])
  return (
    <div>
      <div className="relative h-[80vh] flex items-center justify-center bg-cover bg-center bg-[url(/heroimage.png)]">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-semibold mb-6 leading-snug text-blue-400">
            Unlock Your Potential <br /> Find The Perfect Course
          </h1>

          <div className="flex justify-center gap-4">
            <Link to='/explore'>
              <button className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition">
                Explore Courses
              </button>
            </Link>
            <Link to='/readreview'>
              <button className="px-6 py-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition">
                Read Reviews
              </button>
            </Link>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Section Title */}
        <h2 className="text-3xl font-semibold text-center mb-10">
          Trending Courses
        </h2>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Image (Half Width) */}
          <div className="flex justify-center">
            <img
              src="/trendingcourse.png"
              alt="Trending Course"
              className="rounded-2xl w-full h-[860px] object-cover shadow-md"
            />
          </div>

          {/* Right Courses Grid (Half Width) */}
          <div className="grid grid-cols-2 gap-28 pb-20">
            {courses.map((course) => (
              <div key={course.id} className='-mb-20'>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Top-Rated Instructors Section ===== */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold">Top-Rated Instructors</h2>
            <p className="text-gray-500 text-lg mt-2">
              Learn essential career and life skills
            </p>
          </div>

          {/* Instructor Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-320 ml-25">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden group shadow-md hover:shadow-lg transition"
              >
                <img
                  src="/demoimg.png"
                  alt="Instructor"
                  className="w-full h-90 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end text-white p-4">
                  <h3 className="font-medium text-lg">Chai aur code</h3>
                  <p className="text-sm">Famous YouTuber</p>
                </div>
              </div>
            ))}
          </div>

          {/* ===== Find Best Course Section ===== */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-20 bg-white px-6 md:px-16 mr-20 mt-20 ">
            {/* Left Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="/homeimg.png"
                alt="Find course"
                className="shadow-md w-[400px] md:w-[500px] object-cover"
              />
            </div>

            {/* Right Text Section */}
            <div className="w-100 text-center md:text-left space-y-7">
              <h2 className="text-4xl font-semibold text-blue-900">
                Find the best course for you now
              </h2>
              <p className="text-gray-500 text-sm md:text-base max-w-md">
                Create your free account to save favorite courses, post reviews, and get smarter suggestions.
              </p>
              <button className="bg-blue-900 text-white px-6 py-2 text-[15px] hover:bg-blue-800 transition">
                Sign up
              </button>
            </div>
          </div>

          {/* ===== Why Choose Us Section ===== */}
          <div className="bg-white text-center py-16 px-6">
            {/* Top Heading */}
            <p className="text-blue-700 tracking-[6px] uppercase text-sm mb-2">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-14">
              Why Choose Us
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center transform sm:translate-y-8 transition duration-300 hover:translate-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xs">
                  <img src="/verfiylogo.png" alt="Verified" className="w-10 h-10 mx-auto mb-4" />
                  <p className="text-gray-900 font-medium mb-1">01</p>
                  <h3 className="font-semibold text-gray-800 mb-2">Verified & Honest Reviews</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    All course reviews are written by real learners. We ensure authenticity so you can make confident learning decisions.
                  </p>
                </div>
              </div>

              {/* Feature 2 (Center card - raised higher) */}
              <div className="flex flex-col items-center text-center transform sm:-translate-y-8 transition duration-300 hover:translate-y-[-20px]">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-xs">
                  <img src="/garph.png" alt="Compare" className="w-10 h-10 mx-auto mb-4" />
                  <p className="text-gray-900 font-medium mb-1">02</p>
                  <h3 className="font-semibold text-gray-800 mb-2">Compare Courses Easily</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Quickly compare ratings, instructors, and course outcomes to choose the program that fits your goals best.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center transform sm:translate-y-8 transition duration-300 hover:translate-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xs">
                  <img src="/whychooseimg.png" alt="Learn" className="w-10 h-10 mx-auto mb-4" />
                  <p className="text-gray-900 font-medium mb-1">03</p>
                  <h3 className="font-semibold text-gray-800 mb-2">Learn from Trusted Creators</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Discover top-rated instructors with proven expertise and thousands of satisfied students worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home
