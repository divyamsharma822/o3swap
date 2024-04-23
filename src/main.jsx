import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';

import MainLayout from '@components/layouts/MainLayout';
import Converter from '@components/Converter';
import Hub from './pages/hub/Hub';
import { LogIn } from 'lucide-react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Category from './pages/admin/category/Category';
import Product from './pages/admin/product/Product';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Converter />,
            },
            {
                path: '/hub',
                element: <Hub />,
            },
            {
                path: 'admin',
                children: [
                    {
                        path: 'category',
                        element: <Category />,
                    },
                    {
                        path: 'product',
                        element: <Product />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider
            router={router}
            fallbackElement={<p>Web App is loading...</p>}
        />
    </React.StrictMode>
);
