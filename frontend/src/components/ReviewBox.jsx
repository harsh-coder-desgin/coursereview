import React, { useState } from 'react'
import Button from './Button'
import RatingChart from './Chart/RatingChart';

function ReviewBox() {
  const [ratingtime, SetRatingtime] = useState("Year")
  const [dataavreagerating, SetDataavreagerating] = useState([])

  const stars5 = Array(5).fill(0); 
  const stars4 = Array(4).fill(0); 
  const stars3 = Array(3).fill(0); 
  const stars2 = Array(2).fill(0); 
  const stars1 = Array(1).fill(0); 

  const StarRating = ({ rating }) => {
    const fullStar = (
      <svg xmlns="http://www.w3.org/2000/svg" height="22" width="18" viewBox="0 0 640 640">
        <path fill="#FD8E1F" d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" />
      </svg>
    );

    const halfStar = (
      <svg xmlns="http://www.w3.org/2000/svg" height="22" width="18" viewBox="0 0 640 640">
        <path fill="#FD8E1F" d="M336.1 71.6C336.1 60.5 328.5 50.9 317.7 48.3C306.9 45.7 295.8 50.8 290.7 60.7L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L323 480.1C331 476 336.1 467.7 336.1 458.7L336.1 71.6z" />
      </svg>
    );

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<span key={i}>{fullStar}</span>);
      } else if (rating >= i - 0.5) {
        stars.push(<span key={i}>{halfStar}</span>);
      }
    }


    return <div className="flex">{stars}</div>;
  };
  return (
    <div className='bg-white h-112 ml-15 mt-12'>
      <div className='flex justify-between border-b-1 border-gray-200 '>
        <h1 className='font-medium mt-5 ml-6 mb-3'>Overall Course Rating </h1>
        <div className="relative inline-block mt-5 mr-9 group">
          <Button
            bgColor=""
            textColor=""
            className="flex items-center gap-1 rounded-md hover:text-gray-400"
          >
            {ratingtime}
            <svg
              className="w-5 h-5 transition-transform duration-200 transform group-hover:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              fill="currentColor"
            >
              <path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z" />
            </svg>
          </Button>

          <div className="absolute -right-3 mt-3 hidden group-hover:block bg-white w-32   border border-gray-200 shadow-lg">
            <Button className='px-4 pr-20 w-full py-2 hover:bg-gray-100' bgColor='' textColor=''
              onClick={() => {
                SetRatingtime("Week")
                submitaverage("Week")
              }}
            >Week</Button>
            <Button className='px-4 pr-20 w-full py-2 hover:bg-gray-100' bgColor='' textColor=''
              onClick={() => {
                SetRatingtime("Month")
                submitaverage("Month")
              }}
            >Month</Button>
            <Button className='px-4 pr-20 w-full py-2 hover:bg-gray-100' bgColor='' textColor=''
              onClick={() => {
                SetRatingtime("Year")
                submitaverage("Year")
              }}
            >Year</Button>
          </div>
        </div>
      </div>

      <div className='mt-3 w-138 grid grid-cols-2  pb-4 border-b-1 border-gray-200'>
        <div className='bg-[#FFF2E5] text-center h-46 w-46 ml-6 space-y-1'>
          <p className=' mt-7 text-[42px] font-bold'>{dataavreagerating?.averageRating}</p>
          <div className='flex ml-11 space-x-1'>
            {StarRating({ rating: dataavreagerating?.averageRating })}
          </div>
          <p className='font-medium text-sm'>Overall Rating</p>
        </div>

        <div className='-ml-8'>
          <RatingChart rating={ratingtime} allrating={dataavreagerating?.allrating} />
        </div>

      </div>

      <div>
        <div style={{ display: "flex", gap: "4px" }} className='ml-6 mt-2'>
          {stars5.map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              height="21"
              width="17"
              viewBox="0 0 640 640"
            >
              <path
                fill="#FD8E1F"
                d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
              />
            </svg>
          ))}
          <p className='ml-2 text-gray-500 text-[15px]'>5 Star</p>
          <div className="w-77 bg-gray-200 h-[8px] mt-[7px] ml-3">
            <div className="bg-[#FD8E1F] h-[8px] font-medium  text-center" style={{ width: `${dataavreagerating?.fivestarpercentage}%` }}></div>
          </div>
          <p className='text-[13px] mt1 ml-2'>{dataavreagerating?.fivestarpercentage}%</p>

        </div>
        <div style={{ display: "flex", gap: "4px" }} className='ml-6 mt-2'>
          {stars4.map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              height="21"
              width="17"
              viewBox="0 0 640 640"
            >
              <path
                fill="#FD8E1F"
                d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
              />
            </svg>
          ))}
          <p className='ml-[29px] text-gray-500 text-[15px]'>4 Star</p>
          <div className="w-77 bg-gray-200 h-[8px] mt-[7px] ml-3">
            <div className="bg-[#FD8E1F] h-[8px] font-medium  text-center" style={{ width: `${dataavreagerating?.fourstarpercentage}%` }}></div>
          </div>
          <p className='text-[13px] mt1 ml-2'>{dataavreagerating?.fourstarpercentage}%</p>

        </div>

        <div style={{ display: "flex", gap: "4px" }} className='ml-6 mt-2'>
          {stars3.map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              height="21"
              width="17"
              viewBox="0 0 640 640"
            >
              <path
                fill="#FD8E1F"
                d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
              />
            </svg>
          ))}
          <p className='ml-[50px] text-gray-500 text-[15px]'>3 Star</p>
          <div className="w-77 bg-gray-200 h-[8px] mt-[7px] ml-3">
            <div className="bg-[#FD8E1F] h-[8px] font-medium  text-center" style={{ width: `${dataavreagerating?.threestarpercentage}%` }}></div>
          </div>
          <p className='text-[13px] mt1 ml-2'>{dataavreagerating?.threestarpercentage}%</p>

        </div>

        <div style={{ display: "flex", gap: "4px" }} className='ml-6 mt-2'>
          {stars2.map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              height="21"
              width="17"
              viewBox="0 0 640 640"
            >
              <path
                fill="#FD8E1F"
                d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
              />
            </svg>
          ))}
          <p className='ml-[71px] text-gray-500 text-[15px]'>2 Star</p>
          <div className="w-77 bg-gray-200 h-[8px] mt-[7px] ml-3">
            <div className="bg-[#FD8E1F] h-[8px] font-medium  text-center" style={{ width: `${dataavreagerating?.twostarpercentage}%` }}></div>
          </div>
          <p className='text-[13px] mt1 ml-2'>{dataavreagerating?.twostarpercentage}%</p>

        </div>
        <div style={{ display: "flex", gap: "4px" }} className='ml-6 mt-2'>
          {stars1.map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              height="21"
              width="17"
              viewBox="0 0 640 640"
            >
              <path
                fill="#FD8E1F"
                d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
              />
            </svg>
          ))}
          <p className='ml-[93px] text-gray-500 text-[15px]'>1 Star</p>
          <div className="w-77 bg-gray-200 h-[8px] mt-[7px] ml-3">
            <div className="bg-[#FD8E1F] h-[8px] font-medium  text-center" style={{ width: `${dataavreagerating?.onestarpercentage}%` }}></div>
          </div>
          <p className='text-[13px] mt1 ml-[10px]'>{dataavreagerating?.onestarpercentage}%</p>
        </div>
      </div>
    </div>
  )
}

export default ReviewBox
