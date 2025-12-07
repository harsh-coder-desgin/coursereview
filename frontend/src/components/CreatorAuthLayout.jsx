import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import authcreator from '../auth/authcreator'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { login as authlogin } from '../store/creatorAuthSlice'

export default function AuthLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const users = useSelector(state => state.creatorAuth.users)
  // console.log(users);

  const dispatch = useDispatch()
  const location = useLocation();
  // console.log(location);

  useEffect(() => {
    authcreator.verifyauth()
      .then((data) => {
        if (users === null) {
          dispatch(authlogin(data.data))
        }
        if (
          location.pathname === "/creatorlogin" ||
          location.pathname === "/creatorsignup" ||
          location.pathname === "/verfiyemail"
        ) {
          navigate("/creator");
        }
      })
      .catch(async (err) => {
        if (err.response?.status === 401) {
          try {
            const newAccessToken = await authcreator.refreshtoken();
            if (newAccessToken) {
              await authcreator.verifyauth();
              navigate("/creator")
            } else {
              navigate("/creatorlogin");
            }
          } catch {
            console.log("error");
          }
        }
      })
      .finally(() => {
        setLoading(false)
      });

    const draft = JSON.parse(localStorage.getItem("courseData"))
    if (draft && Date.now() - draft.timestamp > 7*24*60*60*1000) { // 7 days
      localStorage.removeItem("courseData");
    }
  }, []);

  if (loading) return null

  return children;
}

