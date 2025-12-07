import React, { useState, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Input from './Input';
import Button from './Button';
import authcreator from "../auth/authcreator"
import authuser from "../auth/authuser"
function Verfiyemail() {
  
  const navigate = useNavigate()
  const { setValue, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[idx] = val;
      setOtp(newOtp);
      setValue("otp", newOtp.join(""));
      if (val && idx < 3) {
        inputsRef.current[idx + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(paste)) {
      const digits = paste.split("");
      setOtp(digits);
      setValue("otp", digits.join(""));
    }
  };

  const onSubmit = async (data) => {
    let code = data.otp
    let creatoremail = localStorage.getItem("email");
    if (creatoremail) {
      try {
        const res = await authcreator.emailverfication({ code })
        if (res) {
          localStorage.removeItem("email");
          navigate("/creator")
        }
      } catch (error) {
        setError(error.response.data.message)
      }
    } else {
      try {
        const res = await authuser.emailverfication({ code })
        if (res) {
          localStorage.removeItem("useremail");
          navigate("/")
        }
      } catch (error) {
        setError(error.response.data.message)
      }
    }

  }

  return (
    <div className="bg-[url('/background.png')] bg-cover bg-center w-full h-screen">
      {/* Right Side - Verify Form */}
      <div className="bg-blue-100 w-1/2 opacity-90 h-full text-center">
        <div className="relative max-w-md top-50 left-32 space-y-12">
          <h2 className="text-4xl text-blue-500 font-semibold  text-center">
            Verify Your Email
          </h2>
          <p className="text-center text-base sm:text-lg lg:text-xl text-blue-900">
            One time OTP
          </p>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          {message && (
            <p className="text-green-600 text-base sm:text-lg text-center mb-8">
              {message}
            </p>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center ml-5 gap-3 sm:gap-4 mb-6">
              {otp.map((digit, i) => (
                <Input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-10 h-12 sm:w-12 sm:h-14 lg:w-14 lg:h-16  bg-gray-200 text-black text-center border text-lg sm:text-xl lg:text-2xl font-semibold rounded-sm"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  ref={(el) => (inputsRef.current[i] = el)}
                  onChange={(e) => handleChange(e, i)}
                  onPaste={handlePaste}
                />
              ))}
            </div>
            <Button
              type="submit"
              className="w-3/5 py-3 text-xl mt-3 ml-2 font-meduim hover:rounded-full hover:opacity-80"
              bgColor="bg-blue-900"
              textColor="text-white"
            >
              Verify
            </Button>
          </form>

          <p className="text-sm lg:text-base text-center mt-4">
            Didn’t get OTP?{" "}
            <Link
              to="/verfiyemail"
              onClick={async () => {
                setError("")
                const emailcretor = localStorage.getItem("email");
                const emailuser = localStorage.getItem("useremail");
                if (emailcretor) {
                  const res = await authcreator.newotp({ email: emailcretor });
                  setMessage("New OTP has been sent successfully!");
                } else {
                  const res = await authuser.newotp({ email: emailuser })
                  setMessage("New OTP has been sent successfully!");
                }
              }}
              className=" hover:text-gray-600 underline"
            >
              Resend OTP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Verfiyemail
