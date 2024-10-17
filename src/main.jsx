import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import Terms from './components/Terms.jsx'
import LoginPopup from './components/LoginPopup.jsx'
import VideoList from './components/VideoList.jsx'
import Navbar from './components/Header/Navbar.jsx'
import NoVideosFound from './components/NoVideosFound.jsx'
import Sidebar from './components/Header/Sidebar.jsx'
import Layout from './Layout.jsx'
import EditAvatar from './components/EditAvatar.jsx'
import ChannelHeader from './components/Channel/ChannelHeader.jsx'
import ChannelNavigate from './components/Channel/ChannelNavigate.jsx'
import EditPersonalInfo from './components/EditPersonalInfo.jsx'
import HeaderSection from './components/DashBoard/HeaderSection.jsx'
import StatsSection from './components/DashBoard/StatsSection.jsx'
import VideoTable from './components/DashBoard/VideoTable.jsx'
import EditVideo from './components/EditVideo.jsx'
import UploadingVideo from './components/UploadingVideo.jsx'
import UploadVideo from './components/UploadVideo.jsx'
import Description from './components/Description.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Description />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/terms",
    element: <Terms />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/pop",
    element: <LoginPopup />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
