import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import { changetab } from '../../store/addCourseSlice'
import authcourse from '../../auth/authcourse'
function PublishCourse() {
  const dispatch = useDispatch()
  const [message, setMessage] = useState({ text: "", type: "" });

  localStorage.setItem("tabname", "publish")
  let coursedata = localStorage.getItem("courseData")
  let finalcoursedata = JSON.parse(coursedata);
  let courseimage
  if (finalcoursedata?.imagecourse) {
    courseimage = JSON.parse(finalcoursedata?.imagecourse)
  }

  const finlasubmit = async (e) => {
    e.preventDefault();
    let not = JSON.parse(finalcoursedata.whatlearn)
    let cleanData = Object.fromEntries(
      Object.entries(finalcoursedata).map(([key, value]) => [
        key,
        typeof value === "string" ? value.replace(/^"|"$/g, "") : value,
      ])
    );

    try {
      const data = await authcourse.addcourse({ whatlearnformcourse: not[0], ...cleanData, courseimage })
      if (data) {
        localStorage.removeItem('courseData');
        finalcoursedata = ''
        setMessage({ text: "✅ Course created successfully!", type: "success" });
      }
    } catch (error) {
      console.log(error.response.data.message);
      setMessage({ text: error.response.data.message, type: "error" });
    }
  }
  return (
    <div>
      <div className='border-b-1 border-gray-300'>
        {message.text && (
          <h1
            className={`text-center text-lg font-semibold mt-3 p-3 transition-all duration-300
      ${message.type === "success" ? "bg-green-100 text-green-700 border border-green-400" : ""}
      ${message.type === "error" ? "bg-red-100 text-red-700 border border-red-400" : ""}`
            }
          >
            {message.text}
          </h1>
        )}  
        <h1 className='font-bold ml-10 mt-8 mb-6 text-[21px]'>Publish Course</h1>
      </div>
      <form onSubmit={finlasubmit}>
        <div className='border-b-1 border-gray-300 pt-3 pb-13'>
          <div className='w-15/16 ml-10 mt-5 space-y-7'>
            <label className='text-lg'>Title</label>
            <Input className="flex flex-col mt-4  border border-gray-300 w-120 mt-2  py-3 p-2 pl-4 placeholder:text-[15px]" readOnly value={finalcoursedata?.title && finalcoursedata?.title.replace(/^"|"$/g, "") || 'No data yet'} />
            <label className='text-lg'>Category</label>
            <Input className="flex flex-col mt-5 border border-gray-300 w-120 mt-2  py-3 p-2 pl-4 placeholder:text-[15px]" readOnly value={finalcoursedata?.coursecategory && finalcoursedata?.coursecategory.replace(/^"|"$/g, "") || 'No data yet'} />

          </div>
        </div>

        <div className='border-b-1 border-gray-300 pb-6'>
          <div className='w-15/16 ml-10 mt-5 space-y-4'>
            <label className='text-lg'>Course Thumnail</label>
            <div className='flex mt-5'>
              <img
                src={courseimage ? courseimage[0] : '/imgaelogo.png'}
                alt='image' className='h-40 w-55' />
            </div>
          </div>
        </div>
        <div className='border-b-1 border-gray-300 pt-3 pb-13'>
          <div className='w-15/16 ml-10 mt-5 space-y-4'>
            <label className='text-lg'>Course Type</label>
            <Input className="flex flex-col mt-4  border border-gray-300 w-120 mt-2  py-3 p-2 pl-4 placeholder:text-[15px]" readOnly value={finalcoursedata?.coursetype && finalcoursedata?.coursetype.replace(/^"|"$/g, "") || 'No data yet'} />
            <div className='flex mt-10'>
              <div>
                <label>Price</label>
                <Input className="flex flex-col mt-4  border border-gray-300 w-120 mt-2  py-3 p-2 pl-4 placeholder:text-[15px]" readOnly value={finalcoursedata?.price && finalcoursedata?.price.replace(/^"|"$/g, "") || 'No data yet'} />
              </div>
              <div className='ml-13'>
                <label>Discount</label>
                <Input className="flex flex-col mt-4  border border-gray-300 w-120 mt-2  py-3 p-2 pl-4 placeholder:text-[15px]" readOnly value={finalcoursedata?.discount && finalcoursedata?.discount.replace(/^"|"$/g, "") || 'No data yet'} />
              </div>
            </div>
            <div className='flex justify-between mt-10 pb-12'>
              <Button bgColor='' textColor='' type="button" onClick={() => dispatch(changetab("pricing"))}
                className='border-2 border-gray-300 px-4 py-2 mr-2 cursor-pointer text-gray-400 hover:bg-gray-50'>Prevous</Button>
              <Button bgColor='bg-[#499FD6]' textColor='text-white' type="submit" className=' px-4 py-2 mr-2 cursor-pointer border hover:text-[#499FD6] hover:bg-white'>Submit for review</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse
