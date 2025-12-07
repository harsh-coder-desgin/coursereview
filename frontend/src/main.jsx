import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import CreatorLayout from './layout/CreatorLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { CreatorAuthLayout } from './components/index.js'
import Verfiyemail from './components/Verfiyemail.jsx'
import VerfiyAuth from './components/VerfiyAuth.jsx'
import Home from './pages/Home.jsx'
import CreatorLogin from './pages/CreatorLogin.jsx'
import CreatorSignup from './pages/CreatorSignup.jsx'
import AddCourse from './pages/AddCourse.jsx'
import Setting from './pages/Setting.jsx'
import AllCourse from './pages/AllCourse.jsx'
import ViewCourseDetail from './components/ViewCourseDetail.jsx'
import EditCourse from './pages/EditCourse.jsx'
import ExploreCourse from './pages/ExploreCourse.jsx'
import ReadReview from './pages/ReadReview.jsx'
import SearchResult from './pages/SearchResult.jsx'
import AllCreator from './pages/AllCreator.jsx'
import CreatorProfile from './pages/CreatorProfile.jsx'
import CourseDetail from './pages/CourseDetail.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element:
          // <UserAuthLayout>
            <Home />
          // </UserAuthLayout>
      },
       {
        path: '/explore',
        element:
          // <UserAuthLayout>
          <ExploreCourse/>
          // </UserAuthLayout>
      },
       {
        path: '/readreview',
        element:
          // <UserAuthLayout>
          <ReadReview/>
          // </UserAuthLayout>
      },
       {
        path: '/search?',
        element:
          // <UserAuthLayout>
          <SearchResult/>
          // </UserAuthLayout>
      },
       {
        path: '/allcreator',
        element:
          // <UserAuthLayout>
          <AllCreator/>
          // </UserAuthLayout>
      },
        {
        path: '/allcreator/profile',
        element:
          // <UserAuthLayout>
          <CreatorProfile/>
          // </UserAuthLayout>
      },
       {
        path: '/coursedetail/:id',
        element:
          // <UserAuthLayout>
          <CourseDetail/>
          // </UserAuthLayout>
      },
    ],
  },
  {
    path: '/creatorlogin',
    element: (
      <CreatorAuthLayout>
        <CreatorLogin />
      </CreatorAuthLayout>
    ),
  },
  {
    path: '/creatorsignup',
    element: (
      <CreatorAuthLayout>
        <CreatorSignup />
      </CreatorAuthLayout>
    )
  },
  {
    path: '/verfiyemail',
    element: (
      <VerfiyAuth>
        <Verfiyemail />
       </VerfiyAuth> 
    )
  },
  {
    path: "/creator",
    element: <CreatorLayout />,
    children: [
      {
        path: "/creator",
        element: (
          <CreatorAuthLayout>
            <Dashboard />
          </CreatorAuthLayout>
        ),
      },
       {
        path: "/creator/addcourse",
        element: (
          <CreatorAuthLayout>
            <AddCourse/>
           </CreatorAuthLayout>
        ),
      },
       {
        path: "/creator/mycourse",
        element: (
          <CreatorAuthLayout>
            <AllCourse/>
          </CreatorAuthLayout>
        ),
      },
      {
        path: "/creator/mycourse/detail/:id",
        element: (
          <CreatorAuthLayout>
            <ViewCourseDetail/>
          </CreatorAuthLayout>
        ),
      },
       {
        path: "/creator/mycourse/edit/:id",
        element: (
          <CreatorAuthLayout>
            <EditCourse/>
          </CreatorAuthLayout>
        ),
      },
       {
        path: "/creator/setting",
        element: (
          <CreatorAuthLayout>
            <Setting/>
          </CreatorAuthLayout>
        ),
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
