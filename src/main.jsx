import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Registration from './components/Registration/Registration.jsx';
import Login from './components/Login/Login.jsx';
import firebaseConfig from './authentication/firebaseConfig.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/Home.jsx';
import ForgotPassword from './components/Password/ForgotPassword.jsx';
import User from './components/User/User.jsx';
import { Provider } from 'react-redux';
import store from './store.jsx';
import ImageUpload from './components/ImageUpload/ImageUpload.jsx';
import Chat from './components/Chat/Chat.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/registration",
    element: <Registration/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword/>,
  },
  {
    path: "/home",
    element: <User/>,
  },
  {
    path: "/uploadIMG",
    element: <ImageUpload/>,
  },
  {
    path: "/chat",
    element: <Chat/>,
  },
 
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store
    }>
    <RouterProvider router={router} />
</Provider>
  </React.StrictMode>,
)
