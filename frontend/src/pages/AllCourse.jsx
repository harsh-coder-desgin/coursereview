import { useEffect, useState } from 'react'
import CreatorHeading from '../components/CreatorHeading'
import { Button, Input } from '../components'
import Select from '../components/Select'
import CourseCard from '../components/CourseCard'
import { Link } from 'react-router-dom'
import authcourse from '../auth/authcourse'
import { useDispatch ,useSelector } from 'react-redux'
import { allcourse } from '../store/courseAuthSlice'

function AllCourse() {
    const [courses, SetCourses] = useState([])
    const [selected, setSelected] = useState("All Categories");

    const coursedata = useSelector(state => state.courseAuth.courses)
    const dispatch = useDispatch();

    useEffect(() => {
        if (coursedata.length === 0) {
            authcourse.allcourses()
                .then((data) => {
                    SetCourses(data.data.data)
                    dispatch(allcourse(data.data.data))
                })
                .catch((err) => {
                    console.log(err);
                })   
        }
        SetCourses(coursedata)
    }, [coursedata])
    
    console.log(selected);
    
    return (
        <div>
            <CreatorHeading heading="My Courses" />
            <div className='bg-gray-100 h-full mt-5 pb-11'>
                <div className='ml-16 pt-15'>
                    <div className='flex '>
                        <Input label="Search"
                            onChange={async(e)=> {
                                const res = await authcourse.searchonecreatorcoruse({course:e.target.value,category:selected})
                                SetCourses(res.data.data)
                            }}
                            className='bg-white flex flex-col border border-gray-300 w-110 mt-3 pl-5 py-[15px] placeholder:text-sm' 
                            placeholder="Search in your courses" />
                        <div className='mr-12'>
                        <Select
                            onChange={async(e) => {
                                setSelected(e.target.value)
                                const res = await authcourse.coursebytags({tags:e.target.value})
                                SetCourses(res.data.data)
                            }}
                            value={selected}
                            label="Category"
                            options={["All Categories",
                                "Programming Languages",
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
                                "Database & SQL"
                            ]}
                            className='bg-white w-70 px-2 py-[16px] border border-gray-300 flex mt-2'
                        />
                        </div>
                    </div>
            { courses.length > 0 ? <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                        {courses.map((course) => (
                            <div key={course._id}>
                                <div className="absolute inline-block mt-2 mr-9 ml-71 group">
                                    <Button
                                        bgColor=""
                                        textColor=""
                                        className="flex bg-white w-10 h-10  items-center justify-center text-center pb-3 rounded-full text-2xl"
                                    >
                                        ...
                                    </Button>

                                    <div className="absolute -right-3 hidden group-hover:block bg-white w-38   border border-gray-200 shadow-lg">
                                        <Link to={`/creator/mycourse/detail/${course._id}`}>
                                            <Button className='mt-2 pr-6 w-full hover:bg-[#499FD6] hover:text-white px-6 py-1' bgColor='' textColor=''
                                            >View Detail</Button>
                                        </Link>
                                        <Link to={`/creator/mycourse/edit/${course._id}`}>
                                            <Button className=' pr-4 w-full hover:bg-[#499FD6] hover:text-white px-6 py-1' bgColor='' textColor=''

                                            >Edit Course</Button>
                                        </Link>
                                        <Button className='mb-2 pr-4 w-full hover:bg-[#499FD6] hover:text-white px-6 py-1' bgColor='' textColor=''

                                        >Delete Course</Button>
                                    </div>
                                </div>
                                <CourseCard course={course} />
                            </div>
                        ))}
                    </div> : <h1 className="text-center mt-20 mr-17 text-2xl font-semibold text-gray-700">
                            No course found
                            </h1>
                            }
                </div>
            </div>
        </div>
    )
}

export default AllCourse
