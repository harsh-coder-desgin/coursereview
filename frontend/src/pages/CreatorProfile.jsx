import { useState } from "react";
import CourseCard from "../components/CourseCard";

const CreatorProfile = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [courses, SetCourses] = useState([
    { id: 1, img: "/backendtest.png", des: "At W3Schools you will find complete references about HTML elements, attributes, events, color names,..", title: "Complete Python Programming lanuage ", name: "Chai aur code", star: "⭐⭐⭐⭐⭐ 1.2k", p: "100₹", d: "150" },
    { id: 2, img: "/backendtest.png", des: "At W3Schools you will find complete references about HTML elements, attributes, events, color names,..", title: "Complete Python Programming lanuage ", name: "Chai aur code", star: "⭐⭐⭐⭐⭐ 1.2k", p: "100₹", d: "150" },
    { id: 3, img: "/backendtest.png", des: "At W3Schools you will find complete references about HTML elements, attributes, events, color names,..", title: "Complete Python Programming lanuage ", name: "Chai aur code", star: "⭐⭐⭐⭐⭐ 1.2k", p: "100₹", d: "150" },
    { id: 4, img: "/backendtest.png", des: "At W3Schools you will find complete references about HTML elements, attributes, events, color names,..", title: "Complete Python Programming lanuage ", name: "Chai aur code", star: "⭐⭐⭐⭐⭐ 1.2k", p: "100₹", d: "150" },
  ])
  return (
    <div className="bg-[#eef0ff] min-h-screen flex flex-col items-center py-10">
      {/* Header */}
      <div className="bg-white shadow-md rounded-md w-[95%] p-6 flex flex-col sm:flex-row items-center gap-5">
        <img
          src='/creatorprofile1.png'
          alt="Profile"
          className="w-44 h-44 rounded-full border border-gray-300"
        />
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Code with Harry</h1>
          <div className="flex flex-wrap items-center text-gray-600 mt-2 text-sm">
            <span className="flex items-center mr-4">
            </span>
            <span className="mr-4">👨‍🎓 1,222 students</span>
            <span>📚 122 Courses</span>
          </div>
          <a
            href="https://www.chaicode.com"
            className="text-blue-500 text-sm block mt-1 hover:underline"
          >
            https://www.chaicode.com
          </a>
          <div className="flex items-center gap-4 mt-2 text-gray-600 text-xl">

          </div>
        </div>
      </div>

      {/* About + Tabs */}
      <div className="bg-white shadow-md rounded-md w-[96%]  mt-8 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* About me */}
          <div className="col-span-1 border border-gray-300 p-4 rounded-md text-gray-600 text-sm leading-relaxed">
            <h2 className="text-gray-800 font-semibold mb-2">About me</h2>
            <p>
              HTML stands for HyperText Markup Language. It is the standard
              language used to create and structure content on the web. It tells
              the web browser how to display text, links, images, and other
              forms of multimedia on a webpage. HTML sets up the basic structure
              of a website, and then CSS and JavaScript add style and
              interactivity to make it look and function better.
            </p>
          </div>

          {/* Courses / Review */}
          <div className="col-span-3">
            <div className="flex border-b border-gray-300 mb-4">
              <button
                onClick={() => setActiveTab("courses")}
                className={`px-4 py-2 text-[16px] font-medium ${activeTab === "courses"
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-gray-500"
                  }`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab("review")}
                className={`px-4 py-2 text-[16px] font-medium ${activeTab === "review"
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-gray-500"
                  }`}
              >
                Review
              </button>
            </div>

            {activeTab === "courses" ? (
              <>
                {/* Search */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search course in chair our code"
                    className="w-full border py-3 border-gray-300 rounded-md p-2 text-sm"
                  />
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-3">
                  {courses.map((course) => (
                    <div key={course.id}>
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-6 mt-6">
                {[
                  {
                    id: 1,
                    name: "ashishchanchlanivines",
                    rating: 5,
                    text: "for people telling i copied someone, i made this video 3 days back :) hate me as much as you want to; i have been making vines for the past 3 years :) and i copy no one :)",
                  },
                  {
                    id: 2,
                    name: "ashishchanchlanivines",
                    rating: 4,
                    text: "for people telling i copied someone, i made this video 3 days back :) hate me as much as you want to; i have been making vines for the past 3 years :) and i copy no one :)",
                  },
                  {
                    id: 3,
                    name: "ashishchanchlanivines",
                    rating: 5,
                    text: "for people telling i copied someone, i made this video 3 days back :) hate me as much as you want to; i have been making vines for the past 3 years :) and i copy no one :)",
                  },
                  {
                    id: 4,
                    name: "ashishchanchlanivines",
                    rating: 5,
                    text: "for people telling i copied someone, i made this video 3 days back :) hate me as much as you want to; i have been making vines for the past 3 years :) and i copy no one :)",
                  },
                ].map((review) => (
                  <div
                    key={review.id}
                    className="flex gap-4 items-start border-b border-gray-200 pb-4"
                  >
                    {/* Avatar */}
                    <div className="w-10 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
                      {review.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Review Content */}
                    <div>
                      <h4 className="font-semibold text-blue-700">
                        {review.name}
                      </h4>

                      {/* Rating */}
                      <div className="flex text-yellow-400 mb-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
