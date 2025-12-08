import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import { Button } from '../components'
import { Link } from 'react-router-dom'
import authuser from '../auth/authuser'
function ExploreCourse() {
  const [activeTab, setActiveTab] = useState("All");

  const [courses, SetCourses] = useState([])
  const techFilters = ["All", "Programming Languages",
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
    "Database & SQL"];

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  }

  useEffect(() => {
    authuser.allfindcoursebytags({ activeTab })
      .then((data) => {
        console.log(data);
        SetCourses(data.data.data)
      })
  }, [activeTab])
  return (
    <div>
      {/* ===== Start Learning Today Section ===== */}
      <div className="py-10 px-6 ml-6 bg-white ml-15">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Start Learning Today</h2>
          <p className="text-gray-600 text-sm md:text-base mt-1 w-140">
            Choose from a wide range of subjects, taught by trusted instructors with real-world expertise
          </p>
        </div>
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 whitespace-nowrap pb-2">
            {techFilters.map((item, index) => (
              <button
                key={index}
                onClick={() => handleChangeTab(item)}
                className={`px-5 py-2 rounded-lg text-sm font-medium border
              ${activeTab === item
                    ? "bg-[#071B83] text-white border-[#071B83]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                  }
            `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-4 gap-1 -mt-12 w-360 ml-20">
          {courses.map((course) => (
            <div key={course._id}>
           <Link to={`/coursedetail/${course._id}`}>
              <div className="mt-7 cursor-pointer">
                <CourseCard course={course} />
              </div>
            </Link>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-gray-600 text-center mt-1">
          No Course Found
        </h1>
      )}
    </div>
  )
}


export default ExploreCourse