import React from 'react'
import Button from './Button'
import StarRating from './StarComponent'
function CourseCard({ course }) {
    return (
        <div className='w-84 bg-hite p3'>
            <div className=''>
                {course?.discount != 0 && <Button bgColor='bg-[#499FD6]' className='px-2 py-2 font-bold rounded-xl text-[12px] absolute ml-2 mt-2'>{course?.discount}% OFF</Button>}
                <img src={course?.courseimage} alt='img' className='rounded-xl h-50 w-90' />
            </div>
            <div className='space-y-1'>
                <h1 className='font-medium text-xl mt-2'>{course?.coursetitle} </h1>
                <p className='flex text-sm text-[#499FD6] mt-1'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        className="w-5 h-5">
                        <path fill="#767676" d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z" />
                    </svg>
                    {course?.ownername}</p>
                <div className='flex space-x-[2px]'>
                    <StarRating rating={course?.rating} />
                    <p className='ml-1'>{course?.totalreview}</p>
                </div>
                <div className='flex'>
                    {course.coursetype != "Free" && <h1 className='font-bold text-2xl'>{course?.finalPrice}</h1>}
                    {course.coursetype != "Free" && course?.discount != 0 && <h1 className='line-through font-extralight text-2xl ml-2 text-gray-500'>{course?.price}<span className='font-extralight ml-1'>₹</span></h1>}
                    {course.coursetype === "Free" && <h1 className='text-2xl text-green-700'>Free</h1>}
                </div>
            </div>
        </div>
    )
}

export default CourseCard
