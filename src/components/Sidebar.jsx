import React from 'react';
import DC_ICON from '@assets/navbar/logo.png';
import {
    AlignLeft,
    Bolt,
    ChevronsRight,
    FileBarChart,
    Home,
    Layers,
    ShoppingBag,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ styles, open, setOpen }) => {
    return (
        <div className="h-full sm:p-2">
            <div
                className={`flex flex-col justify-between gap-3 rounded-md h-full ${styles}`}
            >
                <div className="flex items-center my-5">
                    <img src={DC_ICON} alt="dc-logo" width={170} />
                </div>
                <div className="flex flex-col w-full gap-4 overflow-y-auto grow mt-5">
                    {[
                        ['Swap', '/'],
                        ['Hub', '/hub'],
                    ].map(([label, link, icon]) => (
                        <NavLink
                            to={link}
                            key={link}
                            className={({ isActive }) =>
                                isActive
                                    ? 'flex gap-5 justify-between items-center bg-[#262b36] text-white px-3 py-2 rounded-2xl cursor-pointer active:scale-95'
                                    : 'flex gap-5 justify-between items-center border-2 p-3 rounded-full text-white'
                            }
                            onClick={() => setOpen(false)}
                        >
                            <label className="font-bold text-sm cursor-pointer">
                                {label}
                            </label>
                            <ChevronsRight className="text-slate-400" />
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
