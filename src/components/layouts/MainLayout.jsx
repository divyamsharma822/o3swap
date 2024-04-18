import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import withSplashScreen from '../SplashScreen';

const MainLayout = () => {
    return (
        <div className="relative h-screen w-screen flex bg-black overflow-hidden">
            <div className="flex flex-col w-full z-10">
                <Navbar />
                <Outlet />
            </div>
            <div className="top-gradient absolute -top-[400px] -left-[250px] bg-[#2c59ae49] h-[800px] w-[800px] blur-[200px] opacity-50 rounded-full"></div>
            <div className="bottom-gradient absolute -bottom-[400px] -right-[250px] bg-[#2c59ae49] h-[800px] w-[800px] blur-[200px] opacity-30 rounded-full"></div>
        </div>
    );
};

export default withSplashScreen(MainLayout);
