import React from 'react';
import DC_ICON from '@assets/drone-center-logo.png';
import DRONE_VIDEO from '@assets/sidebar/animated-drone-video.gif';
import {
    AlignLeft,
    Bolt,
    FileBarChart,
    Home,
    Layers,
    ShoppingBag,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar = ({ styles }) => {
    return (
        <div className="h-full sm:p-2">
            <div
                className={`flex flex-col justify-between gap-3 rounded-md h-full ${styles}`}
            >
                <div className="flex items-center justify-center my-5">
                    <img src={DC_ICON} alt="dc-logo" width={170} />
                </div>
                <div className="flex flex-col w-full gap-4 overflow-y-auto grow mt-5">
                    {[
                        ['Dashboard', '/home', <Home />],
                        ['Orders', '/orders', <ShoppingBag />],
                        ['Inventory', '/inventory', <Layers />],
                        ['Reports', '/report', <FileBarChart />],
                        ['Settings', '/settings', <Bolt />],
                    ].map(([label, link, icon]) => (
                        <NavLink
                            to={link}
                            key={link}
                            className={({ isActive }) =>
                                isActive
                                    ? 'flex gap-5 items-center bg-[#bddfcf]/40 px-3 py-2 rounded-2xl cursor-pointer active:scale-95'
                                    : 'flex gap-5 items-center hover:bg-[#bddfcf]/40 px-3 py-2 rounded-2xl cursor-pointer active:scale-95'
                            }
                        >
                            <div className="text-gray-400 cursor-pointer">
                                {icon}
                            </div>
                            <label className="font-bold text-sm cursor-pointer">
                                {label}
                            </label>
                        </NavLink>
                    ))}
                </div>
                <img
                    src={DRONE_VIDEO}
                    alt="drone"
                    className="w-[150px] mx-auto"
                />

                <div className="flex items-center gap-3 border p-2 rounded-md cursor-pointer hover:bg-[#bddfcf]/40">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadscn.png" />
                        <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-sm">
                        <div className="font-medium">Divyam Sharma</div>
                        <div className="text-slate-600">Admin</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
