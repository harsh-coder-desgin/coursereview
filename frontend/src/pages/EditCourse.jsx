import React, { useEffect, useState } from 'react'
import CreatorHeading from '../components/CreatorHeading'
import { Button } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import BasicInformation from '../components/CreateCourseatab/BasicInformation'
import AdvanceInformation from '../components/CreateCourseatab/AdvanceInformation'
import PriceingCourse from '../components/CreateCourseatab/PriceingCourse'
import { changetab2 } from '../store/addCourseSlice'
import { useParams } from 'react-router-dom'
import  authcourse  from '../auth/authcourse'
import { setEditcourse } from '../store/courseAuthSlice'

function EditCourse() {
  const { id } = useParams()
  console.log(id);
  
  const [tabsCompleted, setTabsCompleted] = useState({
    "basic": false,
    "advanced": false,
    "pricing": false,
    "publish": false,
  });

  const [course, SetCourse] = useState(null)
  
  const detailcourse = useSelector(state => state.courseAuth.edit)

  const swicthtab = useSelector(state => state.addcourseAuth.tab2)
  const dispatch = useDispatch()

  const handleComplete = (tabName) => {
    dispatch(changetab2(tabName))
    setTabsCompleted((prev) => ({ ...!prev, [tabName]: true, }));
  };

  let swidtchdata = localStorage.getItem("tabname2")

  useEffect(() => {
    if (swicthtab != null) {
      handleComplete(swicthtab);
    } else {
      if (!swidtchdata) {
        handleComplete("basic");
      }
      if (swidtchdata) {
        handleComplete(swidtchdata);
      }
    }
    if (detailcourse === null) {
      authcourse.getcourse(id)
      .then((data) => {
        dispatch(setEditcourse(id))
        SetCourse(data.data.data)
        console.log(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      }) 
    }else{
      dispatch(setEditcourse(id))
      if (detailcourse._id === id) {
        SetCourse(detailcourse)
      }
    }
    
  }, [swicthtab,detailcourse])

  // const handleclick = async()=>{
  //   try {
  //       const res = await authuser.updatecourse({"data":"123"})
  //       console.log(res.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  // }

  return (
    <div>
      <CreatorHeading heading={"Edit New Course"} />
      <div className='bg-gray-100 h-full mt-5 pb-21'>
        <div className='pt-12 pl-12 bg'>
          <div className='bg-white w-300 h-full'>
            <div className='flex h-15'>
              <Button className={`font-medium  w-full ${tabsCompleted.basic ? 'border-b-4 border-[#499FD6]' : 'border-b-2 border-gray-200 text-gray-400'}`} bgColor='' textColor='text-black' onClick={() => handleComplete("basic")}><img src='/basicinformation.png' className='h-10 w-10 absolute left-95 top-[154px]' />Basic information</Button>
              <Button className={`font-medium  w-full ${tabsCompleted.advanced ? 'border-b-4 border-[#499FD6]' : 'border-b-2 border-gray-200 text-gray-400'}`} bgColor='' textColor='text-black' onClick={() => handleComplete("advanced")}> <img src='/detail.png' className='h-8 w-8 absolute left-195 top-[158px]' />Advance information</Button>
              
              <Button className={`font-medium  w-full ${tabsCompleted.pricing ? 'border-b-4 border-[#499FD6]' : 'border-b-2 border-gray-200 text-gray-400'}`} bgColor='' textColor='text-black' onClick={() => handleComplete("pricing")}><img src='/price.png' className='h-9 w-8 absolute right-71 top-40' />Priceing  Course</Button>
              {/* <button onClick={handleclick}>Clikc</button> */}
            </div>
           { course !== null && <div>
              {tabsCompleted.basic && <BasicInformation course={course} />}
              {tabsCompleted.advanced && <AdvanceInformation course={course} />}
              {tabsCompleted.pricing && <PriceingCourse course={course} />}
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCourse
