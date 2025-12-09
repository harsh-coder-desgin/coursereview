import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CreatorHeading from './CreatorHeading';
import RecentnewReview from './RecentnewReview';
import OverReviewChart from './Chart/OverReviewChart';
import ReviewBox from './ReviewBox';
import { useDispatch ,useSelector } from 'react-redux'
import authcourse from '../auth/authcourse'
import { detailcourse } from '../store/courseAuthSlice';

function ViewCourseDetail() {
    const { id } = useParams()
    console.log(id);
    const [dataavreagerating, SetDataavreagerating] = useState()
    const [changetab, Setchangetab] = useState("Today")

    const onecoursedata = useSelector(state => state.courseAuth.onecourse)
    const dispatch = useDispatch();

    useEffect(() => {
        if (onecoursedata === null) {
            authcourse.getcourse(id)
                .then((data) => {
                    SetDataavreagerating(data.data.data)
                    console.log(data.data.data);
                    dispatch(detailcourse(id))
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        
        dispatch(detailcourse(id))
        SetDataavreagerating(onecoursedata)
    }, [onecoursedata])
    
    return (
        <div>
            <CreatorHeading heading="My Courses" />
            <div className='bg-gray-100 h-full mt-5 pb-11'>
                <div className='pt-8'>
                    <div className='flex bg-white borer ml-15 pt-1 w-10/11'>
                        <img src={dataavreagerating?.courseimage} alt='logo' className='h-70 w-110 p-4' />
                        <div className='w-191 mt-7'>
                            <h1 className='font-medium text-2xl'>{dataavreagerating?.coursetitle}</h1>
                                <p className="text-gray-500 text-sm mt-2 max-w-2xl break-words">
                                {dataavreagerating?.description}
                                </p>
                            <div className=' flex justify-between border-b-1 border-gray-300 pb-3 '>
                                <p className='mt-7 ml-1 text-sm'>Star {dataavreagerating?.rating} <a className='text-gray-400'>({dataavreagerating?.totalreview} rating)</a></p>
                            </div>
                            <div className='flex'>
                              { dataavreagerating?.coursetype !== "Free" ? 
                              <div className='flex mb-2'>
                                
                                  { dataavreagerating?.discount !== 0 && <p className='line-through font-extralight text-2xl mt-3 ml-1 text-red-500'>{dataavreagerating?.price}</p>}
                                  <div className='ml-2'>
                                        <p className='font-meduim  text-gray-500 text-2xl mt-3 ml-1'>{dataavreagerating?.finalPrice}</p>
                                        <p className='text-gray-500 text-sm ml-1'>Course price</p>
                                    </div>
                                 </div> : <p className='text-green-900 text-xl px-4 mt-2  mb-3 rounded-1px py-2 bg-green-200 ml-1'>Free</p>

                                }
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 mr-10'>
                        <RecentnewReview time={changetab} />
                        <ReviewBox/>
                    </div>

                    <div className='bg-white ml-15 mr-10'>
                        {/* <OverReviewChart monthlyreview={dataavreagerating.monthlyreview || []} /> */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ViewCourseDetail
