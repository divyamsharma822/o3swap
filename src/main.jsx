import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';

import MainLayout from '@components/layouts/MainLayout';
import Converter from '@components/Converter';
import Hub from './pages/hub/Hub';

const router = createBrowserRouter([
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
