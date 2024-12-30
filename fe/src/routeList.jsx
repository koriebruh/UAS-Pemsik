import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Articles from "./pages/articles.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '/articles',
        element: <Articles/>,
    },

]);

const RouteList = () => {
    return <RouterProvider router={router}/>;
};

export default RouteList;