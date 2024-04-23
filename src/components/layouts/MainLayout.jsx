import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import withSplashScreen from '../ui/SplashScreen';
import LOGO from '@assets/navbar/logo.png';
import { AlignJustify } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import Sidebar from '../Sidebar';
const MainLayout = () => {
    const [sidebar, setSidebar] = useState(false);

    return (
        <Sheet open={sidebar} setOpen={setSidebar}>
            <SheetContent side="left" className="w-[280px] bg-[#1b1e27]">
                <Sidebar open={sidebar} setOpen={setSidebar} />
            </SheetContent>
            <div className="relative h-screen w-screen flex bg-black overflow-hidden">
                <div className="flex flex-col w-full z-10 overflow-auto no-scrollbar">
                    <Navbar className="hidden md:flex" />

                    <div className="flex md:hidden justify-between items-center bg-[#262b36] rounded-full p-4 m-5">
                        <img
                            src={LOGO}
                            alt="logo"
                            className="object-contain h-8 bg-clip-text"
                        />
                        <SheetTrigger asChild>
                            <AlignJustify
                                className="text-white"
                                onClick={() => setSidebar(true)}
                            />
                        </SheetTrigger>
                    </div>

                    <Outlet />
                </div>
                <div className="top-gradient absolute -top-[400px] -left-[250px] bg-[#2c59ae49] h-[800px] w-[800px] blur-[200px] opacity-50 rounded-full"></div>
                <div className="bottom-gradient absolute -bottom-[400px] -right-[250px] bg-[#2c59ae49] h-[800px] w-[800px] blur-[200px] opacity-30 rounded-full"></div>
            </div>
        </Sheet>
    );
};

export default withSplashScreen(MainLayout);
