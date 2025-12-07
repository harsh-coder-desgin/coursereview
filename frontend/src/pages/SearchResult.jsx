import React, { useState } from 'react'
import CourseCard from '../components/CourseCard';

function SearchResult() {
  const [courses, SetCourses] = useState([
    { id: 1, img: "/backendtest.png", des: "At W3Schools you will find complete references about HTML elements, attributes, events, color names,..", title: "Complete Python Programming lanuage ", name: "Chai aur code", star: "⭐⭐⭐⭐⭐ 1.2k", p: "100₹", d: "150" },
    { id: 2, img: "/backendtest.png", des: "At W3Schools you will find complete references about HTML elements, attributes, events, color names,..", title: "Complete Python Programming lanuage ", name: "Chai aur code", star: "⭐⭐⭐⭐⭐ 1.2k", p: "100₹", d: "150" },
    { id: 3, img: "/backendtest.png", des: "At W3Schools you will find complete references about HTML elements, attributes, events, color names,..", title: "Complete Python Programming lanuage ", name: "Chai aur code", star: "⭐⭐⭐⭐⭐ 1.2k", p: "100₹", d: "150" },
    { id: 4, img: "/backendtest.png", des: "At W3Schools you will find complete references about HTML elements, attributes, events, color names,..", title: "Complete Python Programming lanuage ", name: "Chai aur code", star: "⭐⭐⭐⭐⭐ 1.2k", p: "100₹", d: "150" },
  ])
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 p-6 bg-white min-h-screen">

        {/* ===== Left Sidebar Filter ===== */}
        <div className="w-83 bg-white border border-gray-300 rounded-2xl shadow-sm p-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 pl-3">Filter</h2>
            <button className="text-blue-600 text-sm font-medium hover:underline">Clear</button>
          </div>

          {/* Section Function */}
          {[
            {
              title: "Rating",
              content: (
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  {["4.5 && up (2.1k)", "4.0 && up (1.5k)", "3.5 && up (1.2k)", "2.5 && up (1.2k)", "1.5 && up (1.2k)"].map(
                    (text, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          className="accent-blue-600"
                          defaultChecked={i === 0}
                        />
                        <span className="flex items-center gap-1">
                          {"⭐".repeat(5 - i)} <span>{text}</span>
                        </span>
                      </label>
                    )
                  )}
                </div>
              ),
            },
            {
              title: "Video Duration",
              content: (
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  {["0–2 hours (2.1k)", "2–6 hours (1.2k)", "6+ hours (2.1k)"].map(
                    (text, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-blue-600"
                          defaultChecked={i === 1}
                        />
                        <span>{text}</span>
                      </label>
                    )
                  )}
                </div>
              ),
            },
            {
              title: "Categories",
              content: (
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  {["Programming Languages",
                    "Web Development",
                    "Mobile App Development",
                    "Frontend Development",
                    "Backend Development",
                    "Full-Stack Development",
                    "Game Development",
                    "Data Structures & Algorithms",
                    "DevOps & Deployment",
                    "AI & Machine Learning",
                    "Cybersecurity",
                    "Database & SQL"].map(
                      (text, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="accent-blue-600"
                            defaultChecked={i === 1}
                          />
                          <span>{text}</span>
                        </label>
                      )
                    )}
                </div>
              ),
            },
            {
              title: "Software",
              content: (
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <p className="text-gray-500 text-sm">All tools (Auto-detected)</p>
                </div>
              ),
            },
            {
              title: "Level",
              content: (
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  {["All levels", "Beginner", "Intermediate", "Advanced"].map(
                    (level, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="level"
                          className="accent-blue-600"
                          defaultChecked={i === 0}
                        />
                        <span>{level}</span>
                      </label>
                    )
                  )}
                </div>
              ),
            },
            {
              title: "Language",
              content: (
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  {["English", "Hindi"].map(
                    (Language, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="level"
                          className="accent-blue-600"
                          defaultChecked={i === 0}
                        />
                        <span>{Language}</span>
                      </label>
                    )
                  )}
                </div>
              ),
            },
          ].map((section, index) => {
            const [open, setOpen] = React.useState(true);
            return (
              <div key={index} className="relative">
                <div className="border-t border-gray-200 -mx-4 px-4"></div>
                <div className="p-4 transition-all duration-300">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setOpen(!open)}>
                    <h3 className="font-medium text-gray-800 text-sm">
                      {section.title}
                    </h3>
                    <span
                      className={`transform transition-transform duration-300 text-gray-500 ${open ? "rotate-180" : "rotate-0"
                        }`}
                    >
                      ▾
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[600px] opacity-100 mt-2" : "max-h-0 opacity-0"
                      }`}>
                    {section.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 text-lg">
              Showing result of <span className="font-semibold text-gray-800">Dsa</span>
            </p>

            <select
              className="border border-gray-300 rounded-md px-5 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              defaultValue="Most Popular"
            >
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Highest Rated</option>
              <option>Lowest Price</option>
              <option>Highest Price</option>
            </select>
          </div>
          {/* Courses Grid */}
          <div className="grid grid-cols-3 gap-6 h-110">

            {courses.map((course) => (
              <div key={course.id} className="">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default SearchResult
