import React, { useState } from 'react'
import CreatorHeading from '../components/CreatorHeading'
import { useForm } from "react-hook-form"
import { Button, Input, Textarea } from '../components'
import { useSelector } from 'react-redux'
import authcreator from '../auth/authcreator'
function Setting() {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [message2, setMessage2] = useState({ text: "", type: "" });

  const usersdata = useSelector(state => state.creatorAuth.users)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      creatorname: usersdata?.data?.creatorname || '',
      email: usersdata?.data?.email || '',
      title: usersdata?.data?.title || '',
      bio: usersdata?.data?.bio || '',
      linkedin: usersdata?.data?.linkedin || '',
      github: usersdata?.data?.github || '',
      youtube: usersdata?.data?.youtube || '',
      personalWebsite: usersdata?.data?.personalWebsite || '',
    }
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors }, reset,
  } = useForm();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); const [previewImage, setPreviewImage] = useState(usersdata?.data?.profile || null);

  const submit = async (data) => {
    try {
      if (data.profile.length > 0) {
        const res = await authcreator.editprofile(data.profile)
      }
      const res = await authcreator.editcreatorprofile(data)
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      console.log(error.response.data.message);
      setMessage({ text: error.response.data.message, type: "error" });
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const changepassword = async (data) => {
    try {
      const res = await authcreator.changepassword(data)
      setMessage2({ text: "Password changed successfully!", type: "success" });
      reset();
    } catch (error) {
      console.log(error.response.data.message);
      setMessage2({ text: error.response.data.message, type: "error" });
    }
  }

  return (
    <div>
      <CreatorHeading heading="Setting" />
      <div className='bg-gray-100 h-full mt-5 pb-11'>
        <div className='pt-8'>
          <form onSubmit={handleSubmit(submit)}>
            <div className='bg-white borer ml-15 pt-1 w-10/11'>
              <div className=' mt-5 ml-10 space-y-5'>
                {message.text && (
                  <h1
                    className={`text-center text-lg font-semibold mt-3  px-1 py-2 transition-all duration-300
                    ${message.type === "success" ? "text-green-700" : ""}
                    ${message.type === "error" ? " text-red-700" : ""}`
                    }
                  >
                    {message.text}
                  </h1>
                )}
                <h1 className='font-medium text-[28px] mt-9'>Account Settings</h1>
                <div className='absolute right-[90px] top-45 bg-gray-200 p-5 pb-13'>
                  <input type="file"
                    {...register("profile", {
                      onChange: handleFileChange
                    })}
                    id="file-upload" accept="image/*"
                    className='hidden' />
                  <label htmlFor="file-upload">
                    {!previewImage ? <img src='/creatorprofile1.png' alt='profile' className='h-45 w-45 bordr object-cover' /> : <img src={previewImage} alt='profile' className='h-45 w-45 bordr object-cover' />}
                  </label>
                  <p className='w-45 text-sm mt-3 h-1 text-gray-500 font-light'>Image size should be 1 MB and ratio should br 1:1</p>
                </div>
                <Input label="Name"
                  {...register("creatorname", {
                    required: "Enter your Name",
                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                  })}
                  placeholder="Enter Your Name"
                  err={errors?.creatorname?.message}
                  className={`${errors.creatorname ? "border-pink-500 text-pink-600" : "border-gray-300"} flex flex-col border border-gray-300 w-1/2 mt-2 p-2 pl-4 placeholder:text-sm`}
                />
                <Input label="Email"
                  {...register("email", {
                  })}
                  readOnly={true}
                  className=' flex flex-col border border-gray-300 w-1/2 mt-2 p-2 pl-4 placeholder:text-sm' placeholder="123@gmail.com" />

                <Input label="Title"
                  {...register("title", {
                    required: "Enter your Title",
                    maxLength: {
                      value: 50,
                      message: "Title cannot exceed 50 characters",
                    },
                    minLength: {
                      value: 3,
                      message: "Title cannot be less than 3 characters",
                    },
                  })}
                  err={errors?.title?.message}
                  className={`${errors.creatorname ? "border-pink-500 text-pink-600" : "border-gray-300"} flex flex-col border border-gray-300 w-2/3 mt-2 p-2 pl-4`} placeholder="Your title,small biograph &  proffesion" />

                <label className=''>Bio</label>
                <Textarea
                  {...register("bio", {
                    required: "Bio is required",
                    minLength: {
                      value: 10,
                      message: "Bio must be at least 10 characters long",
                    },
                  })}
                  err={errors?.bio?.message}
                  className={`border border-gray-300 w-269 mt-2 px-4 py-2 placeholder:text-[15px] ${errors.creatorname ? "border-pink-500 text-pink-600" : "border-gray-300"}`} rows={6}
                  placeholder="Enter your descrption " />
                <Button bgColor='bg-[#499FD6]' type="submit" textColor='text-white' className='mb-12 px-4 py-2 mr-2 cursor-pointer border hover:text-[#499FD6] hover:bg-white'>Save Changes</Button>
              </div>
            </div>

            <div className='bg-white  ml-15 w-10/11'>
              <div className=' mt-5 ml-10 space-y-5 pr-8'>
                <h1 className='font-medium text-[28px] mt-9 pt-8'>Soical Profile</h1>
                <label className=''>Personal Website</label>
                <div className='flex mt-3'>
                  <img src='/Screenshot 2025-10-23 215428.png' alt='profile' className='h-12 w-12 p-1 border border-gray-300 object-cover' />
                  <Input
                    err={errors?.personalWebsite?.message}
                    {...register("personalWebsite", {
                      pattern: {
                        value: /^(https?:\/\/)?([\w.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                        message: "Enter a valid URL",
                      },
                    })}
                    className='flex flex-col border border-gray-300 h-12 w-full p-2 pl-4 placeholder:text-sm'
                    placeholder="Personal website or portfilo"
                  />
                </div>
                <div className='flex justify-between'>

                  <div className=''>
                    <label className=''>Github</label>
                    <div className='flex mt-2'>
                      <img src='/github2.png' alt='profile' className='h-12 w-12 pt-2 pb-2 pl-2 pr-[6px] border border-gray-300 object-cover' />
                      <Input
                        err={errors?.github?.message}
                        {...register("github", {
                          pattern: {
                            value: /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/,
                            message: "Enter a valid GitHub URL",
                          },
                        })}
                        className='flex flex-col border border-gray-300 h-12 w-70 p-2 pl-4'
                        placeholder="http/github.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label>Linkedin</label>
                    <div className='flex mt-2'>
                      <img src='/linkedinlogo2.png' alt='profile' className='h-12 w-12 p-2 border border-gray-300 object-cover' />
                      <Input
                        err={errors?.linkedin?.message}
                        {...register("linkedin", {
                          pattern: {
                            value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
                            message: "Enter a valid LinkedIn URL",
                          },
                        })}
                        className='flex flex-col border border-gray-300 h-12 w-70 p-2 pl-4'
                        placeholder="http/linkedin.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label>Youtube</label>
                    <div className='flex mt-2'>
                      <img src='/yt.png' alt='profile' className='h-12 w-12 p-3 pl-[10px] pr-[10px] border border-gray-300 object-cover' />
                      <Input
                        err={errors?.youtube?.message}
                        {...register("youtube", {
                          pattern: {
                            value: /^(https?:\/\/)?(www\.)?youtube\.com\/.*$/,
                            message: "Enter a valid YouTube URL",
                          },
                        })}
                        className='flex flex-col border border-gray-300 h-12 w-70 p-2 pl-4'
                        placeholder="http:/youtube.com"
                      />
                    </div>
                  </div>
                </div>
                <Button bgColor='bg-[#499FD6]' type="submit" textColor='text-white' className='mb-12 px-4 py-2 mr-2 cursor-pointer border hover:text-[#499FD6] mt-2 hover:bg-white'>Save Changes</Button>
              </div>
            </div>
          </form>

          <form onSubmit={handlePasswordSubmit(changepassword)} className="bg-white ml-15 w-10/11 pb-10">
            {message2.text && (
              <h1
                className={`text-center text-lg font-semibold mt-20 pt-10 transition-all duration-300
                  ${message2.type === "success" ? "text-green-700" : ""}
                  ${message2.type === "error" ? " text-red-700" : ""}`
                }
              >
                {message2.text}
              </h1>
            )}
            <div className="mt-5 ml-10 space-y-10 pr-8 relative">
              <h1 className="font-medium text-[28px] mt-9 mb-8 pt-8">Change Password</h1>
              {/* Current Password */}
              <div className="relative">
                <Input
                  err={passwordErrors?.currentPassword?.message}
                  type={showCurrent ? "text" : "password"}
                  {...registerPassword("currentPassword", {
                    required: "Current password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message:
                        "Password must include uppercase, lowercase, number, and special character",
                    },
                  })}
                  placeholder="Write Your Current Password"
                  className="flex flex-col border border-gray-300 h-12 w-full mt-2 p-2 pl-4 placeholder:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((prev) => !prev)}
                  className="absolute right-3 top-3"
                >
                  {showCurrent ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 
                  7.5-9.75 7.5S2.25 12 2.25 12z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 002.25 
                  12s3.75 7.5 9.75 7.5a9.72 9.72 0 
                  004.65-1.223M6.228 6.228A9.72 9.72 
                  0 0111.25 4.5c6 0 9.75 7.5 9.75 
                  7.5a10.45 10.45 0 01-2.221 
                  3.772M6.228 6.228L3 3m3.228 
                  3.228L3 3m0 0l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* New Password */}
              <div className="relative">
                <Input
                  err={passwordErrors?.newPassword?.message}
                  type={showNew ? "text" : "password"}
                  {...registerPassword("newPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message:
                        "Password must include uppercase, lowercase, number, and special character",
                    },
                  })}
                  placeholder="Write Your New Password"
                  className="flex flex-col border border-gray-300 h-12 w-full mt-2 p-2 pl-4 placeholder:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((prev) => !prev)}
                  className="absolute right-3 top-3"
                >
                  {showNew ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12s3.75-7.5 9.75-7.5S21.75 
                  12 21.75 12s-3.75 7.5-9.75 
                  7.5S2.25 12 2.25 12z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 
                  016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 
                  10.477 0 002.25 12s3.75 
                  7.5 9.75 7.5a9.72 9.72 
                  0 004.65-1.223M6.228 
                  6.228A9.72 9.72 0 0111.25 
                  4.5c6 0 9.75 7.5 9.75 
                  7.5a10.45 10.45 0 01-2.221 
                  3.772M6.228 6.228L3 3m3.228 
                  3.228L3 3m0 0l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Input
                  err={passwordErrors?.confirmPassword?.message}
                  type={showConfirm ? "text" : "password"}
                  {...registerPassword("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value, formValues) =>
                      value === formValues.newPassword || "Passwords do not match to New Password",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message:
                        "Password must include uppercase, lowercase, number, and special character",
                    },
                  })}
                  placeholder="Write Your Confirm Password"
                  className="flex flex-col border border-gray-300 h-12 w-full mt-2 p-2 pl-4 placeholder:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-3 top-3"
                >
                  {showConfirm ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12s3.75-7.5 
                  9.75-7.5S21.75 12 
                  21.75 12s-3.75 7.5-9.75 
                  7.5S2.25 12 2.25 12z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 
                  0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 
                  10.477 0 002.25 12s3.75 
                  7.5 9.75 7.5a9.72 9.72 
                  0 004.65-1.223M6.228 
                  6.228A9.72 9.72 0 0111.25 
                  4.5c6 0 9.75 7.5 9.75 
                  7.5a10.45 10.45 0 01-2.221 
                  3.772M6.228 6.228L3 3m3.228 
                  3.228L3 3m0 0l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="bg-[#499FD6] text-white px-4 py-2 mr-2 cursor-pointer border hover:text-[#499FD6] mt-2 hover:bg-white">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Setting
