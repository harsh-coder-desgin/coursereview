import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import authuser from "../auth/authuser"
function CourseDetail() {
  const { id } = useParams();
  const [courses, SetCourses] = useState()
  const [activeTab, setActiveTab] = useState("Courses");
  const [openChapter, setOpenChapter] = useState(2);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You rated ${rating} stars and wrote: ${review}`);
  };
  const toggleChapter = (id) => {
    setOpenChapter(openChapter === id ? null : id);
  };

  const ratingData = [
    { stars: 5, percent: 75 },
    { stars: 4, percent: 21 },
    { stars: 3, percent: 3 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0.5 },
  ];
  useEffect(() => {
    authuser.coursedetail(id).
      then((data) => {
        SetCourses(data.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Content */}
      <div className="lg:col-span-2">
        {/* Top Info */}
        <p className="text-gray-500">{courses?.coursecategory}</p>
        <h1 className="text-2xl font-semibold mt-1">{courses?.coursetitle}</h1>
        <p className="text-gray-600 mt-1">
          {courses?.ownername} ⭐ {courses?.rating} <span className="text-gray-500">({courses?.totalreview})</span>
        </p>

        {/* Course Image */}
        <div className="mt-6 rounded-lg overflow-hidden shadow">
          <img
            src={courses?.courseimage}
            alt="Course Thumbnail"
            className="w-full object-cover"
          />
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto py-10 px-4">
          {/* Tabs */}
          <div className="flex space-x-8 border-b  border-gray-300 text-gray-600 font-medium">
            {["Description", "Courses", "Review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 transition-all ${activeTab === tab
                  ? "border-b-2 border-red-500 text-black font-semibold"
                  : "border-b-2 border-transparent hover:text-black"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* === Description Tab === */}
          {activeTab === "Description" && (
            <div className="mt-6 text-gray-700 leading-relaxed">
              <div className="mt-10 border border-gray-300 rounded-md divide-y">

                {courses.whatlearnformcourse?.map((chapter, index) => (
                  <div key={index}>
                    {/* Chapter Button */}
                    <button
                      onClick={() => toggleChapter(index)}
                      className={`w-full flex justify-between items-center px-4 py-3 font-semibold text-[17px] text-left hover:bg-gray-50 ${openChapter === index ? "text-blue-700" : "text-black"
                        }`}
                    >
                      <span>Chapter {index + 1}: {chapter.title}</span>
                      <span>{openChapter === index ? "▲" : "▼"}</span>
                    </button>

                    {/* Lessons */}
                    {openChapter === index && (
                      <div className="bg-gray-50 px-6 py-4 space-y-2 text-[15px]">
                        {chapter.lessons?.map((item, i) => (
                          <p key={i} className="text-gray-600">
                            <span className="text-yellow-500 mr-1">◆</span>
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

              </div>
            </div>
          )}

          {/* === Courses Tab === */}
          {activeTab === "Courses" && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">About Course</h2>
              <p className="text-gray-500 leading-relaxed max-w-2xl break-words">
                {courses?.description}
              </p>

              {/* Course Rating */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-3">Course Rating</h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8">
                  <div className="border border-gray-200 rounded-lg p-4 w-full sm:w-52 text-center mb-4 sm:mb-0">
                    <p className="text-4xl font-semibold">4.8</p>
                    <p className="text-yellow-500 text-xl">★★★★★</p>
                    <p className="text-sm text-gray-500 mt-1">Course Rating</p>
                  </div>

                  <div className="flex-1">
                    {ratingData.map((item) => (
                      <div
                        key={item.stars}
                        className="flex items-center text-sm text-gray-600 mb-1"
                      >
                        <span className="w-24">
                          {"★".repeat(item.stars)}{" "}
                          <span className="text-gray-500">{item.stars} Star</span>
                        </span>
                        <div className="flex-1 bg-gray-200 h-2 rounded-full">
                          <div
                            className="bg-orange-400 h-2 rounded-full"
                            style={{ width: `${item.percent}%` }}
                          ></div>
                        </div>
                        <span className="ml-3">{item.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Section */}
              <div className="mt-10 px-4">
                {/* Title */}
                <h3 className="text-[22px] flex justify-between font-semibold mb-5">
                  <span className="text-green-600"><a className='text-black'>Review </a>(mostly positive)</span>
                  <select
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm font-semibold bg-white hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-400"
                    defaultValue="5"
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Star Rating</option>
                    <option value="4">4 Star Rating</option>
                    <option value="3">3 Star Rating</option>
                    <option value="2">2 Star Rating</option>
                    <option value="1">1 Star Rating</option>
                  </select>
                </h3>

                {/* Rating Filter */}
                <div className="flex justify-end mb-4">

                </div>

                {/* Review Card */}
                <div className="">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
                      A
                    </div>

                    {/* Name + Stars */}
                    <div>
                      <p className="font-semibold text-blue-700 text-[15px]">
                        ashishchanchlanvines
                      </p>
                      <p className="text-yellow-500 text-[15px]">★★★★★</p>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="mt-2 text-gray-700 text-[15px] leading-relaxed ml-13">
                    for people telling I copied someone, I made this video 3 days back :)
                    hate me as much as you want to, I have been making vines from the past
                    3 years :) and I copy no one :)
                  </p>
                </div>

                {/* Load More Button */}
                <div className="flex justify-center mt-10">
                  <button className="border border-gray-400 px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition">
                    Load more review
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* === Review Tab === */}
          {activeTab === "Review" && (
            <div className="mt-8">
              {/* Title */}
              <h2 className="text-[18px] font-semibold mb-4">
                Review this course
              </h2>

              {/* Star Rating */}
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-3xl cursor-pointer ${(hover || rating) >= star
                      ? "text-orange-500"
                      : "text-gray-300"
                      }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Review Textarea */}
              <form onSubmit={handleSubmit}>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your Experience"
                  rows="7"
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-400"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="mt-28">
        <div className="bg-white   p-6">
          {courses?.coursetype !== "Free" &&
            <>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold">{courses?.finalPrice}</p>
                {courses?.discount !== 0 && <p className="text-gray-400 line-through">{courses?.price}</p>}
              </div>
              <p className="text-sm text-purple-600 font-semibold mt-1">{courses?.discount}%OFF</p>
            </>
          }

          {courses?.coursetype === "Free" && <button className="w-full mt-5 bg-green-600 text-white py-2 rounded-lg">
            Free
          </button>}

          <ul className="mt-5 space-y-3 text-gray-700 text-sm">
            <li className="flex items-center gap-2">
              {courses?.whatlearnformcourse.length} Sections
            </li>
            <li className="flex items-center gap-2">
              {courses?.whatlearnformcourse.length * 5} Leature
            </li>
            <li className="flex items-center gap-2">
              {courses?.courselength} length of course
            </li>
            <li className="flex items-center gap-2">
              Voice:{courses?.courselanguage}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail
