import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CreatorAuthLayout ,Verfiyemail,VerfiyAuth,ViewCourseDetail,UserAuthLayout } from './components/index.js'
import { AddCourse, AllCourse, AllCreator, CourseDetail, CreatorLogin, CreatorProfile, CreatorSignup,Dashboard, 
  EditCourse, ExploreCourse, Home, ReadReview, SearchResult, Setting } from './pages/indexpage.js'
import store from './store/store.js'
import CreatorLayout from './layout/CreatorLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import App from './App.jsx'
import './index.css'

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
